import Definition from '@/components/Definition/Definition';

export default function RdfIntroSlide() {
  return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0px' }}>
        <div style={{ flex: 0.5 }}>
          <h2>The Language of Knowledge Graphs</h2>
          <p>
            When building knowledge graphs, the most important building block is something called <Definition term="RDF (Resource Description Framework)" text="RDF" />, which stands for <Definition term="RDF (Resource Description Framework)" text="Resource Description Framework" />.
            Don’t worry — you don’t need to memorize the name right away. What’s important is what it does.
          </p>
          <p>
            Think of <Definition term="RDF (Resource Description Framework)" text="RDF" /> as a simple language for writing down facts — not just for humans to read, but also for computers to understand.
            It helps us describe things in the world (like a truck, a person, or a book) in a way that machines can process and connect.
          </p>
          <p>
            The cool thing about <Definition term="RDF (Resource Description Framework)" text="RDF" /> is that it’s universal. It doesn’t matter if you’re describing vehicles, scientific research,
            or your music library — <Definition term="RDF (Resource Description Framework)" text="RDF" /> gives you a standard way to write things down and link them together. That consistency is what makes knowledge graphs possible.
          </p>
          <p>At the heart of <Definition term="RDF (Resource Description Framework)" text="RDF" /> is the idea of a <Definition term="Triple" text="triple" />, a way to describe things that both machines and humans are able to read.</p>
        </div>
        <div style={{ flex: 0.4 }}>
          <img width="100%" src={"/images/courses/kg-basics/RDF/whatIsRdf.png"} alt="RDF Introduction" />
        </div>
      </div>
  );
}