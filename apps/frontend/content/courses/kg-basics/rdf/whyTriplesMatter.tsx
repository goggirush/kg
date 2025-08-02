import Definition from '@/components/Definition/Definition';

export default function WhyTriplesMatterSlide() {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0px' }}>
            <div style={{ flex: 0.5 }}>
                <h2>Why Triples Matter</h2>
                <p>
                    Even though a <Definition term="Triple" text="triple" /> is just a single fact, it's part of something much bigger.
                    When you connect many <Definition term="Triple" text="triples" /> together — for example, describing who made the truck, what color it is, or what engine type it uses —
                    you start to build a graph of knowledge.
                </p>
                <p>
                    This structure allows computers to understand not just isolated facts, but how things are related.
                    It enables machines to answer more complex questions like “Which trucks have the same engine as Truck123?” or
                    “Which engines are made by the same manufacturer?” — even if that information comes from different sources.
                </p>
                <p>
                    <Definition term="Triple" text="Triples" /> also make data modular and reusable. You can describe a truck in one system, an engine in another,
                    and link them together without needing to merge everything into a single database.
                    This flexibility is what makes <Definition term="RDF (Resource Description Framework)" text="RDF" /> ideal for the web, where data lives in many places but still needs to be connected.
                </p>
            </div>
            <div style={{ flex: 0.4 }}>
                <img width="100%" src={"/images/courses/kg-basics/RDF/triplesMatter.png"} alt="Triple structure" />
            </div>
        </div>
    );
}