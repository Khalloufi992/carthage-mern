import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">

      {/* Brand */}
      <Link to="/" className="brand" aria-label="Carthage Luxury — Accueil">
        <div className="brand-emblem">
          <span>C</span>
        </div>
        <div className="brand-wordmark">
          <span className="brand-name">CARTHAGE</span>
          <span className="brand-tagline">Tunis · Haute Couture</span>
        </div>
      </Link>

      {/* Centre Navigation */}
      <nav aria-label="Navigation principale">
        <ul className="nav-links">
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/products">Collection</Link></li>
          <li><Link to="/atelier">L'Atelier</Link></li>
          <li><Link to="/lookbook">Lookbook</Link></li>
        </ul>
      </nav>

      {/* Right Actions */}
      <div className="nav-actions">

        {/* Search */}
        <button className="nav-icon-btn" aria-label="Rechercher" id="nav-search-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>

        {/* Cart with badge */}
        <Link to="/cart" className="nav-icon-btn nav-cart-btn" aria-label={`Panier — ${totalItems} article${totalItems !== 1 ? "s" : ""}`} id="nav-cart-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          {totalItems > 0 && (
            <span className="cart-badge-count" aria-hidden="true">
              {totalItems > 9 ? "9+" : totalItems}
            </span>
          )}
        </Link>

        {/* Account */}
        {user ? (
          <div className="nav-user-menu">
            <button
              className="nav-user-btn"
              id="nav-user-btn"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-haspopup="true"
            >
              <span className="nav-user-avatar" aria-hidden="true">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <span className="nav-user-name">{user.name}</span>
            </button>

            {menuOpen && (
              <div className="nav-dropdown" role="menu" aria-label="Menu compte">
                <Link
                  to="/orders"
                  className="nav-dropdown-item"
                  role="menuitem"
                  id="nav-orders-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Mes commandes
                </Link>
                <button
                  className="nav-dropdown-item nav-dropdown-logout"
                  role="menuitem"
                  id="nav-logout-btn"
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                >
                  Se déconnecter
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="nav-cta" id="nav-account-btn">
            Connexion
          </Link>
        )}

      </div>

      {/* Mobile menu toggle */}
      <button
        className="nav-mobile-toggle"
        aria-label="Menu"
        id="nav-mobile-toggle"
        onClick={() => setMenuOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="nav-mobile-drawer" role="dialog" aria-label="Navigation mobile">
          <nav>
            <ul className="nav-mobile-links">
              <li><Link to="/" onClick={() => setMenuOpen(false)}>Maison</Link></li>
              <li><Link to="/products" onClick={() => setMenuOpen(false)}>Collection</Link></li>
              <li><Link to="/atelier" onClick={() => setMenuOpen(false)}>L'Atelier</Link></li>
              <li><Link to="/lookbook" onClick={() => setMenuOpen(false)}>Lookbook</Link></li>
              <li><Link to="/cart" onClick={() => setMenuOpen(false)}>Panier ({totalItems})</Link></li>
              {user ? (
                <>
                  <li><Link to="/orders" onClick={() => setMenuOpen(false)}>Mes commandes</Link></li>
                  <li><button onClick={() => { handleLogout(); setMenuOpen(false); }}>Se déconnecter</button></li>
                </>
              ) : (
                <li><Link to="/login" onClick={() => setMenuOpen(false)}>Connexion</Link></li>
              )}
            </ul>
          </nav>
        </div>
      )}

    </header>
  );
}

export default Navbar;