import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ---------------------------------------------------------------
   Scroll-reveal hook
   --------------------------------------------------------------- */
function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    const targets = el.querySelectorAll(".reveal");
    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ---------------------------------------------------------------
   Product data
   --------------------------------------------------------------- */
const products = [
  {
    id: 1,
    name: "Le Manteau Noir",
    category: "Signature Outerwear",
    price: "€ 2,850",
    image: "/product_jacket.jpg",
    num: "001",
  },
  {
    id: 2,
    name: "Robe du Soir",
    category: "Evening Collection",
    price: "€ 4,200",
    image: "/product_dress.jpg",
    num: "002",
  },
  {
    id: 3,
    name: "Le Pantalon",
    category: "Essential Tailoring",
    price: "€ 1,490",
    image: "/product_trousers.jpg",
    num: "003",
  },
  {
    id: 4,
    name: "Manteau Camel",
    category: "Atelier Collection",
    price: "€ 3,650",
    image: "/product_coat_2.jpg",
    num: "004",
  },
];

/* ---------------------------------------------------------------
   Marquee words
   --------------------------------------------------------------- */
const marqueeWords = [
  "Haute Couture",
  "Tunis",
  "Savoir-Faire",
  "Excellence",
  "Médina",
  "Élégance",
  "Atelier",
  "Luxe",
];

/* ---------------------------------------------------------------
   Home Page
   --------------------------------------------------------------- */
