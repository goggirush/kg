export default function WelcomeSlide() {
  return (
      <div style={{ display: 'flex', justifyContent: 'space-evenly', padding: '10px 0px'}}>
        <div style={{ flex: .5 }}>
            <h2>Welcome</h2>
          <p>
            In this learning module, we’ll explore what <strong>knowledge graphs</strong> are and how they can help Scania connect and understand complex information — from trucks and components to services, diagnostics, and beyond.        </p>
          <p>
            As Scania continues to move toward a more <strong>data-driven</strong>, modular, and connected ecosystem, the ability to structure and link knowledge becomes essential. Knowledge graphs provide a smarter, more flexible way to model real-world entities and their relationships — enabling better traceability, interoperability, and decision-making across systems.
          </p>
          <p>
            Whether you're working in engineering, service, IT, or product development, this course will help you understand how knowledge graphs can turn scattered data into meaningful <strong>insight</strong> — and how they can support Scania's mission to drive the shift toward sustainable transport.
          </p>
        </div>
        <div style={{ flex: .4, alignSelf: 'center' }}>
          <img
            src={"/images/courses/kg-basics/introduction/welcome.png"}
            alt="Intro graph"
            width="100%"
          />
        </div>
      </div>
  );
}