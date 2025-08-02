import { Parser, Quad } from 'n3';
import { layoutGraph } from './layoutGraph.ts';
import { convertTriplesToFlow } from './graphConverter.ts';
import { Node, Edge } from '@xyflow/react';

export function handleTurtleImport(
  event: React.ChangeEvent<HTMLInputElement>,
  config: {
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    layoutDirection: 'TB' | 'LR';
    generateInferredTypeEdges: (
      nodes: Node[],
      edges: Edge[],
      classHierarchy: Map<string, string[]>
    ) => Edge[];
    handleLabelChange: (id: string, label: string) => void;
    handleEdgeLabelChange: (id: string, label: string) => void;
  }
) {
  const file = event.target.files?.[0];
  if (!file) return;

  file.text().then(async (ttlText) => {
    try {
      const parser = new Parser();
      const quads: Quad[] = parser.parse(ttlText);
      const classNodes = new Set<string>();
      const parentClassLabels = new Set<string>();
      const subclassMap = new Map<string, string[]>(); // Full IRIs

      for (const quad of quads) {
        if (
          quad.predicate.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' &&
          quad.object.value === 'http://www.w3.org/2002/07/owl#Class'
        ) {
          classNodes.add(quad.subject.value);
        }

        if (
          quad.predicate.value === 'http://www.w3.org/2000/01/rdf-schema#subClassOf' &&
          quad.object.termType === 'NamedNode'
        ) {
          const parentIRI = quad.object.value;
          const parentLabel = parentIRI.split(/[#/]/).pop()?.replace(/[^a-zA-Z0-9]/g, '_');
          if (parentLabel) parentClassLabels.add(parentLabel);
        }

        if (
          quad.predicate.value === 'http://www.w3.org/2000/01/rdf-schema#subClassOf' &&
          quad.subject.termType === 'NamedNode' &&
          quad.object.termType === 'NamedNode'
        ) {
          const child = quad.subject.value;
          const parent = quad.object.value;
          if (!subclassMap.has(child)) subclassMap.set(child, []);
          subclassMap.get(child)!.push(parent);
        }
      }

      const { nodes: parsedNodes, edges: parsedEdges } = convertTriplesToFlow(quads);

      const getNodeStyle = (type: string) => ({
        border: `2px solid #ccc`,
        background:
          type === 'class' ? '#d6ebff' :
          type === 'individual' ? '#f7d6ff' : '#e6f7e6',
        color: '#222',
      });

      const hasTypeEdge = new Set(
        parsedEdges.filter(e => e.label === 'is_a').map(e => e.source)
      );

      const colorMap: Record<string, string> = {};
      parsedNodes.forEach((node) => {
        const iri = node.id; // use full IRI directly
        const isClass = classNodes.has(iri);
        const type = isClass ? 'class' : node.type || node.data?.nodeType || 'individual';
        const warn = type === 'individual' && !hasTypeEdge.has(node.id);
        const background = getNodeStyle(type, warn).background;
        colorMap[node.id] = background;
      });

      const connectedNodeIds = new Set<string>();
      parsedEdges.forEach((e) => {
        connectedNodeIds.add(e.source);
        connectedNodeIds.add(e.target);
      });

      const enrichedNodes = parsedNodes.map((node) => {
        const label = node.data?.label?.replace(/^"|"$/g, '').trim();
        const iri = node.id;
        const isClass = classNodes.has(iri);
        const nodeType = isClass ? 'class' : node.type || node.data?.nodeType || 'individual';
        const isParentClass = nodeType === 'class' && parentClassLabels.has(label);
        const isUnconnected = !connectedNodeIds.has(node.id);

        return {
          ...node,
          type: nodeType,
          data: {
            ...node.data,
            label: label,
            onLabelChange: config.handleLabelChange,
            nodeType,
            isParentClass,
            isUnconnected,
          },
        };
      });

      const enrichedEdges = parsedEdges.map((edge) => ({
        ...edge,
        data: {
          ...edge.data,
          onLabelChange: config.handleEdgeLabelChange,
          sourceColor: colorMap[edge.source] || '#007BFF',
          targetColor: colorMap[edge.target] || '#28A745',
        },
      }));

      const inferredEdges = config.generateInferredTypeEdges(
        enrichedNodes,
        enrichedEdges,
        subclassMap
      );

      const allEdges = [...enrichedEdges, ...inferredEdges];
      const laidOutNodes = layoutGraph(enrichedNodes, allEdges, config.layoutDirection);

      config.setNodes(laidOutNodes);
      config.setEdges(allEdges);
      console.log(laidOutNodes);
    } catch (err) {
      console.error('Failed to import TTL:', err);
      alert('Invalid TTL file.');
    }
  });
}


export function getConnectedEdgesWithDirection(
  nodeId: string,
  nodes: Node[],
  edges: Edge[]
): { direction: 'incoming' | 'outgoing'; node: Node; edge: Edge }[] {
  const connected: { direction: 'incoming' | 'outgoing'; node: Node; edge: Edge }[] = [];

  for (const edge of edges) {
    if (edge.source === nodeId) {
      const target = nodes.find(n => n.id === edge.target);
      if (target) connected.push({ direction: 'outgoing', node: target, edge });
    } else if (edge.target === nodeId) {
      const source = nodes.find(n => n.id === edge.source);
      if (source) connected.push({ direction: 'incoming', node: source, edge });
    }
  }

  return connected;
}

