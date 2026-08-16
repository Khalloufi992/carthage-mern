import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function fmtTND(price) {
  return `${price.toLocaleString("fr-TN")} DT`;
}

export default function Cart() {
  const { items, removeFromCart, updateQty, subtotal, clearCart } = useCart();

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>
      <div className="cart-page">

        {/* ── Left: Items ─────────────────────────────────── */}
        <div className="cart-items-col">

          <div className="cart-header">
            <p className="eyebrow">Votre sélection</p>
            <h1 className="cart-title">Le Panier</h1>
          </div>

          {items.length === 0 ? (
            <div className="cart-empty">
              <p className="cart-empty-text">Votre panier est vide.</p>
              <Link
                to="/products"
                className="btn-primary"
                style={{ marginTop: "32px", display: "inline-flex" }}
                id="cart-explore-btn"
              >
                <span>Explorer la collection <span className="arrow">→</span></span>
              </Link>
            </div>
          ) : (
            <>
              <ul className="cart-list" aria-label="Articles dans votre panier">
                {items.map((item) => (
                  <li key={item.key} className="cart-item">

                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} loading="lazy" />
                    </div>

                    <div className="cart-item-info">
                      <div className="cart-item-top">
                        <div>
                          <h3 className="cart-item-name">{item.name}</h3>
                          <p className="cart-item-cat">{item.category}</p>
                          <p className="cart-item-size">
                            Taille : <strong>{item.size}</strong>
                            {item.seasonLabel && (
                              <> · <em style={{ color: "var(--gold-dim)", fontStyle: "normal" }}>{item.seasonLabel}</em></>
                            )}
                          </p>
                        </div>
                        <button
                          className="cart-remove-btn"
                          onClick={() => removeFromCart(item.key)}
                          aria-label={`Supprimer ${item.name}`}
                          id={`remove-${item.key}`}
                        >
                          ×
                        </button>
                      </div>

                      <div className="cart-item-bottom">
                        <div className="qty-control" role="group" aria-label={`Quantité de ${item.name}`}>
                          <button
                            className="qty-btn"
                            onClick={() => updateQty(item.key, -1)}
                            aria-label="Diminuer la quantité"
                            id={`qty-dec-${item.key}`}
                          >−</button>
                          <span className="qty-val" aria-live="polite">{item.qty}</span>
                          <button
                            className="qty-btn"
                            onClick={() => updateQty(item.key, 1)}
                            aria-label="Augmenter la quantité"
                            id={`qty-inc-${item.key}`}
                          >+</button>
                        </div>
                        <span className="cart-item-price">
                          {fmtTND(item.price * item.qty)}
                        </span>
                      </div>
                    </div>

                  </li>
                ))}
              </ul>

              <div className="cart-continue">
                <Link to="/products" className="btn-ghost" id="cart-continue-shopping">
                  ← Continuer mes achats
                </Link>
                <button
                  className="cart-clear-btn"
                  onClick={clearCart}
                  id="cart-clear-btn"
                >
                  Vider le panier
                </button>
              </div>
            </>
          )}
        </div>

        {/* ── Right: Summary ─────────────────────────────── */}
        {items.length > 0 && (
          <aside className="cart-summary" aria-label="Récapitulatif de commande">

            <div className="cart-summary-header">
              <p className="eyebrow">Récapitulatif</p>
            </div>

            <div className="cart-summary-lines">
              <div className="summary-line">
                <span>{items.reduce((s, i) => s + i.qty, 0)} article{items.reduce((s, i) => s + i.qty, 0) > 1 ? "s" : ""}</span>
                <span>{fmtTND(subtotal)}</span>
              </div>
              <div className="summary-line">
                <span>Livraison</span>
                <span className="summary-free">Offerte</span>
              </div>
              <div className="summary-line summary-line--total">
                <span>Total TND</span>
                <span>{fmtTND(total)}</span>
              </div>
            </div>

            <div className="cart-summary-note">
              <p>Livraison sous 48h en Tunisie · Emballage cadeau offert</p>
            </div>

            <Link
              to="/checkout"
              className="btn-primary cart-checkout-btn"
              id="checkout-btn"
            >
              <span>Finaliser la commande <span className="arrow">→</span></span>
            </Link>

            <div className="cart-badges">
              <span className="cart-badge">✦ Paiement sécurisé</span>
              <span className="cart-badge">✦ Retours offerts 30 jours</span>
              <span className="cart-badge">✦ Livraison gratuite Tunisie</span>
            </div>

            {/* Promo code */}
            <div className="promo-section">
              <label className="promo-label" htmlFor="promo-input">
                Code promotionnel
              </label>
              <div className="promo-row">
                <input
                  id="promo-input"
                  type="text"
                  className="promo-input"
                  placeholder="MAISON2026"
                  aria-label="Code promotionnel"
                />
                <button className="promo-btn" id="promo-apply-btn">
                  Appliquer
                </button>
              </div>
            </div>

          </aside>
        )}

      </div>
    </main>
  );
}
