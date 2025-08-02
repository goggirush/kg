import { useState, useCallback, useEffect } from 'react';
import { layoutGraph } from '@/utils/layoutGraph';
import { handleTurtleImport } from '@/utils/helper';
import { useGraphUI } from '@/state/useGraphUI';
import Image from 'next/image';
import { querySparql } from '@/lib/sparqlClient';
import { convertBindingsToGraph } from '@/utils/sparqlToFlow';
import { useBackendMode } from '@/state/useBackendMode';

import { motion, AnimatePresence } from 'framer-motion';


import {
  Background,
  Controls,
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Connection,
  Position,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import styles from './KgPlayground.module.scss';

import ConnectionSettings from '../../components/ConnectionSettings/ConnectionSettings';
import ClassNode from '@/components/CustomNode/ClassNode';
import IndividualNode from '@/components/CustomNode/IndividualNode';
import LiteralNode from '@/components/CustomNode/LiteralNode';
import OntologyPlaygroundEdge from '@/components/CustomNode/OntologyPlaygroundEdge';
import DisjointEdge from '@/components/CustomNode/DisjointEdge';
import SearchAndZoom from '@/components/SearchAndZoom/SearchAndZoom';
import ExportOntologyModal from '@/components/ExportOntologyModal/ExportOntologyModal';
import NodeSidebar from '@/components/NodeSidebar/NodeSidebar';
import KGFilter from '@/components/KGFilter/KGFilter';
import BackendMode from '../../components/BackendMode/BackendMode';
import SettingsButton from '../../components/SettingsButton/SettingsButton';
import Modal from '../../components/Modal/Modal';
import SubclassEdge from '../../components/CustomNode/SubclassEdge';
import { Editor } from '@monaco-editor/react';
import Button from '../../components/Button/Button';
import UserSettings from '../../components/UserSettings/UserSettings';

let id = 0;
const getId = () => `node-${id++}`;

export default function OntologyPlayground() {
  const { isConnected, mode } = useBackendMode();

  const [layoutDirection, setLayoutDirection] = useState<'TB' | 'LR'>('TB');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isEditorFocused, setIsEditorFocused] = useState(false);

  const [showInferred, setShowInferred] = useState(true);
  const [sparqlQuery, setSparqlQuery] = useState('# SPARQL goes here');
  const [visibleNodeTypes, setVisibleNodeTypes] = useState<Set<string>>(
    new Set(['class', 'individual', 'literal'])
  );
  const [showExportModal, setShowExportModal] = useState(false);
  const [showConnectionSettingsModal, setShowConnectionSettingsModal] = useState(false);
  const [showUserSettingsModal, setShowUserSettingsModal] = useState(false);

  const selectedNode = useGraphUI((state) => state.selectedNode);
  const setSelectedNode = useGraphUI((state) => state.setSelectedNode);
  const showSidebar = useGraphUI((state) => state.showSidebar);
  const setShowSidebar = useGraphUI((state) => state.setShowSidebar);

  const toggleNodeType = (type: string) => {
    setVisibleNodeTypes((prev) => {
      const newSet = new Set(prev);
      newSet.has(type) ? newSet.delete(type) : newSet.add(type);
      return newSet;
    });
  };

  const visibleNodes = nodes.filter((n) => visibleNodeTypes.has(n.data?.nodeType));

  const handleLabelChange = useCallback((id: string, newLabel: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
            ...node,
            data: {
              ...node.data,
              label: newLabel,
            },
          }
          : node
      )
    );
  }, [setNodes]);

  const handleEdgeLabelChange = useCallback((id: string, newLabel: string) => {
    setEdges((eds) =>
      eds.map((edge) => (edge.id === id ? { ...edge, label: newLabel } : edge))
    );
  }, [setEdges]);

  const onTurtleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleTurtleImport(event, {
      setNodes,
      setEdges,
      layoutDirection,
      handleLabelChange,
      handleEdgeLabelChange,
      generateInferredTypeEdges,
    });
  };

  const generateInferredTypeEdges = (
    nodes: Node[],
    edges: Edge[],
    classHierarchy: Map<string, string[]>
  ): Edge[] => {
    const inferredEdges: Edge[] = [];

    const instanceToClass = edges
      .filter((e) => e.label === 'is_a' && !e.data?.inferred)
      .reduce((map, e) => {
        map.set(e.source, e.target);
        return map;
      }, new Map<string, string>());

    instanceToClass.forEach((baseClass, instance) => {
      const visited = new Set<string>();
      const stack = [baseClass];

      while (stack.length) {
        const current = stack.pop();
        if (!current || visited.has(current)) continue;
        visited.add(current);

        const parents = classHierarchy.get(current) || [];
        for (const parent of parents) {
          inferredEdges.push({
            id: `inferred-${instance}-is_a-${parent}`,
            source: instance,
            target: parent,
            label: 'is_a',
            type: 'editable',
            style: {
              stroke: 'gold',
              strokeWidth: 2,
              strokeDasharray: '4 2',
              opacity: 1,
            },
            data: {
              inferred: true,
              sourceColor: '#aaa',
              targetColor: '#aaa',
            },
          });
          stack.push(parent);
        }
      }
    });

    return inferredEdges;
  };

  useEffect(() => {
    if (nodes.length === 0 || edges.length === 0) return;
    const laidOut = layoutGraph(nodes, edges, layoutDirection);
    setNodes(laidOut);
  }, [layoutDirection]);

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      const newEdgeId = getId();

      setNodes((currentNodes) => {
        const colorMap = {
          literal: '#e6f7e6',
          class: '#d6ebff',
          individual: '#f7d6ff',
        };

        const sourceNode = currentNodes.find((n) => n.id === params.source);
        const targetNode = currentNodes.find((n) => n.id === params.target);

        const sourceColor = colorMap[sourceNode?.data?.nodeType] || '#007BFF';
        const targetColor = colorMap[targetNode?.data?.nodeType] || '#007BFF';

        const newEdge: Edge = {
          ...params,
          id: newEdgeId,
          type: 'editable',
          label: params.label || 'Relation',
          data: {
            onLabelChange: handleEdgeLabelChange,
            sourceColor,
            targetColor,
          },
        };

        const updatedNodes = currentNodes.map((node) => {
          if (node.id === params.source || node.id === params.target) {
            return {
              ...node,
              data: {
                ...node.data,
                isUnconnected: false,
              },
            };
          }
          return node;
        });

        setEdges((eds) => addEdge(newEdge, eds));
        return updatedNodes;
      });
    },
    [handleEdgeLabelChange]
  );

  const queryStardog = async () => {
    try {
      const response = await fetch('/api/stardog-sparql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/sparql-query',
        },
        body: sparqlQuery,
      });

      const result = await response.json();

      const parsed =
        typeof result.raw === 'string' ? JSON.parse(result.raw) : result;

      if (!parsed?.results?.bindings?.length) {
        console.warn('[Stardog result] No bindings found');
        return;
      }

      const { nodes, edges } = convertBindingsToGraph(parsed.results.bindings);
      setNodes(nodes);
      setEdges(edges);
    } catch (err) {
      console.error('[Stardog error]', err);
    }
  };

  const addNode = (type: 'class' | 'individual' | 'literal') => {
    const labelMap = {
      class: 'New Class',
      individual: 'New Individual',
      literal: '"Value"',
    };

    const node: Node = {
      id: getId(),
      type,
      position: { x: Math.random() * 500, y: Math.random() * 300 },
      data: {
        label: labelMap[type],
        onLabelChange: handleLabelChange,
        nodeType: type,
        isUnconnected: true,
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    };

    setNodes((nds) => [...nds, node]);
  };

  const nodeTypes = {
    class: ClassNode,
    individual: IndividualNode,
    literal: LiteralNode,
  };

  const edgeTypes = {
    editable: OntologyPlaygroundEdge,
    default: OntologyPlaygroundEdge,
    disjoint: DisjointEdge,
    subClass: SubclassEdge,
  };

  return (
    <div style={{ height: 'calc(100vh - 64px)', display: 'flex' }}>
      <div className={styles.toolbar}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h6>Create</h6>
          <button className={styles.button} style={{ border: '2px solid #d6ebff' }} onClick={() => addNode('class')}>+ Class</button>
          <button className={styles.button} style={{ border: '2px solid #f7d6ff' }} onClick={() => addNode('individual')}>+ Individual</button>
          <button className={styles.button} style={{ border: '2px solid #e6f7e6' }} onClick={() => addNode('literal')}>+ Literal</button>
        </div>
        <hr />
        <div style={{ overflow: 'hidden' }}>
          <h6>Query</h6>
          <motion.div
            initial={false}
            animate={{
              height: isEditorFocused ? 300 : 150,
              width: isEditorFocused ? 460 : 220, // ← adjust based on your sidebar size
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              overflow: 'hidden',
              border: '1px solid #555',
              borderRadius: '6px',
              marginBottom: '0.5rem',
              background: '#1e1e1e', // optional for visual contrast
            }}
          >
            <Editor
              height="100%"
              width="100%"
              defaultLanguage="sparql"
              value={sparqlQuery}
              onChange={(value) => setSparqlQuery(value || '')}
              theme="vs-dark"
              onMount={(editor) => {
                editor.onDidFocusEditorText(() => setIsEditorFocused(true));
                editor.onDidBlurEditorText(() => setIsEditorFocused(false));
              }}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'off',
              }}
            />
          </motion.div>
          <Button fullWidth text="Run query" variant='soft' onClick={() => queryStardog()} />
        </div>
        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <h6 style={{ marginBottom: '0' }}>Connection</h6>
            <SettingsButton onClick={() => setShowConnectionSettingsModal(true)} />
            <Modal isOpen={showConnectionSettingsModal} onRequestClose={() => setShowConnectionSettingsModal(false)} title="Connection settings">
              <ConnectionSettings />
            </Modal>
          </div>
          <BackendMode />
        </div>

        {/*
        <div>
          <h6>Layout</h6>
          <button className={styles.button} onClick={() => setLayoutDirection((prev) => (prev === 'TB' ? 'LR' : 'TB'))}>
            Toggle Layout ({layoutDirection})
          </button>
        </div>
        */}

        <div className={styles.toolsSection}>
          <hr />
          <h6>Tools</h6>
          <div className={styles.fileInputWrapper}>
            <input type="file" accept=".ttl" onChange={onTurtleImport} id="file-upload" className={styles.hiddenFileInput} />
            <label htmlFor="file-upload" className={styles.button}>
              Import .ttl
            </label>
          </div>
          <ExportOntologyModal onClose={() => setShowExportModal(false)} isOpen={showExportModal} edges={edges} nodes={nodes} />
          <button className={styles.button} onClick={() => setShowExportModal(true)}>Export</button>
        </div>
      </div>

      <div className={styles.graph}>
        <ReactFlow
          defaultViewport={{ x: 0, y: 0, zoom: 2 }}
          nodes={visibleNodes}
          edges={edges.filter((e) => showInferred || !e.data?.inferred)}
          onConnect={onConnect}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeClick={(_, node) => {
            setSelectedNode(node);
            setShowSidebar(true);
          }}
        >
          <Controls
            position="top-center"
            orientation="horizontal"
            showInteractive={false}
            style={{
              width: '80%',
              background: 'white',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            showZoom={false}
            showFitView={false}
          >
            <div>
              Layout ▾
            </div>
            
            <div>
              <span onClick={() => setShowUserSettingsModal(true)}>Settings {showUserSettingsModal}</span>
              <Modal isOpen={showUserSettingsModal} onRequestClose={() => setShowUserSettingsModal(false)} title="User Settings">
                <UserSettings />
              </Modal>
              </div>
            <SearchAndZoom />
            <div>Placeholder</div>

            <KGFilter
              setShowInferred={setShowInferred}
              showInferred={showInferred}
              visibleNodeTypes={visibleNodeTypes}
              toggleNodeType={toggleNodeType}
            />
          </Controls>
          <Background gap={16} />
        </ReactFlow>
      </div>

      <AnimatePresence>
        {showSidebar && (
          <NodeSidebar
            nodes={nodes}
            edges={edges}
            onClose={() => setShowSidebar(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
