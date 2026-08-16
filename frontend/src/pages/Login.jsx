import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { user, error, loading, login, register } = useAuth();

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let success;
    if (mode === "login") {
      success = await login({ email: form.email, password: form.password });
    } else {
      success = await register({ email: form.email, password: form.password, name: form.name });
    }
    if (success) navigate("/");
  };

  const switchMode = (m) => {
    setMode(m);
    setForm({ email: "", password: "", name: "" });
  };

  return (
    <main className="auth-page" style={{ paddingTop: "var(--nav-h)" }}>

      {/* ── Left visual ──────────────────────────────────── */}
      <div className="auth-visual" aria-hidden="true">
        <img src="/tunis_atelier.jpg" alt="" />
        <div className="auth-visual-overlay" />
        <div className="auth-visual-text">
          <p className="eyebrow" style={{ color: "var(--gold)" }}>L'Atelier · Tunis</p>
          <blockquote className="auth-visual-quote">
            "L'élégance est un refus."
          </blockquote>
          <p className="auth-visual-attr">— Coco Chanel</p>
        </div>
      </div>

      {/* ── Right form ───────────────────────────────────── */}
      <div className="auth-panel">

        <div className="auth-brand">
          <Link to="/" className="brand" aria-label="Retour à l'accueil">
            <div className="brand-emblem"><span>M</span></div>
            <div className="brand-wordmark">
              <span className="brand-name">MAISON</span>
              <span className="brand-tagline">Tunis · Haute Couture</span>
            </div>
          </Link>
        </div>

        {/* Tabs */}
        <div className="auth-tabs" role="tablist" aria-label="Mode d'authentification">
          <button
            role="tab"
            aria-selected={mode === "login"}
            className={`auth-tab ${mode === "login" ? "active" : ""}`}
            onClick={() => switchMode("login")}
            id="tab-login"
          >
            Se connecter
          </button>
          <button
            role="tab"
            aria-selected={mode === "register"}
            className={`auth-tab ${mode === "register" ? "active" : ""}`}
            onClick={() => switchMode("register")}
            id="tab-register"
          >
            Créer un compte
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="auth-error" role="alert" aria-live="assertive">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
            {error}
          </div>
        )}

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate aria-label={mode === "login" ? "Formulaire de connexion" : "Formulaire de création de compte"}>

          {mode === "register" && (
            <div className="form-group">
              <label className="form-label" htmlFor="auth-name">Nom complet</label>
              <input
                id="auth-name"
                name="name"
                type="text"
                className="form-input"
                placeholder="Votre nom"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="auth-email">Adresse e-mail</label>
            <input
              id="auth-email"
              name="email"
              type="email"
              className="form-input"
              placeholder="votre@email.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <div className="form-label-row">
              <label className="form-label" htmlFor="auth-password">Mot de passe</label>
              {mode === "login" && (
                <a href="/" className="form-forgot" id="forgot-password-link">
                  Oublié ?
                </a>
              )}
            </div>
            <input
              id="auth-password"
              name="password"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              required
              minLength={6}
            />
            {mode === "register" && (
              <span className="form-hint">Au moins 6 caractères</span>
            )}
          </div>

          <button
            type="submit"
            className={`btn-primary auth-submit-btn ${loading ? "btn-loading" : ""}`}
            id="auth-submit-btn"
            disabled={loading}
            aria-busy={loading}
          >
            <span>
              {loading
                ? "En cours..."
                : mode === "login"
                ? "Se connecter"
                : "Créer mon compte"}
              {!loading && <span className="arrow"> →</span>}
            </span>
          </button>

        </form>

        {/* Divider */}
        <div className="auth-divider" aria-hidden="true">
          <span className="auth-divider-line" />
          <span className="auth-divider-text">ou</span>
          <span className="auth-divider-line" />
        </div>

        {/* Social */}
        <div className="auth-social">
          <button className="social-btn" type="button" id="google-signin-btn">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuer avec Google
          </button>
        </div>

        <p className="auth-legal">
          En continuant, vous acceptez nos{" "}
          <a href="/" id="terms-link">Conditions</a> et notre{" "}
          <a href="/" id="privacy-link">Politique de confidentialité</a>.
        </p>

      </div>
    </main>
  );
}
