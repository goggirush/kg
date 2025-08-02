import { useState, useEffect } from 'react';
import styles from './SparqlPlayground.module.scss';
import Editor from '@monaco-editor/react';

export default function SparqlPlayground() {
  const [query, setQuery] = useState(`SELECT ?s ?p ?o\nWHERE { ?s ?p ?o }\nLIMIT 100`);
  const [activeTab, setActiveTab] = useState<'table' | 'json' | 'graph'>('table');
  const [results, setResults] = useState<any>(null);

  const [endpoint, setEndpoint] = useState('https://dbpedia.org/sparql');
  const [customEndpoint, setCustomEndpoint] = useState('');
  const [exampleQueries, setExampleQueries] = useState([]);
  const [userQueries, setUserQueries] = useState([]);
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [showNewQueryContainer, setShowNewQueryContainer] = useState(false);

  const [chatMessages, setChatMessages] = useState([{ role: 'system', content: 'You are a SPARQL expert assistant.' }]);
  const [chatLoading, setChatLoading] = useState(false);
  const [nlInput, setNlInput] = useState(''); // 🆕

  const targetEndpoint = endpoint === 'custom' ? customEndpoint : endpoint;

  const runQuery = async () => {
    try {
      const res = await fetch(targetEndpoint + '?query=' + encodeURIComponent(query), {
        headers: { Accept: 'application/sparql-results+json' },
      });
      const json = await res.json();
      setResults(json);
    } catch (err) {
      console.error('Failed to run query:', err);
    }
  };

  const saveQuery = async () => {
    if (!titleInput || !query) return;
    try {
      const res = await fetch('/api/user-queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: titleInput, description: descriptionInput, query }),
      });
      const saved = await res.json();
      setUserQueries((prev) => [saved, ...prev.filter((q) => q.id !== saved.id)]);
      setTitleInput('');
      setDescriptionInput('');
    } catch (err) {
      console.error('Failed to save query:', err);
    }
  };

  const sendChat = async () => {
    const messages = [
      {
        role: 'system',
  content: 'You are a strict SPARQL grader. Reply in 2–3 bullet points. Use as few words as possible. No fluff. Don’t explain unless asked.',
      },
      {
        role: 'user',
        content: `Please review the following SPARQL query:\n\n${query}`,
      },
    ];

    setChatMessages((prev) => [...prev, { role: 'user', content: 'Grade my current query.' }]);
    setChatLoading(true);

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });
      const data = await res.json();
      setChatMessages((prev) => [...prev, data.reply]);
    } catch (err) {
      console.error('Failed to get GPT reply:', err);
    } finally {
      setChatLoading(false);
    }
  };

  const generateSparqlFromNL = async () => {
    if (!nlInput.trim()) return;

    const messages = [
      {
        role: 'system',
        content: 'You are a SPARQL assistant. When the user describes what they want to retrieve, you respond ONLY with a valid SPARQL query — no explanations.',
      },
      {
        role: 'user',
        content: nlInput,
      },
    ];

    setChatMessages((prev) => [...prev, { role: 'user', content: nlInput }]);
    setNlInput('');
    setChatLoading(true);

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });
      const data = await res.json();

      setQuery(data.reply.content); // 👈 Insert generated query into editor
      setChatMessages((prev) => [...prev, data.reply]);
    } catch (err) {
      console.error('Failed to generate query:', err);
    } finally {
      setChatLoading(false);
    }
  };

  useEffect(() => {
    const loadExampleQueries = async () => {
      try {
        const res = await fetch('/api/example-queries');
        const data = await res.json();
        setExampleQueries(data);
      } catch (err) {
        console.error('Failed to load example queries:', err);
      }
    };

    const loadUserQueries = async () => {
      try {
        const res = await fetch('/api/user-queries');
        const data = await res.json();
        setUserQueries(data);
      } catch (err) {
        console.error('Failed to load user queries:', err);
      }
    };

    loadExampleQueries();
    loadUserQueries();
  }, []);

  const renderTable = () => {
    if (!results?.head?.vars || !results?.results?.bindings) {
      return <div>No results to display.</div>;
    }

    const vars = results.head.vars;
    const rows = results.results.bindings;

    return (
      <table className={styles.resultTable}>
        <thead>
          <tr>
            {vars.map((v) => (
              <th key={v}>{v}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {vars.map((v) => (
                <td key={v}>{row[v]?.value || ''}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className={styles.playgroundWrapper}>
      <div className={styles.topBar}>
        <span className={styles.title}>SPARQL Playground</span>
        <div className={styles.controls}>
          <select
            className={styles.endpointSelect}
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
          >
            <option value="https://dbpedia.org/sparql">DBpedia</option>
            <option value="https://query.wikidata.org/sparql">Wikidata</option>
            <option value="custom">Custom Endpoint</option>
          </select>

          {endpoint === 'custom' && (
            <input
              className={styles.customEndpointInput}
              type="text"
              value={customEndpoint}
              placeholder="https://your-endpoint.com/sparql"
              onChange={(e) => setCustomEndpoint(e.target.value)}
            />
          )}

          <button onClick={runQuery}>Run</button>
        </div>
      </div>

      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <h3>My Queries</h3>
          <ul>
            {userQueries.map((q) => (
              <li key={q.id} onClick={() => setQuery(q.query)}>
                {q.title}
              </li>
            ))}
            <li onClick={() => setShowNewQueryContainer(!showNewQueryContainer)}>New query +</li>
            {showNewQueryContainer &&
              <div className={styles.saveBox}>
                <input
                  type="text"
                  placeholder="Title"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Description (optional)"
                  value={descriptionInput}
                  onChange={(e) => setDescriptionInput(e.target.value)}
                />
                <button onClick={saveQuery}>Save Query</button>
              </div>
            }
          </ul>



          <h3>Example Queries</h3>
          <ul>
            {exampleQueries.map((q) => (
              <li key={q.id} onClick={() => setQuery(q.query)}>
                {q.title}
              </li>
            ))}
          </ul>

          <h3>Assistant</h3>
          <div className={styles.chatMessages}>
            {chatMessages.filter(m => m.role !== 'system').map((m, i) => (
              <div key={i} className={styles[m.role]}>
                <pre style={{whiteSpace: 'pre-wrap'}}>{m.content}</pre>
              </div>
            ))}
          </div>

          <input
            type="text"
            value={nlInput}
            onChange={(e) => setNlInput(e.target.value)}
            placeholder="Describe what you want to retrieve"
          />
          <button onClick={generateSparqlFromNL} disabled={chatLoading}>
            {chatLoading ? 'Thinking...' : 'Generate Query'}
          </button>

          <button onClick={sendChat} disabled={chatLoading} style={{ marginTop: '0.5rem' }}>
            {chatLoading ? 'Thinking...' : 'Grade Query'}
          </button>
        </aside>

        <main className={styles.editorPane}>
          <div className={styles.queryTitle}>Query title</div>
          <Editor
            height="200px"
            defaultLanguage="sparql"
            value={query}
            onChange={(value) => setQuery(value || '')}
            theme="vs-dark"
          />

          <div className={styles.resultTabs}>
            <button onClick={() => setActiveTab('table')} className={activeTab === 'table' ? styles.active : ''}>Table</button>
            <button onClick={() => setActiveTab('json')} className={activeTab === 'json' ? styles.active : ''}>Raw JSON</button>
            <button onClick={() => setActiveTab('graph')} className={activeTab === 'graph' ? styles.active : ''}>RDF Graph</button>
          </div>

          <div className={styles.resultViewer}>
            {activeTab === 'table' && renderTable()}
            {activeTab === 'json' && <pre>{JSON.stringify(results, null, 2)}</pre>}
            {activeTab === 'graph' && <div>/* TODO: render RDF graph */</div>}
          </div>
        </main>
      </div>
    </div>
  );
}
