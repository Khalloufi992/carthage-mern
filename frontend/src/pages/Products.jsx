import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

/* ---------------------------------------------------------------
   All products — Autumn/Winter + Summer collections
   Prices in TND (Tunisian Dinar)
   --------------------------------------------------------------- */
const allProducts = [
  // ── Automne/Hiver ──────────────────────────────────────────
  {
    id: 1,
    name: "Le Manteau Noir",
    category: "Outerwear",
    season: "AH",
    seasonLabel: "Automne — Hiver",
    price: 8500,
    image: "/product_jacket.jpg",
    num: "001",
    tag: "Signature",
    description: "Taillé dans un drap de laine double-face de Zaghouan. Coupe architecturale, finitions à la main.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Robe du Soir",
    category: "Evening",
    season: "AH",
    seasonLabel: "Automne — Hiver",
    price: 12500,
    image: "/product_dress.jpg",
    num: "002",
    tag: "New",
    description: "Soie de Mahdia ornée de broderies géométriques artisanales. Pièce unique de la collection.",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 3,
    name: "Le Pantalon",
    category: "Tailoring",
    season: "AH",
    seasonLabel: "Automne — Hiver",
    price: 4400,
    image: "/product_trousers.jpg",
    num: "003",
    tag: null,
    description: "Pantalon taille haute en cachemire tissé de Zaghouan. Crease irréprochable, tombé parfait.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 4,
    name: "Manteau Camel",
    category: "Outerwear",
    season: "AH",
    seasonLabel: "Automne — Hiver",
    price: 10800,
    image: "/product_coat_2.jpg",
    num: "004",
    tag: "Limited",
    description: "Laine camel d'exception doublée de soie brute. Édition limitée à 30 exemplaires.",
    sizes: ["XS", "S", "M", "L"],
  },
  // ── Été / Summer ───────────────────────────────────────────
  {
    id: 5,
    name: "La Veste Ivoire",
    category: "Tailoring",
    season: "ETE",
    seasonLabel: "Été",
    price: 5800,
    image: "/product_jacket.jpg",
    num: "005",
    tag: "New",
    description: "Veste légère en lin de Cap Bon, doublure soie naturelle. Ivoire chaud pour les soirées méditerranéennes.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 6,
    name: "Robe Médina",
    category: "Evening",
    season: "ETE",
    seasonLabel: "Été",
    price: 9200,
    image: "/product_dress.jpg",
    num: "006",
    tag: "New",
    description: "Robe fluide en soie de Mahdia, broderies dorées inspirées des moucharabiehs de la Médina.",
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: 7,
    name: "Le Short Tailleur",
    category: "Tailoring",
    season: "ETE",
    seasonLabel: "Été",
    price: 3200,
    image: "/product_trousers.jpg",
    num: "007",
    tag: null,
    description: "Short de tailleur en lin double-fil, coupe haute et structurée. Poche italienne cousue main.",
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 8,
    name: "Manteau de Bain",
    category: "Outerwear",
    season: "ETE",
    seasonLabel: "Été",
    price: 6400,
    image: "/product_coat_2.jpg",
    num: "008",
    tag: "Limited",
    description: "Cape légère en coton égyptien tissé à Monastir. Pour les nuits de Sidi Bou Saïd.",
    sizes: ["S", "M", "L"],
  },
];

const seasonFilters = [
  { key: "ALL", label: "Tous" },
  { key: "AH",  label: "Automne — Hiver" },
  { key: "ETE", label: "Été" },
];

const categoryFilters = ["Toutes", "Outerwear", "Tailoring", "Evening"];

/* Format price as TND */
function fmtTND(price) {
  return `${price.toLocaleString("fr-TN")} DT`;
}

