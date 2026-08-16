import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-visible"); }),
      { threshold: 0.1 }
    );
    el.querySelectorAll(".reveal").forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
  return ref;
}

const steps = [
  {
    num: "01",
    title: "Le Choix des Matières",
    body: "Chaque collection commence par un voyage. Nos fondateurs parcourent les souks de Tunis, les entrepôts de Sfax et les ateliers de Mahdia pour sélectionner les fibres les plus nobles — lin du Cap Bon, soie de Mahdia, laine mérinos de Siliana.",
  },
  {
    num: "02",
    title: "Le Dessin & la Coupe",
    body: "Dans notre atelier de la Médina, les patrons sont tracés à la main sur papier kraft. Pas d'algorithme, pas de logiciel de coupe automatique. Chaque silhouette naît d'un dialogue entre le maître-tailleur et le tissu.",
  },
  {
    num: "03",
    title: "La Construction",
    body: "Les machines à coudre Singer de 1960 côtoient les mains expertes de nos couturières. Chaque couture est vérifiée à la loupe. Un manteau Maison demande 38 heures de travail minimum.",
  },
  {
    num: "04",
    title: "La Finition & le Contrôle",
    body: "Avant de quitter l'atelier, chaque pièce passe entre les mains de Mme Saoussen, cheffe de contrôle qualité depuis 18 ans. Si elle n'est pas satisfaite, la pièce recommence.",
  },
];

const pillars = [
  { icon: "38h", label: "de travail par manteau", desc: "Chaque pièce est une somme de gestes précis." },
  { icon: "3ème", label: "génération", desc: "Le savoir-faire de nos maîtres tailleurs remonte à 1962." },
  { icon: "100%", label: "fibres tunisiennes", desc: "Nous approvisionnons localement chaque matière première." },
  { icon: "30", label: "exemplaires max", desc: "Aucune collection ne dépasse 30 pièces par modèle." },
];

export default function Atelier() {
  const ref = useReveal();

  return (
    <main ref={ref} style={{ paddingTop: "var(--nav-h)" }}>

      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="page-header" style={{ height: "520px" }}>
        <div className="page-header-bg">
          <img src="/tunis_atelier.jpg" alt="L'atelier Maison dans la Médina de Tunis" />
          <div className="page-header-overlay" />
        </div>
        <div className="page-header-inner">
          <p className="eyebrow">Médina de Tunis · Depuis 1962</p>
          <h1 className="page-title">
            L'<em>Atelier</em>
          </h1>
          <p className="page-subtitle">Là où chaque pièce naît d'une intention</p>
        </div>
      </div>

      {/* ── Opening statement ────────────────────────────── */}
      <section className="atelier-intro">
        <div className="atelier-intro-inner">
          <p className="eyebrow reveal">Notre Maison</p>
          <h2 className="atelier-intro-heading reveal reveal-delay-1">
            Un atelier caché
            <br />
            <em>au cœur de la Médina.</em>
          </h2>
          <div className="atelier-intro-body reveal reveal-delay-2">
            <p>
              Derrière une porte en bois de cèdre, au fond d'une ruelle pavée de la Médina
              de Tunis, se trouve notre atelier. Pas d'enseigne. Pas de vitrine. Seulement
              le bruit des ciseaux, le chant des machines et l'odeur des tissus nobles.
            </p>
            <p>
              Fondé en 1962 par Haj Mohamed Ben Salah, maître-tailleur formé à Sfax puis
              à Milan, l'atelier Maison perpétue une tradition du vêtement qui ne connaît
              pas de raccourci. Aujourd'hui, sa petite-fille Leila dirige la maison avec
              la même conviction : un vêtement doit durer une vie.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats pillars ────────────────────────────────── */}
      <section className="atelier-stats">
        {pillars.map((p) => (
          <div key={p.icon} className="atelier-stat reveal">
            <div className="atelier-stat-num">{p.icon}</div>
            <div className="atelier-stat-label">{p.label}</div>
            <p className="atelier-stat-desc">{p.desc}</p>
          </div>
        ))}
      </section>

      {/* ── Process steps ────────────────────────────────── */}
      <section className="atelier-process">
        <div className="atelier-process-header">
          <p className="eyebrow reveal">Le Processus</p>
          <h2 className="atelier-process-title reveal reveal-delay-1">
            Du tissu
            <em> à la pièce.</em>
          </h2>
        </div>

        <div className="atelier-steps">
          {steps.map((step, i) => (
            <div key={step.num} className={`atelier-step reveal reveal-delay-${i + 1}`}>
              <div className="atelier-step-num" aria-hidden="true">{step.num}</div>
              <div className="atelier-step-content">
                <h3 className="atelier-step-title">{step.title}</h3>
                <p className="atelier-step-body">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Atelier image full ────────────────────────────── */}
      <section className="atelier-full-image reveal">
        <img src="/tunis_atelier.jpg" alt="Vue de l'atelier Maison, Médina de Tunis" />
        <div className="atelier-full-image-caption">
          <span>L'atelier principal · Médina de Tunis · Fondé en 1962</span>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="atelier-cta-section">
        <div className="atelier-cta-inner">
          <p className="eyebrow reveal">Nous rejoindre</p>
          <h2 className="atelier-cta-heading reveal reveal-delay-1">
            Prêt à porter
            <em> Maison ?</em>
          </h2>
          <div className="atelier-cta-btns reveal reveal-delay-2">
            <Link to="/products" className="btn-primary" id="atelier-shop-btn">
              <span>Voir la collection <span className="arrow">→</span></span>
            </Link>
            <Link to="/lookbook" className="btn-ghost" id="atelier-lookbook-btn">
              Voir le Lookbook
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
