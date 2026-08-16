import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-visible"); }),
      { threshold: 0.08 }
    );
    el.querySelectorAll(".reveal").forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
  return ref;
}

function fmtTND(price) {
  return `${price.toLocaleString("fr-TN")} DT`;
}

const looks = [
  {
    id: 1,
    num: "Look 01",
    title: "L'Obsidienne",
    season: "Automne — Hiver 2026",
    desc: "Le Manteau Noir porté sur Le Pantalon. Monochromatisme absolu. Pour une soirée dans les galeries de l'Avenue Bourguiba.",
    image: "/product_jacket.jpg",
    products: [
      { id: 1, name: "Le Manteau Noir", price: 8500, image: "/product_jacket.jpg", sizes: ["XS","S","M","L","XL"] },
      { id: 3, name: "Le Pantalon", price: 4400, image: "/product_trousers.jpg", sizes: ["S","M","L","XL"] },
    ],
  },
  {
    id: 2,
    num: "Look 02",
    title: "La Nuit de Sidi Bou",
    season: "Été 2026",
    desc: "Robe Médina et Manteau de Bain. Le bleu de la Méditerranée contre les murs blancs de Sidi Bou Saïd. Deux pièces, une seule image.",
    image: "/product_dress.jpg",
    products: [
      { id: 6, name: "Robe Médina", price: 9200, image: "/product_dress.jpg", sizes: ["XS","S","M","L"] },
      { id: 8, name: "Manteau de Bain", price: 6400, image: "/product_coat_2.jpg", sizes: ["S","M","L"] },
    ],
  },
  {
    id: 3,
    num: "Look 03",
    title: "Le Désert de Sel",
    season: "Automne — Hiver 2026",
    desc: "Manteau Camel sur fond de chotts tunisiens. La couleur de la terre de Tozeur, la texture de laine noble. Un look qui appartient au paysage.",
    image: "/product_coat_2.jpg",
    products: [
      { id: 4, name: "Manteau Camel", price: 10800, image: "/product_coat_2.jpg", sizes: ["XS","S","M","L"] },
      { id: 3, name: "Le Pantalon", price: 4400, image: "/product_trousers.jpg", sizes: ["S","M","L","XL"] },
    ],
  },
  {
    id: 4,
    num: "Look 04",
    title: "L'Ivoire Médina",
    season: "Été 2026",
    desc: "La Veste Ivoire et Le Short Tailleur. Lin du Cap Bon, coupe structurée. Pour arpenter les souks à l'aube, avant la chaleur.",
    image: "/product_jacket.jpg",
    products: [
      { id: 5, name: "La Veste Ivoire", price: 5800, image: "/product_jacket.jpg", sizes: ["XS","S","M","L","XL"] },
      { id: 7, name: "Le Short Tailleur", price: 3200, image: "/product_trousers.jpg", sizes: ["XS","S","M","L","XL"] },
    ],
  },
];

