import Definition from '@/components/Definition/Definition';

export default function ReasoningPracticalUsesSlide() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0px' }}>
        <div style={{ flex: 0.5 }}>
          <h2>How Organizations Use Reasoning</h2>
          <p>Reasoning is a transformative capability for knowledge graphs, and its applications span across a wide range of real-world scenarios. One of the key benefits of reasoning is its ability to automate tasks, which would otherwise require manual intervention or be prone to human error.</p>
          <p>For instance, reasoning can be used for <strong>data validation</strong> to automatically detect errors or inconsistencies in the graph. This is particularly useful when dealing with large datasets where manual checks would be time-consuming and inefficient. Reasoning systems can automatically flag contradictory statements or infer missing facts that make the data more consistent.</p>
          <p>Another practical use is <strong>product classification</strong>. For e-commerce platforms, reasoning can help categorize products based on their attributes. For example, if a product is labeled as a "Smartphone," reasoning can automatically categorize it as an "Electronics" item, without requiring manual tagging. This helps maintain a more efficient and consistent product database.</p>
          <p>Furthermore, reasoning enables <strong>smarter queries</strong>. In <Definition term="sparql" text="SPARQL" />, reasoning enhances the query process by returning more complete answers. For instance, when querying for all "Parents," reasoning would include not only explicitly tagged "Parents" but also those inferred by the system (e.g., a "Mother" being also a "Parent"). This makes the graph more useful for generating insights and powering data-driven applications.</p>
        </div>
        <div style={{ flex: 0.4 }}>
          <img width="100%" src={"practicalUse.png"} alt="Real-world uses of reasoning" />
        </div>
      </div>
    );
}