export default function KnowledgeGraphsWhereAreTheyUsedSlide() {
  return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0px' }}>
        <div style={{ flex: 0.4 }}>
          <img
            width="80%"
            src={"/images/courses/kg-basics/knowledgeGraphs/whereKG.png"}
            alt="Knowledge graph usage contexts"
          />
        </div>
        <div style={{ flex: 0.5 }}>
          <h2>Knowledge Graphs in Action</h2>
          <p>
            Knowledge graphs are powering intelligent systems all around us — from your web searches to industrial diagnostics.
            They help structure complex information, find connections, and support better decisions. Here are a few well-known examples:
          </p>

          <p><strong>Siri, Alexa, and Google Assistant: </strong>
            Digital assistants rely on knowledge graphs to understand and connect concepts across different domains — like people, locations, products, and services. When you ask “Who invented the electric car?” or “Play a song by Queen,” the assistant uses a graph to identify the correct entities, disambiguate terms, and traverse relationships to find the best answer or action. Without a structured graph, these systems would treat everything as raw text — and fail to provide meaningful responses.</p>

          <p><strong>LinkedIn: </strong>
            LinkedIn uses a knowledge graph to model entities like users, companies, skills, job roles, industries, and career paths. This allows the platform to go beyond keyword matching. For example, if a job requires “data analysis,” the graph might link it to users who know “Excel,” “Python,” or “Power BI,” even if the exact keyword isn’t present. It also helps surface recommendations like “people you may know” or “roles you might be interested in” by navigating the graph’s relationships and context.</p>

          <p>
            Wherever data needs to be connected, understood, and reused — that’s where knowledge graphs shine.
          </p>
        </div>
      </div>
  );
}