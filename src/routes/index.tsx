import { createFileRoute } from "@tanstack/react-router";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

/* ── react-icons ─────────────────────────────────────────────── */
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiInstagram,
  FiArrowRight,
  FiCheck,
  FiX,
  FiMenu,
  FiCalendar,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiScissors,
  FiExternalLink,
} from "react-icons/fi";
import {
  FaPinterestP,
  FaTiktok,
} from "react-icons/fa";
import {
  PiFlowerLotusThin,
  PiHandHeartThin,
  PiClockCountdownThin,
} from "react-icons/pi";

/* ── Local assets ────────────────────────────────────────────── */
import heroDesktop from "@/assets/hero.jpg";
import heroMobile from "@/assets/bridal.jpg"; // portrait-crop image for mobile
import salon from "@/assets/salon.jpg";
import hair from "@/assets/hair.jpg";
import facial from "@/assets/facial.jpg";
import bridal from "@/assets/bridal.jpg";
import nails from "@/assets/nails.jpg";
import expert1 from "@/assets/expert1.jpg";
import expert2 from "@/assets/expert2.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nourish Spa — The Art of Feeling Beautiful" },
      {
        name: "description",
        content:
          "Luxury beauty spa — hair styling, balayage, bridal, facials, nails & makeup. Book your experience at Nourish Spa, Riyadh.",
      },
    ],
  }),
  component: Index,
});

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */

const FRESHA_URL =
  "https://www.fresha.com/a/nourish-spa-riyadh-nwrsh-sb-nourish-spa-prince-mohammed-ibn-salman-ibn-abdulaziz-rd-al-aqiq-riyadh-13515-saudi-arabia-hsbv4j96/all-offer?menu=true&share=true&pId=2724593&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAadTfsn9n4wWgCDESd-Vz2ftICx_OlasB8iQZI_5xSdd3zwKG5UAxVufgPB-yw_aem_jojJRMYhKpPy9sTVOfhMJQ&utm_source=ig&utm_medium=social&utm_content=link_in_bio&utm_id=97760_v0_s00_e0_tv3";

const CONTACT = {
  phone: "+966 (0) 000 000 000",
  email: "hello@nourishspa.sa",
  address: "Prince Mohammed ibn Salman ibn Abdulaziz Rd, Al Aqiq, Riyadh 13515, Saudi Arabia",
  instagram: "https://www.instagram.com/nourishspa.sa/",
  pinterest: "#",
  tiktok: "#",
};

const SERVICES = [
  {
    id: "hair-styling",
    icon: <FiScissors className="w-5 h-5" />,
    title: "Hair Styling",
    subtitle: "Cuts & Blow-outs",
    desc: "Precision cuts and couture blow-outs sculpted to your silhouette.",
    duration: "60–75 min",
    price: "From €95",
    img: hair,
    category: "Hair",
  },
  {
    id: "hair-colour",
    icon: <PiFlowerLotusThin className="w-5 h-5" />,
    title: "Hair Colour",
    subtitle: "Balayage & Gloss",
    desc: "Hand-painted balayage, gloss melting and dimensional colour.",
    duration: "120–180 min",
    price: "From €165",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    fallback: hair,
    category: "Colour",
  },
  {
    id: "bridal",
    icon: <PiHandHeartThin className="w-5 h-5" />,
    title: "Bridal Atelier",
    subtitle: "Hair & Makeup",
    desc: "Bespoke hair and makeup for the most photographed day.",
    duration: "Half / Full Day",
    price: "By consultation",
    img: bridal,
    category: "Bridal",
  },
  {
    id: "facials",
    icon: <PiFlowerLotusThin className="w-5 h-5" />,
    title: "Sculpting Facials",
    subtitle: "Lift & Radiance",
    desc: "Buccal sculpting and botanical micro-infusions for lasting lift.",
    duration: "75–90 min",
    price: "From €145",
    img: facial,
    category: "Skin",
  },
  {
    id: "skincare",
    icon: <PiHandHeartThin className="w-5 h-5" />,
    title: "Cellular Skincare",
    subtitle: "Personalised Programmes",
    desc: "Custom skin health programmes and deep dermal hydration.",
    duration: "60 min",
    price: "From €125",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    fallback: facial,
    category: "Skin",
  },
  {
    id: "nails",
    icon: <FiStar className="w-5 h-5" />,
    title: "Nail Artistry",
    subtitle: "Russian Manicures",
    desc: "Dry hardware cuticle work and understated editorial nail art.",
    duration: "75–90 min",
    price: "From €70",
    img: nails,
    category: "Nails",
  },
  {
    id: "makeup",
    icon: <FiStar className="w-5 h-5" />,
    title: "Editorial Makeup",
    subtitle: "Artistry",
    desc: "Red carpet and evening looks by our resident artistry team.",
    duration: "60–75 min",
    price: "From €120",
    img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80",
    fallback: heroDesktop,
    category: "Makeup",
  },
];

