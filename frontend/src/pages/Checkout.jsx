import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function fmtTND(price) {
  return `${price.toLocaleString("fr-TN")} DT`;
}

const PAYMENT_METHODS = [
  { id: "card",      label: "Carte bancaire",           desc: "Visa, Mastercard — paiement sécurisé SSL" },
  { id: "transfer",  label: "Virement bancaire",         desc: "Délai de traitement : 1 à 2 jours ouvrés" },
  { id: "delivery",  label: "Paiement à la livraison",   desc: "Disponible partout en Tunisie — cash" },
];

const WILAYAS = [
  "Tunis","Ariana","Ben Arous","Manouba","Nabeul","Zaghouan","Bizerte",
  "Béja","Jendouba","Le Kef","Siliana","Sousse","Monastir","Mahdia",
  "Sfax","Kairouan","Kasserine","Sidi Bouzid","Gabès","Medenine",
  "Tataouine","Gafsa","Tozeur","Kébili",
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState(1); // 1 = shipping, 2 = payment, 3 = confirm
  const [payMethod, setPayMethod] = useState("card");
  const [ordered, setOrdered] = useState(false);

  const [form, setForm] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName:  user?.name?.split(" ")[1] || "",
    email:     user?.email || "",
    phone:     "",
    address:   "",
    city:      "",
    wilaya:    "Tunis",
    notes:     "",
  });

  const [errors, setErrors] = useState({});

  const total = subtotal; // shipping free

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: "" }));
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Requis";
    if (!form.lastName.trim())  e.lastName  = "Requis";
    if (!form.email.trim())     e.email     = "Requis";
    if (!form.phone.trim())     e.phone     = "Requis";
    if (!form.address.trim())   e.address   = "Requis";
    if (!form.city.trim())      e.city      = "Requis";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = () => {
    const orderNum = `CL-${Date.now().toString().slice(-6)}`;
    clearCart();
    setOrdered(orderNum);
  };

  /* ─── Order confirmed ─────────────────────────────────── */
  if (ordered) {
    return (
      <main className="checkout-page" style={{ paddingTop: "var(--nav-h)" }}>
        <div className="checkout-success">
          <div className="checkout-success-icon" aria-hidden="true">✦</div>
          <p className="eyebrow" style={{ marginBottom: "20px" }}>Commande confirmée</p>
          <h1 className="checkout-success-title">
            Merci pour votre
            <em> confiance.</em>
          </h1>
          <p className="checkout-success-ref">Référence : <strong>{ordered}</strong></p>
          <p className="checkout-success-desc">
            Un e-mail de confirmation a été envoyé à <strong>{form.email}</strong>.
            Votre commande sera préparée dans notre atelier de la Médina et
            expédiée sous 48h.
          </p>
          <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap", marginTop: "48px" }}>
            <Link to="/orders" className="btn-primary" id="success-orders-btn">
              <span>Suivre ma commande <span className="arrow">→</span></span>
            </Link>
            <Link to="/products" className="btn-ghost" id="success-continue-btn">
              Continuer mes achats
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ─── Empty cart ──────────────────────────────────────── */
  if (items.length === 0) {
    return (
      <main className="checkout-page" style={{ paddingTop: "var(--nav-h)" }}>
        <div className="checkout-success" style={{ paddingTop: "80px" }}>
          <p className="eyebrow" style={{ marginBottom: "20px" }}>Panier vide</p>
          <h1 className="checkout-success-title">Votre panier est <em>vide.</em></h1>
          <Link to="/products" className="btn-primary" style={{ marginTop: "40px", display: "inline-flex" }} id="checkout-empty-btn">
            <span>Explorer la collection <span className="arrow">→</span></span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page" style={{ paddingTop: "var(--nav-h)" }}>

      {/* ── Header ───────────────────────────────────────── */}
      <div className="checkout-header">
        <Link to="/cart" className="checkout-back" id="checkout-back-btn">← Retour au panier</Link>
        <div className="checkout-brand">
          <span className="brand-name" style={{ fontSize: "12px", letterSpacing: "0.35em" }}>CARTHAGE LUXURY</span>
        </div>
        {/* Steps */}
        <div className="checkout-steps" aria-label="Étapes de commande">
          {["Livraison", "Paiement", "Confirmation"].map((s, i) => (
            <div key={s} className={`checkout-step-item ${step === i + 1 ? "active" : step > i + 1 ? "done" : ""}`}>
              <span className="checkout-step-num">{step > i + 1 ? "✓" : i + 1}</span>
              <span className="checkout-step-label">{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="checkout-body">

        {/* ── Left: Form ───────────────────────────────── */}
        <div className="checkout-form-col">

          {/* STEP 1 — Shipping */}
          {step === 1 && (
            <section aria-label="Informations de livraison">
              <h2 className="checkout-section-title">
                <span className="checkout-section-num" aria-hidden="true">01</span>
                Informations de livraison
              </h2>

              <div className="checkout-form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="checkout-firstName">Prénom</label>
                  <input id="checkout-firstName" name="firstName" type="text" className={`form-input ${errors.firstName ? "form-input--error" : ""}`} value={form.firstName} onChange={handleChange} autoComplete="given-name" />
                  {errors.firstName && <span className="form-error">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="checkout-lastName">Nom</label>
                  <input id="checkout-lastName" name="lastName" type="text" className={`form-input ${errors.lastName ? "form-input--error" : ""}`} value={form.lastName} onChange={handleChange} autoComplete="family-name" />
                  {errors.lastName && <span className="form-error">{errors.lastName}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="checkout-email">E-mail</label>
                  <input id="checkout-email" name="email" type="email" className={`form-input ${errors.email ? "form-input--error" : ""}`} value={form.email} onChange={handleChange} autoComplete="email" />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="checkout-phone">Téléphone</label>
                  <input id="checkout-phone" name="phone" type="tel" className={`form-input ${errors.phone ? "form-input--error" : ""}`} placeholder="+216 XX XXX XXX" value={form.phone} onChange={handleChange} autoComplete="tel" />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>
                <div className="form-group checkout-form-grid--full">
                  <label className="form-label" htmlFor="checkout-address">Adresse complète</label>
                  <input id="checkout-address" name="address" type="text" className={`form-input ${errors.address ? "form-input--error" : ""}`} value={form.address} onChange={handleChange} autoComplete="street-address" />
                  {errors.address && <span className="form-error">{errors.address}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="checkout-city">Ville</label>
                  <input id="checkout-city" name="city" type="text" className={`form-input ${errors.city ? "form-input--error" : ""}`} value={form.city} onChange={handleChange} autoComplete="address-level2" />
                  {errors.city && <span className="form-error">{errors.city}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="checkout-wilaya">Gouvernorat</label>
                  <select id="checkout-wilaya" name="wilaya" className="form-input form-select" value={form.wilaya} onChange={handleChange}>
                    {WILAYAS.map((w) => <option key={w} value={w}>{w}</option>)}
                  </select>
                </div>
                <div className="form-group checkout-form-grid--full">
                  <label className="form-label" htmlFor="checkout-notes">Notes (optionnel)</label>
                  <textarea id="checkout-notes" name="notes" className="form-input form-textarea" rows={3} placeholder="Instructions de livraison particulières..." value={form.notes} onChange={handleChange} />
                </div>
              </div>

              <button className="btn-primary checkout-next-btn" id="checkout-step1-next" onClick={() => { if (validateStep1()) setStep(2); }}>
                <span>Continuer vers le paiement <span className="arrow">→</span></span>
              </button>
            </section>
          )}

          {/* STEP 2 — Payment */}
          {step === 2 && (
            <section aria-label="Mode de paiement">
              <h2 className="checkout-section-title">
                <span className="checkout-section-num" aria-hidden="true">02</span>
                Mode de paiement
              </h2>

              <div className="payment-methods" role="radiogroup" aria-label="Choisir le mode de paiement">
                {PAYMENT_METHODS.map((pm) => (
                  <label
                    key={pm.id}
                    className={`payment-method-card ${payMethod === pm.id ? "selected" : ""}`}
                    htmlFor={`pay-${pm.id}`}
                  >
                    <input
                      id={`pay-${pm.id}`}
                      type="radio"
                      name="payMethod"
                      value={pm.id}
                      checked={payMethod === pm.id}
                      onChange={() => setPayMethod(pm.id)}
                      className="payment-radio"
                    />
                    <div className="payment-method-inner">
                      <div className="payment-method-dot" aria-hidden="true" />
                      <div>
                        <p className="payment-method-label">{pm.label}</p>
                        <p className="payment-method-desc">{pm.desc}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {payMethod === "card" && (
                <div className="card-fields">
                  <div className="form-group">
                    <label className="form-label" htmlFor="card-num">Numéro de carte</label>
                    <input id="card-num" type="text" className="form-input" placeholder="0000 0000 0000 0000" maxLength={19} inputMode="numeric" />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="card-exp">Expiration</label>
                      <input id="card-exp" type="text" className="form-input" placeholder="MM / AA" maxLength={7} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="card-cvv">CVV</label>
                      <input id="card-cvv" type="password" className="form-input" placeholder="•••" maxLength={4} inputMode="numeric" />
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: "16px", marginTop: "36px" }}>
                <button className="btn-ghost" onClick={() => setStep(1)} id="checkout-back-step1">← Retour</button>
                <button className="btn-primary checkout-next-btn" onClick={() => setStep(3)} id="checkout-step2-next">
                  <span>Vérifier la commande <span className="arrow">→</span></span>
                </button>
              </div>
            </section>
          )}

          {/* STEP 3 — Confirmation */}
          {step === 3 && (
            <section aria-label="Confirmation de commande">
              <h2 className="checkout-section-title">
                <span className="checkout-section-num" aria-hidden="true">03</span>
                Vérification & Confirmation
              </h2>

              {/* Shipping recap */}
              <div className="confirm-block">
                <div className="confirm-block-header">
                  <span className="confirm-block-title">Livraison</span>
                  <button className="confirm-edit-btn" onClick={() => setStep(1)} id="confirm-edit-ship">Modifier</button>
                </div>
                <p className="confirm-block-body">
                  {form.firstName} {form.lastName} · {form.phone}<br />
                  {form.address}, {form.city}, {form.wilaya}<br />
                  {form.email}
                </p>
              </div>

              {/* Payment recap */}
              <div className="confirm-block">
                <div className="confirm-block-header">
                  <span className="confirm-block-title">Paiement</span>
                  <button className="confirm-edit-btn" onClick={() => setStep(2)} id="confirm-edit-pay">Modifier</button>
                </div>
                <p className="confirm-block-body">
                  {PAYMENT_METHODS.find((m) => m.id === payMethod)?.label}
                </p>
              </div>

              {/* Items recap */}
              <div className="confirm-block">
                <div className="confirm-block-header">
                  <span className="confirm-block-title">Articles ({items.length})</span>
                </div>
                <div className="confirm-items">
                  {items.map((item) => (
                    <div key={item.key} className="confirm-item-row">
                      <div className="confirm-item-img">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="confirm-item-info">
                        <span className="confirm-item-name">{item.name}</span>
                        <span className="confirm-item-meta">Taille {item.size} · Qté {item.qty}</span>
                      </div>
                      <span className="confirm-item-price">{fmtTND(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px", marginTop: "36px" }}>
                <button className="btn-ghost" onClick={() => setStep(2)} id="checkout-back-step2">← Retour</button>
                <button className="btn-primary checkout-next-btn checkout-place-btn" onClick={handlePlaceOrder} id="place-order-btn">
                  <span>Confirmer la commande · {fmtTND(total)} <span className="arrow">→</span></span>
                </button>
              </div>

              <p className="checkout-legal">
                En confirmant, vous acceptez nos{" "}
                <a href="/">Conditions de vente</a> et notre{" "}
                <a href="/">Politique de retour</a>.
              </p>
            </section>
          )}

        </div>

        {/* ── Right: Order summary ─────────────────────── */}
        <aside className="checkout-summary" aria-label="Récapitulatif de commande">
          <div className="cart-summary-header">
            <p className="eyebrow">Votre commande</p>
          </div>

          <div className="checkout-summary-items">
            {items.map((item) => (
              <div key={item.key} className="checkout-summary-item">
                <div className="checkout-summary-img">
                  <img src={item.image} alt={item.name} loading="lazy" />
                  <span className="checkout-summary-qty">{item.qty}</span>
                </div>
                <div className="checkout-summary-info">
                  <span className="checkout-summary-name">{item.name}</span>
                  <span className="checkout-summary-meta">Taille {item.size}</span>
                  {item.seasonLabel && (
                    <span className="checkout-summary-season">{item.seasonLabel}</span>
                  )}
                </div>
                <span className="checkout-summary-price">{fmtTND(item.price * item.qty)}</span>
              </div>
            ))}
          </div>

          <div className="cart-summary-lines" style={{ marginTop: "24px" }}>
            <div className="summary-line">
              <span>Sous-total</span>
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

          <div className="cart-badges" style={{ marginTop: "24px" }}>
            <span className="cart-badge">✦ Paiement 100% sécurisé</span>
            <span className="cart-badge">✦ Retours offerts 30 jours</span>
            <span className="cart-badge">✦ Livraison 48h Tunisie</span>
          </div>
        </aside>

      </div>
    </main>
  );
}