function Home() {
  const pageRef = useScrollReveal();

  return (
    <main ref={pageRef}>

      {/* --------------------------------------------------------
          HERO
          -------------------------------------------------------- */}
      <section className="hero" aria-label="Hero — La Nouvelle Collection">

        {/* Left copy */}
        <div className="hero-left">
          <div className="hero-counter" aria-hidden="true">
            <span className="hero-counter-line" />
            <span>01 / 04</span>
          </div>

          <p className="hero-season">
            Collection Automne — Hiver 2026 · Tunis
          </p>

          <h1 className="hero-headline">
            L'art de
            <em>Tunis.</em>
          </h1>

          <div className="hero-divider" aria-hidden="true" />

          <p className="hero-desc">
            Né dans la Médina de Tunis, élevé au rang du monde.
            Chaque pièce porte l'âme du savoir-faire tunisien et l'exigence de l'excellence.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="btn-primary" id="hero-cta">
              <span>
                Explorer la collection
                <span className="arrow">→</span>
              </span>
            </Link>

            <Link to="/products" className="btn-ghost" id="hero-lookbook">
              Lookbook
            </Link>
          </div>
        </div>

        {/* Right image */}
        <div className="hero-right" aria-hidden="true">
          <div className="hero-image-wrap">
            <img
              src="/hero_coat.jpg"
              alt="Manteau signature Maison — Collection Automne-Hiver 2026"
              loading="eager"
            />
          </div>
          <div className="hero-image-overlay" />

          <div className="hero-image-caption">
            <span className="label">OBJECT / 001</span>
            <span className="price">€ 2,850</span>
          </div>
        </div>

        <span className="hero-vertical-text" aria-hidden="true">
          Collection Automne — Hiver 2026
        </span>

      </section>

      {/* --------------------------------------------------------
          MARQUEE STRIP
          -------------------------------------------------------- */}
      <div className="marquee-band" aria-hidden="true">
        <div className="marquee-track">
          {/* Duplicated for infinite scroll */}
          {[...marqueeWords, ...marqueeWords].map((word, i) => (
            <div className="marquee-item" key={i}>
              <span className="marquee-word">{word}</span>
              <span className="marquee-sep">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* --------------------------------------------------------
          PHILOSOPHY
          -------------------------------------------------------- */}
      <section className="philosophy-section" aria-label="Notre philosophie">

        <div className="philosophy-label reveal">
          <div className="philosophy-year" aria-hidden="true">Tunis</div>
          <div className="philosophy-est">Est. Médina, 2018</div>
        </div>

        <div className="philosophy-content">
          <p className="eyebrow reveal">Notre Philosophie</p>

          <h2 className="philosophy-heading reveal reveal-delay-1">
            L'héritage
            <br />
            <em>de la Médina.</em>
          </h2>

          <p className="philosophy-body reveal reveal-delay-2">
            Nous croyons que le luxe véritable naît de la terre.
            Notre atelier est ancré dans la Médina de Tunis, là où
            les maîtres tisseurs transmettent leur art de génération
            en génération depuis des siècles.
          </p>
        </div>

      </section>

      {/* --------------------------------------------------------
          COLLECTION
          -------------------------------------------------------- */}
      <section className="collection-section" aria-label="La Collection">

        <div className="collection-header">
          <div className="collection-header-left">
            <p className="eyebrow reveal">Pièces Sélectionnées</p>
            <h2 className="collection-title reveal reveal-delay-1">
              La
              <em> collection</em>
            </h2>
          </div>

          <Link to="/products" className="collection-view-all reveal reveal-delay-2" id="collection-view-all">
            Voir tout →
          </Link>
        </div>

        <div className="product-grid">
          {products.map((product, idx) => (
            <article
              key={product.id}
              className="product-card reveal"
              style={{ transitionDelay: `${idx * 0.12}s` }}
            >
              <div className="product-image-wrap">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                />
                <div className="product-overlay" />
                <span className="product-num" aria-hidden="true">
                  {product.num}
                </span>
                <div className="product-quick-view">
                  Voir la pièce →
                </div>
              </div>

              <div className="product-meta">
                <div>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                </div>
                <span className="product-price">{product.price}</span>
              </div>
            </article>
          ))}
        </div>

      </section>

      {/* --------------------------------------------------------
          MANIFESTO QUOTE
          -------------------------------------------------------- */}
      <section className="manifesto-section" aria-label="Le manifeste de la Maison">

        <div className="manifesto-ornament" aria-hidden="true">
          <div className="manifesto-ornament-line" />
          <div className="manifesto-ornament-diamond" />
          <div className="manifesto-ornament-line" />
        </div>

        <p className="eyebrow manifesto-label reveal">La Maison</p>

        <blockquote className="manifesto-quote reveal reveal-delay-1">
          "Tunis nous a appris que la beauté
          n'est pas une destination —
          c'est un <strong>héritage vivant</strong>."
        </blockquote>

        <p className="manifesto-attribution reveal reveal-delay-2">
          — Fondateur, Maison Tunis
        </p>

      </section>

      {/* --------------------------------------------------------
          ATELIER / WHY US
          -------------------------------------------------------- */}
      <section className="atelier-section" aria-label="L'atelier Maison">

        <div className="atelier-pillars reveal">
          <div className="pillar">
            <div className="pillar-num" aria-hidden="true">01</div>
            <h3 className="pillar-title">Matières Nobles</h3>
            <p className="pillar-body">
              Soie de Mahdia, laine mérinos et lin du Cap Bon, sourced
              directement auprès des artisans tunisiens.
            </p>
          </div>

          <div className="pillar">
            <div className="pillar-num" aria-hidden="true">02</div>
            <h3 className="pillar-title">Coupe Architecturale</h3>
            <p className="pillar-body">
              Chaque silhouette est pensée comme une structure. Aucun angle
              n'est laissé au hasard.
            </p>
          </div>

          <div className="pillar">
            <div className="pillar-num" aria-hidden="true">03</div>
            <h3 className="pillar-title">Héritage Artisanal</h3>
            <p className="pillar-body">
              Nos maîtres tailleurs perpétuent un savoir-faire transmis depuis
              trois générations dans la Médina de Tunis.
            </p>
          </div>

          <div className="pillar">
            <div className="pillar-num" aria-hidden="true">04</div>
            <h3 className="pillar-title">Éditions Limitées</h3>
            <p className="pillar-body">
              Chaque collection est produite en nombre limité. La rareté n'est
              pas un argument — c'est une nécessité.
            </p>
          </div>
        </div>

        <div className="atelier-right">
          <p className="eyebrow reveal">L'Atelier</p>

          <h2 className="atelier-heading reveal reveal-delay-1">
            Fait avec
            <br />
            <em>intention.</em>
          </h2>

          <p className="atelier-body reveal reveal-delay-2">
            Derrière chaque pièce Maison, il y a des mains expertes
            formées dans la Médina de Tunis, des choix délibérés,
            et une exigence héritée de siècles d'artisanat tunisien.
            Nous ne fabriquons pas des vêtements — nous préservons un art.
          </p>

          <Link to="/products" className="btn-primary reveal reveal-delay-3" id="atelier-cta">
            <span>
              Découvrir l'atelier
              <span className="arrow">→</span>
            </span>
          </Link>
        </div>

      </section>

      {/* --------------------------------------------------------
          FOOTER
          -------------------------------------------------------- */}
      <footer className="footer">

        <div className="footer-top">

          <div className="footer-brand-col">
            <div className="footer-logo" aria-label="Maison">Maison</div>

            <p className="footer-brand-desc">
              Haute couture et prêt-à-porter de luxe. Des pièces d'exception
              nées dans la Médina de Tunis — pour ceux qui exigent l'excellence.
            </p>

            <div className="footer-social" aria-label="Réseaux sociaux">
              <a href="/" className="footer-social-link" aria-label="Instagram" id="footer-instagram">
                IG
              </a>
              <a href="/" className="footer-social-link" aria-label="Pinterest" id="footer-pinterest">
                Pi
              </a>
              <a href="/" className="footer-social-link" aria-label="Twitter" id="footer-twitter">
                X
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">Collection</h4>
            <ul className="footer-links">
              <li><a href="/">Femme</a></li>
              <li><a href="/">Homme</a></li>
              <li><a href="/">Accessoires</a></li>
              <li><a href="/">Éditions Limitées</a></li>
              <li><a href="/">Lookbook</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">La Maison</h4>
            <ul className="footer-links">
              <li><a href="/">Notre Histoire</a></li>
              <li><a href="/">L'Atelier</a></li>
              <li><a href="/">Savoir-Faire</a></li>
              <li><a href="/">Presse</a></li>
              <li><a href="/">Carrières</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Service</h4>
            <ul className="footer-links">
              <li><a href="/">Livraison</a></li>
              <li><a href="/">Retours</a></li>
              <li><a href="/">Entretien</a></li>
              <li><a href="/">Contact</a></li>
              <li><a href="/">Boutiques</a></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p className="footer-bottom-copy" aria-label="Copyright">
            © 2026 Maison Tunis — Tous droits réservés
          </p>

          <nav className="footer-bottom-links" aria-label="Legal links">
            <a href="/">Politique de confidentialité</a>
            <a href="/">Conditions d'utilisation</a>
            <a href="/">Mentions légales</a>
          </nav>
        </div>

      </footer>

    </main>
  );
}

export default Home;