const GALLERY_ITEMS = [
  { id: "g1",  src: hair,    fallback: hair,    alt: "Couture blow-out",          cat: "Hair",   title: "Gloss & Silk",        span: "col-span-1 md:col-span-7", aspect: "aspect-[4/3]" },
  { id: "g2",  src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80", fallback: hair,  alt: "Balayage colour",  cat: "Colour", title: "Sun-Kissed Balayage", span: "col-span-1 md:col-span-5", aspect: "aspect-[4/3]" },
  { id: "g3",  src: bridal,  fallback: bridal,  alt: "Bridal styling",            cat: "Bridal", title: "Bridal Atelier",      span: "col-span-1 md:col-span-5", aspect: "aspect-[4/3]" },
  { id: "g4",  src: facial,  fallback: facial,  alt: "Sculpting facial",          cat: "Skin",   title: "Sculpting Facial",    span: "col-span-1 md:col-span-7", aspect: "aspect-[4/3]" },
  { id: "g5",  src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80", fallback: heroDesktop, alt: "Editorial makeup", cat: "Makeup", title: "Editorial Artistry", span: "col-span-1 md:col-span-4", aspect: "aspect-square" },
  { id: "g6",  src: nails,   fallback: nails,   alt: "Russian manicure",          cat: "Nails",  title: "Quiet Luxury Nails",  span: "col-span-1 md:col-span-4", aspect: "aspect-square" },
  { id: "g7",  src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80", fallback: facial, alt: "Skincare ritual",  cat: "Skin",   title: "Radiance Infusion",  span: "col-span-1 md:col-span-4", aspect: "aspect-square" },
  { id: "g8",  src: heroDesktop, fallback: heroDesktop, alt: "Golden beauty portrait", cat: "Makeup", title: "Golden Hour Portrait", span: "col-span-1 md:col-span-7", aspect: "aspect-[16/9]" },
  { id: "g9",  src: salon,   fallback: salon,   alt: "Salon interior",            cat: "Salon",  title: "The Atelier",         span: "col-span-1 md:col-span-5", aspect: "aspect-[4/3]" },
  { id: "g10", src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80", fallback: hair, alt: "Precision haircut", cat: "Hair",   title: "Precision Cut",      span: "col-span-1 md:col-span-5", aspect: "aspect-[4/3]" },
  { id: "g11", src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80", fallback: bridal, alt: "Bride portrait", cat: "Bridal", title: "Chantilly Bride",    span: "col-span-1 md:col-span-7", aspect: "aspect-[16/9]" },
  { id: "g12", src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80",  fallback: hair, alt: "Brunette colour",  cat: "Colour", title: "Brunette Melt",      span: "col-span-1 md:col-span-5", aspect: "aspect-[4/3]" },
];

const GALLERY_CATS = ["All", "Hair", "Colour", "Bridal", "Skin", "Makeup", "Nails", "Salon"];

const TEAM = [
  {
    src: expert1,
    name: "Sofia Laurent",
    role: "Creative Director",
    specialty: "Master Balayage & Colour",
    bio: "15 years of Parisian craft. Renowned for seamless dimensional tone graduation and unhurried bespoke consultations.",
  },
  {
    src: expert2,
    name: "Julien Moreau",
    role: "Head of Makeup Artistry",
    specialty: "Editorial & Bridal Looks",
    bio: "Fashion Week artist and editorial specialist. Creates luminous, breathable skin that looks effortless all night.",
  },
  {
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    fallback: expert1,
    name: "Élise Fontaine",
    role: "Lead Aesthetician",
    specialty: "Sculpting & Dermal Health",
    bio: "Certified in clinical botanical skin health and advanced buccal massage. Formulates custom programmes for each client.",
  },
];

const TESTIMONIALS = [
  { q: "The most serene appointment I have experienced. The balayage catches light like silk.", a: "Isabelle R.", s: "Balayage Client" },
  { q: "Julien understood my bridal vision before I found the words. Flawless from first light to last dance.", a: "Amara K.", s: "Bridal Atelier" },
  { q: "Élise's sculpting facial removed weeks of fatigue in ninety minutes. Pure vitality.", a: "Valentina S.", s: "Sculpting Facial" },
  { q: "Colour mastery on par with the finest ateliers in Paris. Truly unhurried and discreet.", a: "Charlotte M.", s: "Colour Client" },
];

const HOURS = [
  ["Tuesday – Friday", "10:00 – 20:00"],
  ["Saturday",         "09:00 – 18:00"],
  ["Sunday",           "By appointment"],
  ["Monday",           "Closed"],
];

/* ══════════════════════════════════════════════════════════════
   HOOKS & SHARED COMPONENTS
══════════════════════════════════════════════════════════════ */

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Immediately reveal if already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100) { el.classList.add("in"); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e?.isIntersecting) { el.classList.add("in"); io.disconnect(); } },
      { threshold: 0.08, rootMargin: "0px 0px 60px 0px" },
    );
    io.observe(el);
    const t = setTimeout(() => el.classList.add("in"), 1500);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);
  return ref;
}

function Reveal({
  children, delay = 0, className = "", mask = false,
}: {
  children: ReactNode; delay?: number; className?: string; mask?: boolean;
}) {
  const ref = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`${mask ? "mask" : "reveal"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Img({
  src, fallback, alt, className = "", eager = false,
}: {
  src: string; fallback?: string; alt: string; className?: string; eager?: boolean;
}) {
  const [cur, setCur] = useState(src);
  useEffect(() => { setCur(src); }, [src]);
  return (
    <img src={cur} alt={alt} loading={eager ? "eager" : "lazy"}
      onError={() => { if (fallback && cur !== fallback) setCur(fallback); }}
      className={className} />
  );
}

/* ══════════════════════════════════════════════════════════════
   HEADER
══════════════════════════════════════════════════════════════ */

function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen]   = useState(false);

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 60);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const links: [string, string][] = [
    ["Services",  "#services"],
    ["Gallery",   "#gallery"],
    ["Our Story", "#story"],
    ["Experts",   "#experts"],
    ["Contact",   "#contact"],
  ];

  return (
    <>
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
      solid || open
        ? "bg-[oklch(0.982_0.008_82)]/97 backdrop-blur-md shadow-sm border-b border-border/50 py-3 text-foreground"
        : "py-5 text-white"
    }`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">

        {/* Logo */}
        <a href="#top" className="flex flex-col leading-none shrink-0">
          <span className="font-serif text-[1.15rem] sm:text-xl tracking-[0.2em]">
            NOURISH SPA
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {links.map(([label, href]) => (
            <a key={href} href={href}
              className="eyebrow text-[0.68rem] link-lux opacity-90 hover:opacity-100 hover:text-accent transition-all">
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer"
          className="hidden lg:inline-flex btn-outline text-sm !py-2.5 !px-5 border-current">
          <FiExternalLink className="w-3.5 h-3.5" />
          Book on Fresha
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="lg:hidden p-2 hover:text-accent transition-colors">
          {open ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
        </button>
      </div>
    </header>

      {/* Mobile drawer — z-[60] so it fully covers the header bar */}
      <div
        className="lg:hidden"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          backgroundColor: "#f9f5f0",
          display: "flex",
          flexDirection: "column",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-6px)",
          pointerEvents: open ? "auto" : "none",
          overflowY: "auto",
        }}
        aria-hidden={!open}
      >
        {/* Drawer top bar — logo + close */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1rem 1.25rem", borderBottom: "1px solid #e5ddd4", flexShrink: 0,
        }}>
          <div>
            <div style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: "1.1rem", letterSpacing: "0.2em", color: "#1a1410" }}>
              NOURISH SPA
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            style={{ padding: "0.5rem", color: "#1a1410", background: "none", border: "none", cursor: "pointer" }}
          >
            <FiX style={{ width: "1.5rem", height: "1.5rem" }} />
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: "1.5rem 1.25rem", display: "flex", flexDirection: "column", gap: "0" }}>
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "1rem 0",
                fontFamily: "Cormorant Garamond, Georgia, serif",
                fontSize: "clamp(1.75rem, 5vw, 2.25rem)",
                color: "#1a1410",
                textDecoration: "none",
                borderBottom: "1px solid #e5ddd4",
                transition: "color 0.2s ease",
              }}
            >
              <span>{label}</span>
              <FiArrowRight style={{ width: "1.1rem", height: "1.1rem", opacity: 0.35 }} />
            </a>
          ))}
          <a
            href={FRESHA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "1rem 0",
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: "clamp(1.75rem, 5vw, 2.25rem)",
              color: "#b8914a",
              textDecoration: "none",
              borderBottom: "1px solid #e5ddd4",
            }}
          >
            <span>Book on Fresha</span>
            <FiExternalLink style={{ width: "1.1rem", height: "1.1rem" }} />
          </a>
        </nav>

        {/* Bottom contact info */}
        <div style={{ padding: "1.25rem", borderTop: "1px solid #e5ddd4", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <a
            href={`tel:${CONTACT.phone}`}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "#6b5c4e", textDecoration: "none" }}
          >
            <FiPhone style={{ width: "1rem", height: "1rem", flexShrink: 0 }} />
            {CONTACT.phone}
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "#6b5c4e", textDecoration: "none" }}
          >
            <FiMail style={{ width: "1rem", height: "1rem", flexShrink: 0 }} />
            {CONTACT.email}
          </a>
        </div>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO — separate mobile/desktop background
