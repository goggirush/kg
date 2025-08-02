import { Node, Edge } from '@xyflow/react';

// Collect URIs declared as owl:Class or rdfs:Class
function extractClassUris(bindings: any[]): Set<string> {
  const classUris = new Set<string>();
  for (const b of bindings) {
    if (
      b.p?.value === 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' &&
      (b.o?.value === 'http://www.w3.org/2002/07/owl#Class' ||
        b.o?.value === 'http://www.w3.org/2000/01/rdf-schema#Class')
    ) {
      classUris.add(b.s?.value);
    }
  }
  return classUris;
}

// Identify classes that are targets of rdfs:subClassOf (i.e., parent classes)
function extractParentClassUris(bindings: any[]): Set<string> {
  const parentUris = new Set<string>();
  for (const b of bindings) {
    if (b.p?.value === 'http://www.w3.org/2000/01/rdf-schema#subClassOf') {
      parentUris.add(b.o?.value);
    }
  }
  return parentUris;
}

// Decide node type: class, individual, or literal
function getNodeType(uri: string, classUris: Set<string>): 'class' | 'individual' | 'literal' {
  if (classUris.has(uri)) return 'class';
  if (uri.startsWith('http')) return 'individual';
  return 'literal';
}

// Convert SPARQL SELECT ?s ?p ?o results into React Flow nodes and edges
export function convertBindingsToGraph(bindings: any[]): { nodes: Node[]; edges: Edge[] } {
  const nodesMap = new Map<string, Node>();
  const edges: Edge[] = [];
  const classUris = extractClassUris(bindings);
  const parentClassUris = extractParentClassUris(bindings);

  bindings.forEach(({ s, p, o }) => {
    const sId = s.value;
    const oId = o.value;

    // Subject node
    if (!nodesMap.has(sId)) {
      const nodeType = getNodeType(sId, classUris);
      nodesMap.set(sId, {
        id: sId,
        type: nodeType,
        data: {
          label: sId.split('/').pop(),
          nodeType,
          isParentClass: parentClassUris.has(sId),
        },
        position: { x: Math.random() * 500, y: Math.random() * 500 },
      });
    }

    // Object node
    if (!nodesMap.has(oId)) {
      const nodeType = getNodeType(oId, classUris);
      nodesMap.set(oId, {
        id: oId,
        type: nodeType,
        data: {
          label: oId.startsWith('"') ? oId : oId.split('/').pop(),
          nodeType,
          isParentClass: parentClassUris.has(oId),
        },
        position: { x: Math.random() * 500, y: Math.random() * 500 },
      });
    }

    // Determine edge type
    const predicate = p.value;
    const isSubclass = predicate === 'http://www.w3.org/2000/01/rdf-schema#subClassOf';
    const isDisjoint = predicate === 'http://www.w3.org/2002/07/owl#disjointWith';

    let edgeType: 'subClass' | 'disjoint' | 'editable' = 'editable';
    if (isSubclass) edgeType = 'subClass';
    else if (isDisjoint) edgeType = 'disjoint';

    edges.push({
      id: `${sId}-${predicate}-${oId}`,
      source: sId,
      target: oId,
      label: predicate.split('/').pop(),
      type: edgeType,
      data: {
        sourceColor: '#ccc',
        targetColor: '#ccc',
      },
    });
  });

  return {
    nodes: Array.from(nodesMap.values()),
    edges,
  };
}
