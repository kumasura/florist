import { VisualizationStudio } from "@/components/VisualizationStudio";

const features = [
  "Client-side D3 rendering with React state",
  "Configurable chart modes and data filters",
  "MIT-licensed foundation for community extensions",
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <nav className="nav" aria-label="Primary navigation">
          <span className="logo">Florist</span>
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            Open source
          </a>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Flourish-inspired, fully open source</p>
            <h1>Build dynamic and interactive visualizations with Next.js + D3.</h1>
            <p>
              Florist is a lightweight visualization studio starter that helps teams generate,
              explore, and share data stories using modern web primitives.
            </p>
            <div className="actions">
              <a href="#studio" className="button primary">
                Launch studio
              </a>
              <a href="#features" className="button secondary">
                View features
              </a>
            </div>
          </div>

          <div className="hero-panel" aria-label="Project highlights">
            {features.map((feature, index) => (
              <div key={feature} className="feature-pill">
                <span>0{index + 1}</span>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="studio">
        <VisualizationStudio />
      </div>

      <section id="features" className="features">
        <article>
          <h3>Composable</h3>
          <p>Use the provided D3 scales, marks, and controls as building blocks for new charts.</p>
        </article>
        <article>
          <h3>Interactive</h3>
          <p>Hover states, live sliders, and filters show how dashboard controls can drive SVG output.</p>
        </article>
        <article>
          <h3>Open</h3>
          <p>MIT licensing and a simple Next.js structure make the project easy to fork and extend.</p>
        </article>
      </section>
    </main>
  );
}
