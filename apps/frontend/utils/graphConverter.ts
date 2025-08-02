import { Node, Edge, Position } from '@xyflow/react';

/**
 * Convert RDF quads/triples into React Flow compatible nodes and edges.
 * Returns layouted `Node[]` and `Edge[]`.
 */
export const convertTriplesToFlow = (quads: any[]): { nodes: Node[]; edges: Edge[] } => {
  // === Internal maps and state ===
  const nodesMap = new Map<string, Node>();
  const edges: Edge[] = [];
  const nodeTypesMap = new Map<string, 'class' | 'individual' | 'literal'>();

  // === Initial layout coordinates ===
  let classX = 0, classY = 0;
  let individualX = 300, individualY = 0;
  let literalX = 600, literalY = 0;

  // === SHACL exclusion ===
  const shaclVocabPrefixes = ['http://www.w3.org/ns/shacl#'];
  function isShaclTerm(iri: string): boolean {
    return shaclVocabPrefixes.some(prefix => iri.startsWith(prefix));
  }

  // === Vocabulary and predicate exclusions ===
  const vocabExclusions = new Set([
    'http://www.w3.org/2002/07/owl#Class',
    'http://www.w3.org/2000/01/rdf-schema#Class',
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#Property',
    'http://www.w3.org/2002/07/owl#ObjectProperty',
    'http://www.w3.org/2002/07/owl#DatatypeProperty',
  ]);

  const predicateExclusions = new Set([
    'http://purl.org/dc/terms/creator',
    'http://purl.org/dc/terms/contributor',
    'http://purl.org/dc/terms/created',
    'http://purl.org/dc/terms/modified',
    'http://open-services.net/ns/core#modifiedBy',
  ]);

  // === Label maps for nodes and predicates ===
  const labelMap = new Map<string, string>();
  quads.forEach((quad) => {
    if (quad.predicate.value === 'http://www.w3.org/2000/01/rdf-schema#label') {
      labelMap.set(quad.subject.value, quad.object.value);
    }
  });

  const predicateLabelMap: Record<string, string> = {
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#type': 'is_a',
    'http://www.w3.org/2000/01/rdf-schema#label': 'Label',
    'http://www.w3.org/2000/01/rdf-schema#subClassOf': 'subClassOf',
    'http://www.w3.org/2002/07/owl#disjointWith': 'disjointWith',
    'http://www.w3.org/2002/07/owl#DatatypeProperty': 'Attribute',
    'http://www.w3.org/2002/07/owl#ObjectProperty': 'Relation',
  };

  const subjectsSet = new Set<string>();
  const objectsSet = new Set<string>();

  // === Extract owl:ObjectProperty edges (domainIncludes → rangeIncludes) ===
  const objectPropertyEdges: Edge[] = [];
  const objectPropertyDefs = new Map<string, { label?: string; domain?: string; range?: string }>();

  // === Extract owl:DatatypeProperty attributes (to attach to node metadata) ===
  const datatypePropertyDefs = new Map<string, { label?: string; domain?: string; range?: string }>();

  quads.forEach((q) => {
    const s = q.subject.value;
    const p = q.predicate.value;
    const o = q.object.value;

    if (o === 'http://www.w3.org/2002/07/owl#ObjectProperty') {
      objectPropertyDefs.set(s, { ...objectPropertyDefs.get(s) });
    } else if (o === 'http://www.w3.org/2002/07/owl#DatatypeProperty') {
      datatypePropertyDefs.set(s, { ...datatypePropertyDefs.get(s) });
    } else if (p === 'http://www.w3.org/2000/01/rdf-schema#label') {
      if (objectPropertyDefs.has(s)) {
        const entry = objectPropertyDefs.get(s) || {};
        objectPropertyDefs.set(s, { ...entry, label: q.object.value });
      }
      if (datatypePropertyDefs.has(s)) {
        const entry = datatypePropertyDefs.get(s) || {};
        datatypePropertyDefs.set(s, { ...entry, label: q.object.value });
      }
    } else if (p === 'https://schema.org/domainIncludes') {
      if (objectPropertyDefs.has(s)) {
        const entry = objectPropertyDefs.get(s) || {};
        objectPropertyDefs.set(s, { ...entry, domain: o });
      }
      if (datatypePropertyDefs.has(s)) {
        const entry = datatypePropertyDefs.get(s) || {};
        datatypePropertyDefs.set(s, { ...entry, domain: o });
      }
    } else if (p === 'https://schema.org/rangeIncludes') {
      if (objectPropertyDefs.has(s)) {
        const entry = objectPropertyDefs.get(s) || {};
        objectPropertyDefs.set(s, { ...entry, range: o });
      }
      if (datatypePropertyDefs.has(s)) {
        const entry = datatypePropertyDefs.get(s) || {};
        datatypePropertyDefs.set(s, { ...entry, range: o });
      }
    }
  });

  // === Preprocessing: classify known rdf/owl classes ===
  quads.forEach((quad) => {
    const isType = quad.predicate.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
    const isClass =
      quad.object.value === 'http://www.w3.org/2000/01/rdf-schema#Class' ||
      quad.object.value === 'http://www.w3.org/2002/07/owl#Class';
    if (isType && isClass) {
      nodeTypesMap.set(quad.subject.value, 'class');
    }
  });

  // === Main conversion: build nodes and edges from quads ===
  quads.forEach((quad, index) => {
    const subject = quad.subject.value;
    const object = quad.object.value;
    const predicate = quad.predicate.value;

    if (predicateExclusions.has(predicate)) return;
    if (subject.includes('anon-genid') || object.includes('anon-genid')) return;
    if (vocabExclusions.has(object)) return;
    if (isShaclTerm(subject) || isShaclTerm(predicate) || isShaclTerm(object)) return;

    const isLiteral = quad.object.termType === 'Literal';

    subjectsSet.add(subject);
    objectsSet.add(object);

    const subjectType = nodeTypesMap.get(subject) || 'individual';
    const objectType = isLiteral ? 'literal' : nodeTypesMap.get(object) || 'individual';

    if (!nodesMap.has(subject)) {
      const pos = getNextPosition(subjectType);
      nodesMap.set(subject, {
        id: subject,
        data: { label: labelMap.get(subject) || getLocalName(subject) },
        position: pos,
        type: getNodeType(subjectType),
        sourcePosition: Position.Right,
        targetPosition: objectsSet.has(subject) ? Position.Left : undefined,
      });
    }

    if (!nodesMap.has(object) && !vocabExclusions.has(object)) {
      const pos = getNextPosition(objectType);
      nodesMap.set(object, {
        id: object,
        data: {
          label: isLiteral ? object : labelMap.get(object) || getLocalName(object),
        },
        position: pos,
        type: getNodeType(objectType),
        sourcePosition: subjectsSet.has(object) ? Position.Right : undefined,
        targetPosition: Position.Left,
      });
    }

    const isDisjoint = predicate === 'http://www.w3.org/2002/07/owl#disjointWith';
    const isAxiomEdge = predicate === 'http://www.w3.org/2000/01/rdf-schema#subClassOf' ||
      predicate === 'http://www.w3.org/2002/07/owl#disjointWith';

    edges.push({
      id: `e${index}`,
      source: subject,
      target: object,
      label: predicateLabelMap[predicate] || labelMap.get(predicate) || getLocalName(predicate),
      type: isDisjoint ? 'disjoint' : 'default',
      data: { inferred: false, isAxiom: isAxiomEdge },
      style: isDisjoint ? { strokeDasharray: '5,5', stroke: '#c00' } : undefined,
    });
  });

  // === Post-processing: add edges for object properties, and remove their nodes ===
  let objPropIndex = edges.length;
  for (const [iri, def] of objectPropertyDefs.entries()) {
    if (!def.domain || !def.range) continue;

    objectPropertyEdges.push({
      id: `obj-${objPropIndex++}`,
      source: def.domain,
      target: def.range,
      label: def.label || getLocalName(iri),
      type: 'default',
      data: { inferred: false, isAxiom: false },
    });

    nodesMap.delete(iri);
    for (const [edgeIndex, edge] of edges.entries()) {
      const isLabelEdge = edge.source === iri && edge.label === 'Label';
      if (isLabelEdge) {
        nodesMap.delete(edge.target);
        edges.splice(edgeIndex, 1);
        break;
      }
    }
  }

  // === Post-processing: attach datatype properties to their class nodes ===
  for (const [iri, def] of datatypePropertyDefs.entries()) {
    if (!def.domain || !def.range) continue;

    const domainNode = nodesMap.get(def.domain);
    if (!domainNode) continue;

    const label = def.label || getLocalName(iri);
    const range = getLocalName(def.range);

    if (!domainNode.data.datatypeProperties) {
      domainNode.data.datatypeProperties = [];
    }

    domainNode.data.datatypeProperties.push({
      iri,
      label,
      range,
    });

    nodesMap.delete(iri);
    
    // 🧼 Remove the range node if it was created (e.g., xsd:string)
    nodesMap.delete(def.range);

    for (let i = edges.length - 1; i >= 0; i--) {
      const edge = edges[i];
      const isLabelEdge = edge.source === iri && edge.label === 'Label';
      if (isLabelEdge) {
        nodesMap.delete(edge.target);
        edges.splice(i, 1);
        break;
      }
    }
  }

  return {
    nodes: Array.from(nodesMap.values()),
    edges: [...edges, ...objectPropertyEdges],
  };

  // === Helpers ===
  function getNextPosition(type: 'class' | 'individual' | 'literal') {
    const gapY = 80;
    switch (type) {
      case 'class': return { x: classX, y: classY += gapY };
      case 'individual': return { x: individualX, y: individualY += gapY };
      case 'literal': return { x: literalX, y: literalY += gapY };
    }
  }
};

function getNodeType(t: 'class' | 'individual' | 'literal'): string {
  return ['class', 'individual', 'literal'].includes(t) ? t : 'individual';
}

function getLocalName(uri: string): string {
  if (!uri) return '';
  const hash = uri.split('#');
  if (hash.length > 1) return hash[1];
  const slash = uri.split('/');
  return slash[slash.length - 1];
}

export function getConnectedNodes(
  nodeId: string,
  nodes: Node[],
  edges: Edge[]
): Node[] {
  const connectedNodeIds = new Set<string>();

  edges.forEach((edge) => {
    if (edge.source === nodeId) {
      connectedNodeIds.add(edge.target);
    }
    if (edge.target === nodeId) {
      connectedNodeIds.add(edge.source);
    }
  });

  return nodes.filter((node) => connectedNodeIds.has(node.id));
}
