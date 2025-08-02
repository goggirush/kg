import React, { useState, useEffect } from "react";
import { QueryEngine } from '@comunica/query-sparql';
import { Parser, Store } from 'n3';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import styles from './SPARQLExercise1.module.scss';
import Editor from '@monaco-editor/react';
import { convertTriplesToFlow } from '../../utils/graphConverter.ts';
import KGGraphViewer from "../../components/KGGraphViewer/KGGraphViewer.tsx";
import Button from '../../components/Button/Button.tsx'
import TripleTable from "../../components/TripleTable/TripleTable.tsx";

const SPARQLExercise1 = () => {

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [dataView, setDataView] = useState('kg')
  const [dataset, setDataset] = useState("movies.ttl");
  const [results, setResults] = useState<any[]>([]);
  const [query, setQuery] = useState(` SELECT * {
  ?s ?p ?o .
}`);

  useEffect(() => {
    showGraphFromTTL()
  }, [dataset]);

  const runQuery = async () => {
    const engine = new QueryEngine();
    const response = await fetch(`/data/${dataset}`);
    const ttlText = await response.text();
    const parser = new Parser({ baseIRI: 'http://example.org/' });
    const quads = parser.parse(ttlText);
    const store = new Store(quads);

    const result = await engine.queryBindings(query, {
      sources: [store],
    });


    const bindings = await result.toArray();

    const parsedResults = bindings.map(b => {
      const row: Record<string, string> = {};
      for (const key of b.keys()) {
        const val = b.get(key);
        if (val) {
          row[key.value] = val.value; // key is a RDF term too, use .value
        }
      }
      return row;
    });

    setResults(parsedResults);
    setDataView('sdf')
    //showGraphFromTTL();
  };

  const parseTTL = async (ttlText: string) => {
    const parser = new Parser();
    return parser.parse(ttlText);
  };

  const showGraphFromTTL = async () => {
    const response = await fetch(`/data/${dataset}`);
    const ttl = await response.text();
    const quads = await parseTTL(ttl);
    const { nodes, edges } = convertTriplesToFlow(quads);
    setNodes(nodes);
    setEdges(edges);
  };


  return (
    <>
      {!!results.length ? 
      <p>✅ Great! We have now fetched <strong>all</strong> the triples from the knowledge graph. Toggle between the graph- and the triple-table view 
      and see that both are representing the same thing. Now, we rarely fetch all the triples from a graph, instead we want specific conditions, visit the next
      slide to see how we can narrow down our search.
       </p>
       :
       <p>
       Inspect the knowledge graph to the right.
       
       When you are ready, press the "run query"-button 
       to fetch all the triples from the graph.

       </p>
      }
    {!!results.length &&
    <div className={styles.toggleViewContainer}>
      <Button onClick={() => setDataView('kg')} text={'Knowledge graph'} />
      <Button onClick={() => setDataView('triple')}text={'Triples'} />
    </div>
    }
      <div className={styles.wrapper}>
        <div style={{flex: .4}}>
          
          <Editor onChange={(value) => setQuery(value)} defaultLanguage="sql" defaultValue={query} height="320px" 
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            wordWrap: 'on',
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
          />
          <div style={{marginTop: '5px'}}>
          <Button text={'Run Query'} fullWidth onClick={() => runQuery()}/>
          </div>
        </div>
          {dataView === 'kg' ? 
            <KGGraphViewer nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} /> : 
            <TripleTable results={results} />}
      </div>
    </>
  );
};


export default SPARQLExercise1