══════════════════════════════════════════════════════════════ */

function Hero() {
  return (
    <section id="top"
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-neutral-950 text-white">

      {/* Desktop background (landscape) — hidden on mobile */}
      <div className="absolute inset-0 hidden sm:block">
        <img src={heroDesktop} alt=""
          className="h-full w-full object-cover object-center scale-[1.04]"
          style={{ animation: "heroZoom 12s ease-in-out infinite alternate" }}
          loading="eager" aria-hidden />
      </div>

      {/* Mobile background (portrait) — shown only on mobile */}
      <div className="absolute inset-0 block sm:hidden">
        <img src={heroMobile} alt=""
          className="h-full w-full object-cover object-top"
          loading="eager" aria-hidden />
      </div>

      {/* Gradient overlay — stronger on mobile for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b
        from-black/70 via-black/40 to-black/90
        sm:from-black/55 sm:via-black/25 sm:to-black/82" />

      {/* Top spacer for nav */}
      <div className="relative z-10 pt-20 sm:pt-28" />

      {/* Hero content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10 pb-10 sm:pb-16 flex-1 flex flex-col justify-end gap-6 sm:gap-8">

        {/* Eyebrow */}
        <p className="fade-in eyebrow text-amber-300 flex items-center gap-2 sm:gap-3"
          style={{ animationDelay: ".2s" }}>
          <span className="h-px w-6 sm:w-10 bg-amber-300/60 shrink-0" />
          The Art of Feeling Beautiful
        </p>

        {/* Headline */}
        <h1 className="text-[clamp(2.6rem,9vw,9rem)] leading-[0.93] tracking-[-0.02em] max-w-4xl">
          <span className="line">
            <span style={{ animationDelay: ".3s" }}>Beauty,</span>
          </span>
          <span className="line">
            <span style={{ animationDelay: ".48s" }}>
              Elevated{" "}
              <em className="text-amber-300 not-italic italic">to an Art.</em>
            </span>
          </span>
        </h1>

        {/* Sub-text + CTAs */}
        <div className="fade-in flex flex-col gap-5 sm:gap-6 sm:flex-row sm:items-end sm:justify-between"
          style={{ animationDelay: ".85s" }}>
          <p className="text-[1rem] sm:text-[1.1rem] leading-relaxed text-white/80 max-w-[460px]">
            A private spa for hair, skin and artistry in Riyadh — where every
            ritual is unhurried and every detail is considered.
          </p>

          <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto shrink-0">
            <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-white !py-3.5 !px-6 sm:!px-7 text-[0.72rem] flex items-center justify-center gap-2 w-full sm:w-auto">
              <FiExternalLink className="w-3.5 h-3.5 shrink-0" />
              Book on Fresha
            </a>
            <a href="#book"
              className="btn-outline border-white/50 text-white !py-3.5 !px-6 text-[0.72rem] flex items-center justify-center gap-2 w-full sm:w-auto">
              <FiCalendar className="w-3.5 h-3.5 shrink-0" />
              Enquire Now
            </a>
            <a href="#services"
              className="hidden sm:inline-flex btn-outline border-white/30 text-white/80 !py-3.5 !px-5 text-[0.72rem] items-center justify-center gap-2">
              Explore Services
              <FiArrowRight className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </div>

        {/* Trust badges */}
        <div className="fade-in flex flex-wrap items-center gap-3 sm:gap-4 pt-2 border-t border-white/15"
          style={{ animationDelay: "1.1s" }}>
          {[
            { icon: <FiStar className="w-3.5 h-3.5 text-amber-300" />, text: "4.9 Excellence Rating" },
            { icon: <FiClock className="w-3.5 h-3.5 text-amber-300" />, text: "Unhurried · Private Suites" },
            { icon: <FiUser className="w-3.5 h-3.5 text-amber-300" />, text: "1-on-1 Dedicated Artist" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-white/70 text-xs sm:text-sm">
              {icon}
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator — hidden on mobile */}
      <a href="#services" aria-label="Scroll down"
        className="relative z-10 mx-auto mb-6 hidden sm:flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors">
        <span className="eyebrow text-[0.6rem]">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/25">
          <span className="scroll-dot absolute inset-x-0 h-1/2 bg-amber-300" />
        </span>
      </a>

      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1.04); }
          to   { transform: scale(1.12); }
        }
      `}</style>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SERVICES + PRICING
══════════════════════════════════════════════════════════════ */

function Services() {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Hair", "Colour", "Bridal", "Skin", "Nails", "Makeup"];
  const visible = activeTab === "All"
    ? SERVICES
    : SERVICES.filter(s => s.category === activeTab);

  return (
    <section id="services" className="bg-[oklch(0.15_0.025_45)] text-white py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between mb-10 sm:mb-14 pb-8 sm:pb-10 border-b border-white/12">
          <div>
            <Reveal>
              <p className="eyebrow text-amber-300 flex items-center gap-2 mb-3">
                <span className="h-px w-6 bg-amber-300/60" />
                Services & Pricing
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-[clamp(2.2rem,5.5vw,5rem)] leading-none">
                The Atelier Menu
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="text-white/65 text-[0.9375rem] sm:text-base max-w-xs leading-relaxed">
              Every service includes a private consultation. No templates, no rush.
            </p>
          </Reveal>
        </div>

        {/* Category tabs — scrollable on mobile */}
        <Reveal delay={60}>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap mb-8 sm:mb-10">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`pill shrink-0 !border-white/20 !text-white/60 hover:!text-white hover:!bg-white/10 hover:!border-white/40 ${
                  activeTab === tab ? "!bg-amber-300/90 !text-neutral-900 !border-amber-300 font-semibold" : ""
                }`}>
                {tab}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Service cards grid */}
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((svc, i) => (
            <Reveal key={svc.id} delay={i * 60}>
              <div className="group relative overflow-hidden border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-amber-300/40 transition-all duration-400">
                {/* Image */}
                <div className="aspect-[3/2] overflow-hidden">
                  <Img src={svc.img} fallback={svc.fallback} alt={svc.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="text-amber-300 shrink-0">{svc.icon}</div>
                      <div>
                        <h3 className="font-serif text-lg sm:text-xl leading-tight text-white">{svc.title}</h3>
                        <p className="eyebrow text-[0.6rem] text-amber-300/70 mt-0.5">{svc.subtitle}</p>
                      </div>
                    </div>
                    {/* Price badge */}
                    <div className="shrink-0 text-right">
                      <div className="font-serif text-lg text-amber-300 leading-tight">{svc.price}</div>
                      <div className="flex items-center gap-1 text-[0.7rem] text-white/45 mt-0.5 justify-end">
                        <FiClock className="w-3 h-3" />
                        {svc.duration}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-white/65 leading-relaxed mb-4">{svc.desc}</p>

                  <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 eyebrow text-[0.66rem] text-amber-300 hover:gap-3 transition-all duration-200">
                    <span>Book on Fresha</span>
                    <FiExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Signature experience banner */}
        <Reveal delay={100} className="mt-8 sm:mt-10">
          <div className="relative overflow-hidden border border-amber-300/30 bg-amber-300/5 p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex-1">
              <p className="eyebrow text-amber-300 text-[0.66rem] mb-2 flex items-center gap-2">
                <span className="h-px w-5 bg-amber-300/60" />
                The Signature Experience
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl text-white mb-2">
                Three Hours. <em className="text-amber-300 not-italic italic">No Clocks.</em>
              </h3>
              <p className="text-white/65 text-sm sm:text-base max-w-lg">
                Champagne on arrival, scalp ritual, bespoke colour, and a botanical facial — all in
                your private suite. Price by consultation.
              </p>
            </div>
            <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-white shrink-0 !py-3.5 !px-6 text-[0.72rem] flex items-center gap-2">
              <FiExternalLink className="w-3.5 h-3.5 shrink-0" />
              Book on Fresha
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   GALLERY
══════════════════════════════════════════════════════════════ */

function Gallery() {
  const [activeCat, setActiveCat] = useState("All");
  const [lb, setLb]               = useState<typeof GALLERY_ITEMS[0] | null>(null);
  const filtered = activeCat === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.cat === activeCat);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setLb(null); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lb ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lb]);

  return (
    <section id="gallery" className="py-20 sm:py-28 lg:py-36 bg-background border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8 sm:mb-10 pb-8 border-b border-border">
          <div>
            <Reveal>
              <p className="eyebrow text-accent flex items-center gap-2 mb-3">
                <span className="h-px w-6 bg-accent/60" />
                Transformations
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-[clamp(2.2rem,5vw,5rem)] leading-none text-foreground">
                Our Portfolio
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <a href={CONTACT.instagram} className="eyebrow link-lux text-muted-foreground flex items-center gap-2 text-[0.68rem]">
              <FiInstagram className="w-4 h-4" />
              Follow on Instagram
            </a>
          </Reveal>
        </div>

        {/* Filter pills */}
        <Reveal delay={60}>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap mb-8">
            {GALLERY_CATS.map(cat => (
              <button key={cat} onClick={() => setActiveCat(cat)}
                className={`pill shrink-0 ${activeCat === cat ? "active" : ""}`}>
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Masonry-style grid */}
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-12">
          {filtered.map((item, i) => (
            <Reveal key={item.id} mask delay={Math.min(i * 70, 420)}
              className={`${item.span} ${item.aspect} min-h-[220px] sm:min-h-0`}>
              <div className="gallery-item w-full h-full"
                onClick={() => setLb(item)} role="button" tabIndex={0}
                onKeyDown={e => { if (e.key === "Enter") setLb(item); }}
                aria-label={`View ${item.title}`}>
                <Img src={item.src} fallback={item.fallback} alt={item.alt}
                  className="w-full h-full object-cover" />
                <div className="gallery-overlay" />
                <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5 opacity-0 [.gallery-item:hover_&]:opacity-100 transition-opacity duration-400">
                  <p className="eyebrow text-amber-300 text-[0.6rem] mb-1">{item.cat}</p>
                  <p className="font-serif text-lg sm:text-xl text-white italic">{item.title}</p>
                  <p className="eyebrow text-amber-300/80 text-[0.6rem] mt-2 flex items-center gap-1">
                    Book This Look <FiArrowRight className="w-3 h-3" />
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lb && (
        <div className="lb-backdrop" onClick={() => setLb(null)} role="dialog" aria-modal aria-label={lb.alt}>
          <button onClick={() => setLb(null)} aria-label="Close"
            className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 text-white/70 hover:text-white p-2 border border-white/20 hover:border-white transition-colors">
            <FiX className="w-5 h-5" />
          </button>
          <figure className="flex flex-col items-center gap-4 max-w-4xl w-full"
            onClick={e => e.stopPropagation()}>
            <img src={lb.src} alt={lb.alt}
              className="max-h-[75vh] max-w-full object-contain"
              onError={e => { if (lb.fallback) (e.currentTarget as HTMLImageElement).src = lb.fallback; }} />
            <figcaption className="text-center">
              <p className="eyebrow text-amber-300 text-[0.65rem] mb-1">{lb.cat}</p>
              <p className="font-serif text-xl text-white italic">{lb.title}</p>
              <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer" onClick={() => setLb(null)}
                className="mt-3 inline-flex items-center gap-2 btn-white !py-2.5 !px-5 text-[0.68rem]">
                <FiExternalLink className="w-3.5 h-3.5" />
                Book on Fresha
              </a>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   STORY
══════════════════════════════════════════════════════════════ */

function Story() {
  return (
    <section id="story" className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-20 sm:py-28 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">

          {/* Text */}
          <div>
            <Reveal>
              <p className="eyebrow text-accent flex items-center gap-2 mb-4">
                <span className="h-px w-6 bg-accent/60" />
                Our Story — Est. 2014
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-[clamp(2.2rem,4.5vw,4.5rem)] leading-[1.04] mb-6 sm:mb-8">
                A house devoted to the{" "}
                <em className="text-accent not-italic italic">quiet</em> luxury of care.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="space-y-4 text-muted-foreground text-base sm:text-[1.0625rem] leading-relaxed">
                <p>Nourish Spa began with a single chair and an uncompromising belief: beauty is not something applied, but something revealed through patient, masterful craft.</p>
                <p>Today our spa brings together master colourists, skin scientists and editorial artists who allocate double the standard appointment time — so you never feel hurried.</p>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <a href="#philosophy" className="eyebrow link-lux mt-8 inline-flex items-center gap-2 text-foreground text-[0.72rem]">
                Our Philosophy
                <FiArrowRight className="w-3.5 h-3.5" />
              </a>
            </Reveal>

            {/* Stats row */}
            <Reveal delay={300} className="mt-10 grid grid-cols-3 gap-4 sm:gap-6 border-t border-border pt-8">
              {[["12+", "Years"], ["3,400+", "Clients"], ["7", "Disciplines"]].map(([n, l]) => (
                <div key={l} className="text-center">
                  <div className="font-serif text-[2.2rem] sm:text-[2.8rem] leading-none text-accent">{n}</div>
                  <p className="eyebrow text-[0.62rem] text-muted-foreground mt-1">{l}</p>
                </div>
              ))}
            </Reveal>
          </div>

          {/* Image stack */}
          <div className="relative mt-4 lg:mt-0">
            <Reveal mask className="aspect-[4/5] overflow-hidden shadow-xl">
              <img src={hair} alt="Stylist shaping hair in the atelier"
                className="w-full h-full object-cover" loading="lazy" />
            </Reveal>
            {/* Floating card */}
            <Reveal delay={300}
              className="absolute -bottom-6 -left-4 sm:-left-8 z-10 w-[65%] sm:w-[55%] bg-card border border-border shadow-xl p-4 sm:p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-9 w-9 sm:h-11 sm:w-11 overflow-hidden shrink-0">
                  <img src={salon} alt="Salon interior" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div>
                  <p className="font-serif text-sm sm:text-base leading-tight text-foreground">Private Acoustic Suite</p>
                  <p className="eyebrow text-[0.58rem] text-accent mt-0.5">Zero background noise</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-snug">
                Dedicated single-chair service. Your session, your soundtrack.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Philosophy strip */}
      <div id="philosophy" className="bg-secondary border-t border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
          <Reveal className="mb-10 sm:mb-14 text-center">
            <p className="font-serif text-[clamp(1.35rem,3vw,2.6rem)] leading-snug max-w-3xl mx-auto">
              "Self-care is not indulgence, but a{" "}
              <em className="text-accent not-italic italic">ritual of respect</em> — for your time,
              your skin, and the person you are becoming."
            </p>
          </Reveal>
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-3">
            {[
              { icon: <PiFlowerLotusThin className="w-7 h-7 text-accent" />, title: "Considered", desc: "Every service begins with listening. Your vision shapes every decision." },
              { icon: <PiHandHeartThin className="w-7 h-7 text-accent" />,   title: "Conscious",  desc: "Clean, high-performance formulas chosen for efficacy and integrity." },
              { icon: <PiClockCountdownThin className="w-7 h-7 text-accent" />, title: "Unhurried", desc: "Generous appointment times. Time is the true luxury of modern beauty." },
            ].map(({ icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 100}
                className="border-t-2 border-accent/30 pt-5 sm:pt-6">
                <div className="mb-3">{icon}</div>
                <h3 className="font-serif text-xl sm:text-2xl mb-2">{title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   EXPERTS
══════════════════════════════════════════════════════════════ */

function Experts() {
  return (
    <section id="experts" className="bg-card py-20 sm:py-28 lg:py-36 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-12 sm:mb-16 pb-8 border-b border-border">
          <div>
            <Reveal>
              <p className="eyebrow text-accent flex items-center gap-2 mb-3">
                <span className="h-px w-6 bg-accent/60" />
                Meet the Experts
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-[clamp(2.2rem,5vw,5rem)] leading-none">The Atelier</h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xs">
              Each artist brings years of specialist training and zero compromise on craft.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 120} className={i === 1 ? "lg:mt-12" : ""}>
              <div className="group">
                <div className="aspect-[3/4] overflow-hidden mb-5 sm:mb-6 bg-muted">
                  <Img src={m.src} fallback={"fallback" in m ? (m as any).fallback : undefined}
                    alt={`Portrait of ${m.name}`}
                    className="w-full h-full object-cover grayscale-[25%] transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0" />
                </div>
                <div className="border-t border-border pt-5">
                  <h3 className="font-serif text-xl sm:text-2xl text-foreground">{m.name}</h3>
                  <p className="eyebrow text-accent text-[0.62rem] mt-1 mb-3">{m.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{m.bio}</p>
                  <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer"
                    className="eyebrow link-lux text-[0.65rem] text-muted-foreground flex items-center gap-1.5">
                    Book with {m.name.split(" ")[0]}
                    <FiExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   TESTIMONIALS
══════════════════════════════════════════════════════════════ */

function Testimonials() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(x => (x + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="bg-[oklch(0.15_0.025_45)] text-white py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 items-start">

          {/* Left — label + counter */}
          <div className="lg:col-span-4 flex lg:flex-col gap-6 items-center lg:items-start">
            <Reveal>
              <p className="eyebrow text-amber-300 flex items-center gap-2">
                <FiStar className="w-4 h-4" />
                Client Words
              </p>
            </Reveal>
            <div className="font-serif text-[5rem] sm:text-[7rem] leading-none text-amber-300/15 select-none">
              "
            </div>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, k) => (
                <button key={k} onClick={() => setActive(k)} aria-label={`Testimonial ${k + 1}`}
                  className={`h-[2px] transition-all duration-400 ${
                    k === active ? "w-8 bg-amber-300" : "w-4 bg-white/20"
                  }`} />
              ))}
            </div>
          </div>

          {/* Right — testimonial */}
          <div className="lg:col-span-8 relative min-h-[200px] sm:min-h-[180px]" aria-live="polite">
            {TESTIMONIALS.map((t, k) => (
              <figure key={k}
                className={`absolute inset-0 transition-all duration-700 ${
                  k === active
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`} aria-hidden={k !== active}>
                <blockquote className="font-serif text-[clamp(1.25rem,2.8vw,2.2rem)] leading-[1.3] text-white">
                  "{t.q}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-amber-300" />
                  <div>
                    <p className="font-serif text-base sm:text-lg text-white">{t.a}</p>
                    <p className="eyebrow text-[0.62rem] text-amber-300/60 mt-0.5">{t.s}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="flex justify-end gap-2 mt-14 sm:mt-10">
          <button onClick={() => setActive(x => (x - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            aria-label="Previous" className="p-2.5 border border-white/20 text-white/60 hover:border-amber-300 hover:text-amber-300 transition-colors">
            <FiChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => setActive(x => (x + 1) % TESTIMONIALS.length)}
            aria-label="Next" className="p-2.5 border border-white/20 text-white/60 hover:border-amber-300 hover:text-amber-300 transition-colors">
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   BOOKING
══════════════════════════════════════════════════════════════ */

function Booking() {
  const [selected, setSelected] = useState<string[]>([]);
  const [errors,   setErrors]   = useState<Record<string, string>>({});
  const [done,     setDone]     = useState<string | null>(null);

  const toggle = (name: string) =>
    setSelected(p => p.includes(name) ? p.filter(s => s !== name) : [...p, name]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const g  = (k: string) => String(fd.get(k) ?? "").trim();
    const err: Record<string, string> = {};

    if (!g("name"))    err.name    = "Please share your name.";
    const c = g("contact");
    if (!c)            err.contact = "Please add an email or phone.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c) && !/^[+\d][\d\s()-]{6,}$/.test(c))
      err.contact = "Enter a valid email or phone number.";
    if (!selected.length) err.service = "Please select at least one service.";
    if (!g("date"))    err.date    = "Please choose a preferred date.";

    setErrors(err);
    if (!Object.keys(err).length) setDone(g("name"));
  };

  return (
    <section id="book" className="grain bg-[oklch(0.15_0.025_45)] text-white py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Left — context */}
          <div>
            <Reveal>
              <p className="eyebrow text-amber-300 flex items-center gap-2 mb-4">
                <span className="h-px w-6 bg-amber-300/60" />
                Reservations
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-[clamp(2.2rem,5vw,4.5rem)] leading-none mb-6">
                Reserve your{" "}
                <em className="text-amber-300 not-italic italic">moment.</em>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-white/65 text-base sm:text-[1.0625rem] leading-relaxed mb-8 max-w-md">
                Share your preferences and our concierge will be in touch to
                confirm. Every booking begins with a personal welcome.
              </p>
            </Reveal>

            {/* Salon image */}
            <Reveal mask delay={200} className="aspect-[4/3] overflow-hidden mb-8">
              <img src={salon} alt="Nourish Spa salon" className="w-full h-full object-cover" loading="lazy" />
            </Reveal>

            {/* Contact info */}
            <Reveal delay={260}>
              <div className="space-y-3 pt-6 border-t border-white/12">
                <p className="eyebrow text-white/40 text-[0.65rem] mb-3">Prefer to call?</p>
                <a href={`tel:${CONTACT.phone}`}
                  className="flex items-center gap-3 font-serif text-xl sm:text-2xl link-lux">
                  <FiPhone className="w-4 h-4 text-amber-300 shrink-0" />
                  {CONTACT.phone}
                </a>
                <a href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 text-base text-white/65 link-lux mt-1">
                  <FiMail className="w-4 h-4 text-amber-300 shrink-0" />
                  {CONTACT.email}
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal delay={120}>
            {/* Fresha primary booking CTA */}
            <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-white w-full !py-4 text-[0.74rem] flex items-center justify-center gap-2.5 mb-4">
              <FiExternalLink className="w-4 h-4 shrink-0" />
              Book Instantly on Fresha
            </a>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-white/15" />
              <span className="eyebrow text-white/35 text-[0.6rem]">or send an enquiry below</span>
              <div className="flex-1 h-px bg-white/15" />
            </div>

            {done ? (
              /* Success state */
              <div className="border border-amber-300/30 bg-amber-300/5 p-8 sm:p-10 flex flex-col items-start" role="status">
                <div className="w-12 h-12 rounded-full bg-amber-300/20 flex items-center justify-center mb-6">
                  <FiCheck className="w-6 h-6 text-amber-300" />
                </div>
                <p className="eyebrow text-amber-300 text-[0.68rem] mb-3">Request Received</p>
                <h3 className="font-serif text-3xl sm:text-4xl text-white mb-4">Merci, {done}.</h3>
                <p className="text-white/65 text-sm sm:text-base leading-relaxed mb-3">
                  Your preferences have been noted. Our team will be in touch shortly to confirm.
                </p>
                <p className="text-xs text-white/35 border border-white/10 p-3 mb-8">
                  <strong className="font-normal text-amber-300/70">Note:</strong> This is a demonstration form —
                  no real appointment has been sent to the salon.
                </p>
                <button onClick={() => { setDone(null); setSelected([]); setErrors({}); }}
                  className="btn-outline border-white/50 text-white text-[0.72rem]">
                  Make Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="space-y-7">

                {/* Name */}
                <div>
                  <label htmlFor="f-name" className="eyebrow text-white/50 text-[0.65rem] flex items-center gap-1.5 mb-1.5">
                    <FiUser className="w-3 h-3" /> Full Name *
                  </label>
                  <input id="f-name" name="name" placeholder="Your full name"
                    className="field" autoComplete="name" />
                  {errors.name && <p className="mt-1.5 text-xs text-rose-400" role="alert">{errors.name}</p>}
                </div>

                {/* Contact */}
                <div>
                  <label htmlFor="f-contact" className="eyebrow text-white/50 text-[0.65rem] flex items-center gap-1.5 mb-1.5">
                    <FiMail className="w-3 h-3" /> Email or Phone *
                  </label>
                  <input id="f-contact" name="contact" placeholder="email@example.com or +1 555 000"
                    className="field" />
                  {errors.contact && <p className="mt-1.5 text-xs text-rose-400" role="alert">{errors.contact}</p>}
                </div>

                {/* Service chips */}
                <div>
                  <p className="eyebrow text-white/50 text-[0.65rem] flex items-center gap-1.5 mb-3">
                    <FiScissors className="w-3 h-3" /> Select Service(s) *
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[...SERVICES.map(s => s.title), "The Signature Experience"].map(name => (
                      <button key={name} type="button" onClick={() => toggle(name)}
                        aria-pressed={selected.includes(name)}
                        className={`px-3.5 py-2 text-[0.68rem] tracking-wider uppercase font-medium border transition-all duration-250 ${
                          selected.includes(name)
                            ? "bg-amber-300 text-neutral-900 border-amber-300"
                            : "border-white/20 text-white/55 hover:border-amber-300/50 hover:text-white"
                        }`}>
                        {name}
                      </button>
                    ))}
                  </div>
                  {errors.service && <p className="mt-2 text-xs text-rose-400" role="alert">{errors.service}</p>}
                </div>

                {/* Stylist */}
                <div>
                  <label htmlFor="f-stylist" className="eyebrow text-white/50 text-[0.65rem] flex items-center gap-1.5 mb-1.5">
                    <FiUser className="w-3 h-3" /> Preferred Stylist
                  </label>
                  <select id="f-stylist" name="stylist" className="field">
                    <option value="">No preference</option>
                    {TEAM.map(m => <option key={m.name}>{m.name}</option>)}
                  </select>
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="f-date" className="eyebrow text-white/50 text-[0.65rem] flex items-center gap-1.5 mb-1.5">
                      <FiCalendar className="w-3 h-3" /> Preferred Date *
                    </label>
                    <input id="f-date" name="date" type="date"
                      className="field [color-scheme:dark]" />
                    {errors.date && <p className="mt-1.5 text-xs text-rose-400" role="alert">{errors.date}</p>}
                  </div>
                  <div>
                    <label htmlFor="f-time" className="eyebrow text-white/50 text-[0.65rem] flex items-center gap-1.5 mb-1.5">
                      <FiClock className="w-3 h-3" /> Time Preference
                    </label>
                    <select id="f-time" name="time" className="field">
                      <option>Morning  (9am – 12pm)</option>
                      <option>Afternoon (12pm – 4pm)</option>
                      <option>Evening  (4pm – 8pm)</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="f-msg" className="eyebrow text-white/50 text-[0.65rem] mb-1.5 block">
                    Additional Notes
                  </label>
                  <textarea id="f-msg" name="message" rows={3} placeholder="Allergies, preferences, or anything we should know…"
                    className="field resize-none" />
                </div>

                {/* Submit */}
                <div className="pt-2 space-y-3">
                  <button type="submit"
                    className="btn-white w-full !py-4 text-[0.72rem] flex items-center justify-center gap-2">
                    <FiCalendar className="w-4 h-4 shrink-0" />
                    Reserve Your Experience
                  </button>
                  <p className="text-center text-[0.72rem] text-white/30">
                    Personalised service · Demo form · No data is transmitted
                  </p>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════════════════ */

function Contact() {
  return (
    <section id="contact" className="overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-12">
        {/* Info */}
        <div className="px-4 sm:px-6 lg:px-10 py-20 sm:py-28 lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-accent flex items-center gap-2 mb-4">
              <span className="h-px w-6 bg-accent/60" />
              Location & Contact
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-[clamp(2.2rem,4vw,4rem)] leading-none mb-8">Visit the Maison</h2>
          </Reveal>

          <Reveal delay={140}>
            <div className="space-y-4 mb-8">
              <a href={`tel:${CONTACT.phone}`}
                className="flex items-center gap-3 text-foreground hover:text-accent transition-colors group">
                <div className="w-9 h-9 shrink-0 border border-border flex items-center justify-center text-accent group-hover:border-accent transition-colors">
                  <FiPhone className="w-4 h-4" />
                </div>
                <span className="text-sm sm:text-base">{CONTACT.phone}</span>
              </a>
              <a href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 text-foreground hover:text-accent transition-colors group">
                <div className="w-9 h-9 shrink-0 border border-border flex items-center justify-center text-accent group-hover:border-accent transition-colors">
                  <FiMail className="w-4 h-4" />
                </div>
                <span className="text-sm sm:text-base">{CONTACT.email}</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-9 h-9 shrink-0 border border-border flex items-center justify-center text-accent">
                  <FiMapPin className="w-4 h-4" />
                </div>
                <span className="text-sm sm:text-base">{CONTACT.address}</span>
              </div>
            </div>
          </Reveal>

          {/* Hours */}
          <Reveal delay={200}>
            <div className="border-t border-border">
              {HOURS.map(([day, time]) => (
                <div key={day} className="flex items-center justify-between py-3.5 border-b border-border text-sm sm:text-base">
                  <dt className="text-foreground">{day}</dt>
                  <dd className="text-muted-foreground">{time}</dd>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Social */}
          <Reveal delay={280}>
            <div className="mt-8 flex items-center gap-4">
              <p className="eyebrow text-muted-foreground text-[0.65rem]">Follow</p>
              {[
                { icon: <FiInstagram className="w-4 h-4" />, href: CONTACT.instagram, label: "Instagram" },
                { icon: <FaPinterestP className="w-4 h-4" />, href: CONTACT.pinterest, label: "Pinterest" },
                { icon: <FaTiktok className="w-4 h-4" />,    href: CONTACT.tiktok,    label: "TikTok" },
              ].map(({ icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-colors">
                  {icon}
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Salon image */}
        <Reveal mask delay={120} className="min-h-[320px] sm:min-h-[420px] lg:col-span-7">
          <img src={salon} alt="Nourish Spa interior"
            className="w-full h-full object-cover min-h-[320px] sm:min-h-[420px]" loading="lazy" />
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════ */

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[oklch(0.15_0.025_45)] text-white pt-20 sm:pt-28 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">

        {/* Top */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between pb-14 sm:pb-16 border-b border-white/10">
          <Reveal>
            <h2 className="text-[clamp(2.4rem,6.5vw,6.5rem)] leading-[0.93]">
              The Art of<br />
              <em className="text-amber-300 not-italic italic">Feeling Beautiful.</em>
            </h2>          </Reveal>
          <Reveal delay={120}>
            <a href={FRESHA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-white self-start shrink-0 flex items-center gap-2 !py-3.5">
              <FiExternalLink className="w-4 h-4 shrink-0" />
              Book on Fresha
            </a>
          </Reveal>
        </div>

        {/* Grid */}
        <div className="grid gap-10 py-12 sm:py-14 grid-cols-2 sm:grid-cols-4">
          <div>
            <p className="font-serif text-lg tracking-[0.2em] mb-4">NOURISH SPA</p>
            <p className="text-white/45 text-sm leading-relaxed">
              A private spa for hair, skin and artistry in Riyadh.
            </p>
          </div>
          <div>
            <p className="eyebrow text-white/35 text-[0.6rem] mb-4">Navigate</p>
            <ul className="space-y-2.5">
              {[["Services","#services"],["Gallery","#gallery"],["Our Story","#story"],["Experts","#experts"],["Contact","#contact"]].map(([l,h]) => (
                <li key={h}><a href={h} className="text-sm text-white/60 link-lux hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-white/35 text-[0.6rem] mb-4">Follow</p>
            <ul className="space-y-2.5">
              {[
                [<FiInstagram className="w-3.5 h-3.5 shrink-0" />, "Instagram", CONTACT.instagram],
                [<FaPinterestP className="w-3.5 h-3.5 shrink-0" />, "Pinterest", CONTACT.pinterest],
                [<FaTiktok className="w-3.5 h-3.5 shrink-0" />, "TikTok", CONTACT.tiktok],
              ].map(([icon, label, href]) => (
                <li key={label as string}>
                  <a href={href as string} className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
                    {icon as ReactNode}{label as string}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-white/35 text-[0.6rem] mb-4">Visit</p>
            <address className="not-italic space-y-2">
              <p className="text-sm text-white/55 leading-snug">{CONTACT.address}</p>
              <p className="text-sm text-white/55">{CONTACT.phone}</p>
              <p className="text-sm text-white/55">{CONTACT.email}</p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6 border-t border-white/10">
          <p className="text-[0.7rem] text-white/30">© {year} Nourish Spa. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="text-[0.7rem] text-white/30 link-lux hover:text-white/60 transition-colors">Privacy</a>
            <a href="#" className="text-[0.7rem] text-white/30 link-lux hover:text-white/60 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <Story />
        <Testimonials />
        <Experts />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
