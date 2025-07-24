export default function KnowledgeGraphsWhyUseThemSlide() {
  return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0px' }}>
        <div style={{ flex: 0.5 }}>
          <h2>Why Use Knowledge Graphs?</h2>
          <p>
            Knowledge graphs are built for <strong>complex, connected data</strong> — the kind that doesn’t fit neatly into rows and columns. Where traditional systems treat relationships as secondary, graphs make them <strong>central</strong>.
          </p>
          <p>
            Take a vehicle, its engine, and its service history. Instead of managing these as scattered records, a graph connects them directly — making those links usable, searchable, and meaningful.
          </p>
          <p>
            Graphs are also <strong>flexible</strong>. As your data model grows — with new systems, domains, or concepts — the graph grows with it. There’s no need to redesign everything just to handle change.
          </p>
          <p>
            They’re especially valuable when data flows from multiple places, and when relationships matter just as much as the data itself. Graphs help you connect the dots and reveal structure where spreadsheets can’t.
          </p>
          <p>
            In the end, knowledge graphs turn disconnected data into a <strong>living network of meaning</strong> — helping both people and machines <em>ask better questions and make smarter decisions</em>.
          </p>
        </div>
        <div style={{ flex: 0.4, alignSelf: 'center' }}>
          <img
            src={"/images/courses/kg-basics/knowledgeGraphs/whyKg.png"}
            alt="Intro graph"
            width="100%"
          />
        </div>
      </div>
  );
}