export default function Lookbook() {
  const ref = useReveal();
  const { addToCart } = useCart();
  const [activeId, setActiveId] = useState(null);
  const [addedMap, setAddedMap] = useState({});

  const handleAdd = (product) => {
    addToCart(product, product.sizes[1] || product.sizes[0]);
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedMap((prev) => ({ ...prev, [product.id]: false })), 1500);
  };

  return (
    <main ref={ref} style={{ paddingTop: "var(--nav-h)" }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="lookbook-hero">
        <div className="lookbook-hero-bg">
          <img src="/hero_coat.jpg" alt="Lookbook Maison Tunis Automne-Hiver 2026" />
          <div className="lookbook-hero-overlay" />
        </div>

        <div className="lookbook-hero-content">
          <p className="eyebrow" style={{ marginBottom: "24px" }}>Éditorial · 2026</p>
          <h1 className="lookbook-hero-title">
            Lookbook
            <em> Maison</em>
          </h1>
          <p className="lookbook-hero-season">Automne — Hiver · Été · Tunis</p>
          <p className="lookbook-hero-desc">
            Quatre regards. Quatre territoires tunisiens. Une collection qui parle de lieu,
            d'heure et d'intention.
          </p>
        </div>

        <div className="lookbook-scroll-hint" aria-hidden="true">
          <span>Défiler</span>
          <span className="lookbook-scroll-line" />
        </div>
      </section>

      {/* ── Looks ────────────────────────────────────────── */}
      {looks.map((look, idx) => {
        const isEven = idx % 2 === 0;
        const isOpen = activeId === look.id;

        return (
          <section
            key={look.id}
            className={`look-section ${isEven ? "look-section--normal" : "look-section--reversed"}`}
            aria-label={`${look.num}: ${look.title}`}
          >

            {/* Image panel */}
            <div className="look-image-panel reveal">
              <img
                src={look.image}
                alt={`${look.title} — ${look.season}`}
                loading="lazy"
              />
              <div className="look-image-num" aria-hidden="true">{look.num}</div>
              <div className="look-image-season">{look.season}</div>
            </div>

            {/* Copy panel */}
            <div className="look-copy-panel">
              <div className="look-copy-inner">
                <p className="eyebrow reveal" style={{ marginBottom: "20px" }}>{look.num}</p>

                <h2 className="look-title reveal reveal-delay-1">{look.title}</h2>

                <p className="look-season-tag reveal reveal-delay-1">{look.season}</p>

                <p className="look-desc reveal reveal-delay-2">{look.desc}</p>

                {/* Products in look */}
                <div className="look-products reveal reveal-delay-3">
                  <p className="look-products-label">Les pièces du look</p>
                  {look.products.map((product) => (
                    <div key={product.id} className="look-product-row">
                      <div className="look-product-thumb">
                        <img src={product.image} alt={product.name} loading="lazy" />
                      </div>
                      <div className="look-product-info">
                        <span className="look-product-name">{product.name}</span>
                        <span className="look-product-price">{fmtTND(product.price)}</span>
                      </div>
                      <button
                        className={`look-add-btn ${addedMap[product.id] ? "look-add-btn--added" : ""}`}
                        onClick={() => handleAdd(product)}
                        aria-label={`Ajouter ${product.name} au panier`}
                        id={`look-add-${look.id}-${product.id}`}
                      >
                        {addedMap[product.id] ? "✓" : "+"}
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  className="look-toggle reveal reveal-delay-4"
                  onClick={() => setActiveId(isOpen ? null : look.id)}
                  aria-expanded={isOpen}
                  id={`look-toggle-${look.id}`}
                >
                  {isOpen ? "Fermer les détails ↑" : "Voir les détails du look ↓"}
                </button>

                {isOpen && (
                  <div className="look-details" role="region" aria-label={`Détails de ${look.title}`}>
                    <p style={{ fontFamily: "var(--editorial)", fontStyle: "italic", fontSize: "13px", lineHeight: "1.9", color: "var(--bone-ghost)" }}>
                      Cette composition est née d'un après-midi passé dans les rues de la Médina.
                      Le photographe Mehdi Driss a capturé la lumière rasante de 17h, quand
                      les ombres dessinèrent sur la pierre des géométries absolues. Chaque pièce
                      a été choisie pour sa capacité à absorber cette lumière — et à la restituer.
                    </p>
                  </div>
                )}

              </div>
            </div>

          </section>
        );
      })}

      {/* ── End CTA ──────────────────────────────────────── */}
      <section className="lookbook-end-cta">
        <div className="manifesto-ornament" aria-hidden="true">
          <div className="manifesto-ornament-line" />
          <div className="manifesto-ornament-diamond" />
          <div className="manifesto-ornament-line" />
        </div>
        <p className="eyebrow reveal" style={{ marginBottom: "24px" }}>La Collection Complète</p>
        <h2 className="lookbook-end-title reveal reveal-delay-1">
          Chaque pièce mérite
          <em> d'être portée.</em>
        </h2>
        <div className="atelier-cta-btns reveal reveal-delay-2">
          <Link to="/products" className="btn-primary" id="lookbook-shop-btn">
            <span>Voir tous les produits <span className="arrow">→</span></span>
          </Link>
          <Link to="/atelier" className="btn-ghost" id="lookbook-atelier-btn">
            Découvrir l'atelier
          </Link>
        </div>
      </section>

    </main>
  );
}