export default function Products() {
  const { addToCart, totalItems } = useCart();

  const [activeSeason, setActiveSeason] = useState("ALL");
  const [activeCategory, setActiveCategory] = useState("Toutes");
  const [selectedSizes, setSelectedSizes] = useState({});
  const [addedIds, setAddedIds] = useState({});

  const filtered = allProducts.filter((p) => {
    const seasonOk = activeSeason === "ALL" || p.season === activeSeason;
    const catOk = activeCategory === "Toutes" || p.category === activeCategory;
    return seasonOk && catOk;
  });

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    addToCart(product, size);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>

      {/* ── Page Header ──────────────────────────────────── */}
      <div className="page-header">
        <div className="page-header-bg">
          <img src="/tunis_atelier.jpg" alt="" />
          <div className="page-header-overlay" />
        </div>
        <div className="page-header-inner">
          <p className="eyebrow">Maison Tunis</p>
          <h1 className="page-title">
            La <em>Collection</em>
          </h1>
          <p className="page-subtitle">
            {activeSeason === "ETE" ? "Été 2026" : activeSeason === "AH" ? "Automne — Hiver 2026" : "Toutes les collections · Tunis"}
          </p>
        </div>
      </div>

      {/* ── Season + Category Filters ────────────────────── */}
      <div className="filters-bar">
        <div className="filters-inner">

          {/* Season pills */}
          <div className="season-filters" role="tablist" aria-label="Collections saisonnières">
            {seasonFilters.map((s) => (
              <button
                key={s.key}
                role="tab"
                aria-selected={activeSeason === s.key}
                className={`season-btn ${activeSeason === s.key ? "active" : ""}`}
                onClick={() => setActiveSeason(s.key)}
                id={`season-${s.key}`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="filters-divider" aria-hidden="true" />

          {/* Category filters */}
          <div className="filters-list" role="tablist" aria-label="Filtrer par catégorie">
            {categoryFilters.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
                id={`cat-${cat}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="filters-count">{filtered.length} pièce{filtered.length > 1 ? "s" : ""}</span>
        </div>
      </div>

      {/* ── Products Grid ────────────────────────────────── */}
      <section className="products-page-grid" aria-label="Catalogue produits">
        {filtered.map((product) => {
          const selectedSize = selectedSizes[product.id] || product.sizes[0];
          const isAdded = addedIds[product.id];

          return (
            <article key={product.id} className="product-page-card">

              <div className="product-page-image-wrap">
                <img src={product.image} alt={product.name} loading="lazy" />

                {product.tag && (
                  <span className={`product-tag ${product.season === "ETE" ? "product-tag--summer" : ""}`}>
                    {product.tag}
                  </span>
                )}

                <span className="product-season-badge" aria-label={`Saison: ${product.seasonLabel}`}>
                  {product.seasonLabel}
                </span>

                <div className="product-page-overlay">
                  <button
                    className="btn-primary"
                    style={{ fontSize: "8px", padding: "12px 24px" }}
                    onClick={() => handleAddToCart(product)}
                    id={`add-cart-overlay-${product.id}`}
                    aria-label={`Ajouter ${product.name} au panier, taille ${selectedSize}`}
                  >
                    <span>
                      {isAdded ? "✓ Ajouté !" : `Ajouter au panier`}
                      {!isAdded && <span className="arrow"> →</span>}
                    </span>
                  </button>
                </div>
              </div>

              <div className="product-page-meta">
                <div className="product-page-meta-left">
                  <span className="product-page-num" aria-hidden="true">{product.num}</span>
                  <h2 className="product-page-name">{product.name}</h2>
                  <p className="product-page-desc">{product.description}</p>

                  {/* Size selector */}
                  <div
                    className="product-page-sizes"
                    role="group"
                    aria-label={`Taille pour ${product.name}`}
                  >
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        className={`size-chip ${selectedSize === sz ? "size-chip--active" : ""}`}
                        onClick={() => handleSizeSelect(product.id, sz)}
                        aria-pressed={selectedSize === sz}
                        id={`size-${product.id}-${sz}`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="product-page-meta-right">
                  <span className="product-page-price">{fmtTND(product.price)}</span>
                  <button
                    className={`add-to-cart-btn ${isAdded ? "add-to-cart-btn--added" : ""}`}
                    onClick={() => handleAddToCart(product)}
                    aria-label={`Ajouter ${product.name} au panier`}
                    id={`add-cart-${product.id}`}
                  >
                    {isAdded ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

            </article>
          );
        })}
      </section>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "80px 0", borderTop: "1px solid var(--line)" }}>
          <p style={{ fontFamily: "var(--editorial)", fontStyle: "italic", fontSize: "22px", color: "var(--bone-dim)" }}>
            Aucune pièce dans cette sélection.
          </p>
        </div>
      )}

    </main>
  );
}
