const orders = [
  {
    id: "MSN-2026-0041",
    date: "12 Août 2026",
    status: "Livré",
    statusCode: "delivered",
    items: [
      { name: "Le Manteau Noir", size: "M", qty: 1, price: 2850, image: "/product_jacket.jpg" },
      { name: "Le Pantalon", size: "M", qty: 1, price: 1490, image: "/product_trousers.jpg" },
    ],
    total: 4340,
    tracking: "TN4821067FED",
  },
  {
    id: "MSN-2026-0028",
    date: "29 Juillet 2026",
    status: "En cours de livraison",
    statusCode: "shipping",
    items: [
      { name: "Robe du Soir", size: "S", qty: 1, price: 4200, image: "/product_dress.jpg" },
    ],
    total: 4200,
    tracking: "TN3920154FED",
  },
  {
    id: "MSN-2026-0015",
    date: "10 Juillet 2026",
    status: "Livré",
    statusCode: "delivered",
    items: [
      { name: "Manteau Camel", size: "L", qty: 1, price: 3650, image: "/product_coat_2.jpg" },
    ],
    total: 3650,
    tracking: "TN2811043FED",
  },
];

const statusColors = {
  delivered: "var(--gold)",
  shipping: "#4CAF50",
  processing: "var(--bone-dim)",
};

function Orders() {
  return (
    <main style={{ paddingTop: "var(--nav-h)" }}>

      <div className="orders-page">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="orders-header">
          <p className="eyebrow">Votre compte</p>
          <h1 className="orders-title">Mes Commandes</h1>
          <p className="orders-subtitle">
            {orders.length} commande{orders.length > 1 ? "s" : ""} enregistrée{orders.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* ── Orders list ────────────────────────────────────── */}
        <div className="orders-list">
          {orders.map((order) => (
            <article key={order.id} className="order-card">

              {/* Order meta bar */}
              <div className="order-meta-bar">
                <div className="order-meta-left">
                  <span className="order-num">{order.id}</span>
                  <span className="order-date">{order.date}</span>
                </div>
                <div className="order-meta-right">
                  <span
                    className="order-status"
                    style={{ color: statusColors[order.statusCode] || "var(--bone)" }}
                  >
                    <span className="order-status-dot" style={{ background: statusColors[order.statusCode] }} />
                    {order.status}
                  </span>
                  <span className="order-total">€ {order.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Items */}
              <div className="order-items">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <div className="order-item-image">
                      <img src={item.image} alt={item.name} loading="lazy" />
                    </div>
                    <div className="order-item-info">
                      <h3 className="order-item-name">{item.name}</h3>
                      <p className="order-item-detail">
                        Taille {item.size} · Qté {item.qty}
                      </p>
                      <p className="order-item-price">€ {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer actions */}
              <div className="order-actions">
                <button className="btn-ghost order-btn" id={`track-${order.id}`}>
                  Suivre la commande →
                </button>
                {order.statusCode === "delivered" && (
                  <button className="btn-ghost order-btn" id={`reorder-${order.id}`}>
                    Recommander →
                  </button>
                )}
                <span className="order-tracking">
                  Réf. suivi : <strong>{order.tracking}</strong>
                </span>
              </div>

            </article>
          ))}
        </div>

        {/* ── Empty state (if no orders) */}
        {orders.length === 0 && (
          <div className="orders-empty">
            <p className="orders-empty-text">Vous n'avez pas encore passé de commande.</p>
            <a href="/products" className="btn-primary" style={{ marginTop: "32px", display: "inline-flex" }}>
              <span>Explorer la collection <span className="arrow">→</span></span>
            </a>
          </div>
        )}

      </div>

    </main>
  );
}

export default Orders;
