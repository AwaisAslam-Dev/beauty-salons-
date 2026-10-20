import { createFileRoute } from "@tanstack/react-router";
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type FormEvent,
  type ReactNode,
} from "react";
import hero from "@/assets/hero.jpg";
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
      { title: "Maison Beauté 2026 — The Art of Feeling Beautiful · Paris Atelier" },
      {
        name: "description",
        content:
          "High-end international beauty atelier for bespoke hair transformations, hand-painted balayage, bridal couture, sculpting facials, and quiet nail artistry.",
      },
      {
        property: "og:title",
        content: "Maison Beauté — The Art of Feeling Beautiful",
      },
      {
        property: "og:description",
        content:
          "An exceptional luxury beauty salon experience. Unhurried care, master colourists, and bespoke rituals in our Parisian atelier.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ─── Contact & Config ───────────────────────────────────────── */
const CONTACT = {
  phone: "+33 (0) 1 42 68 55 00",
  email: "concierge@maisonbeaute.fr",
  address: "24 Rue de la Paix, 75002 Paris, France",
  instagram: "https://instagram.com",
  pinterest: "https://pinterest.com",
  tiktok: "https://tiktok.com",
};

/* ─── Services Data ──────────────────────────────────────────── */
const SERVICES = [
  {
    n: "01",
    t: "Hair Styling",
    d: "Precision cuts, bespoke texturing and couture blow-outs sculpted to your facial silhouette.",
    p: "From €95",
    time: "60–75 min",
    category: "Hair",
    img: hair,
    alt: "Stylist shaping glossy brunette hair in salon",
  },
  {
    n: "02",
    t: "Hair Colour & Balayage",
    d: "Hand-painted balayage, gloss melting, and dimensional tone adjustments with hair-health bonding.",
    p: "From €165",
    time: "120–180 min",
    category: "Colour",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    fallbackImg: hair,
    alt: "Golden Parisian balayage colour result",
  },
  {
    n: "03",
    t: "Bridal Atelier",
    d: "Comprehensive trial, wedding-day hair, luminous makeup artistry, and attendant stylist service.",
    p: "By consultation",
    time: "Half / Full Day",
    category: "Bridal",
    img: bridal,
    alt: "Bridal updo with soft romantic waves",
  },
  {
    n: "04",
    t: "Sculpting Facials",
    d: "Manual buccal and lymphatic sculpting combined with botanical micro-infusions for lasting lift.",
    p: "From €145",
    time: "75–90 min",
    category: "Skin",
    img: facial,
    alt: "Luminous skin after clinical botanical facial",
  },
  {
    n: "05",
    t: "Cellular Skincare",
    d: "Custom skin health programmes, enzyme resurfacing, and deep dermal hydration rituals.",
    p: "From €125",
    time: "60 min",
    category: "Skin",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    fallbackImg: facial,
    alt: "Botanical skincare application ritual",
  },
  {
    n: "06",
    t: "Russian Nail Artistry",
    d: "Dry hardware cuticle perfection, restorative rubber base gel, and understated editorial nail art.",
    p: "From €70",
    time: "75–90 min",
    category: "Nails",
    img: nails,
    alt: "Clean nude almond manicure with gel overlay",
  },
  {
    n: "07",
    t: "Editorial Makeup",
    d: "Red carpet, gala, and photoshoot makeup tailored to daylight and studio flash photography.",
    p: "From €120",
    time: "60–75 min",
    category: "Makeup",
    img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80",
    fallbackImg: hero,
    alt: "High-end editorial makeup application",
  },
];

/* ─── Gallery Items (14 Populated Editorial Transformations) ─── */
const GALLERY_ITEMS = [
  {
    id: "g1",
    src: hair,
    fallback: hair,
    alt: "Glossy brunette couture blow-out styling",
    cat: "Hair",
    serviceName: "Hair Styling",
    title: "Gloss & Silk Blow-out",
    desc: "Precision sculpt and dimensional silk finish",
    span: "md:col-span-7",
    aspect: "aspect-[16/11]",
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
    fallback: hair,
    alt: "Sun-kissed Parisian balayage transformation",
    cat: "Colour",
    serviceName: "Hair Colour & Balayage",
    title: "Sun-Kissed Balayage",
    desc: "Hand-painted natural graduation with glass gloss",
    span: "md:col-span-5",
    aspect: "aspect-[4/3]",
  },
  {
    id: "g3",
    src: bridal,
    fallback: bridal,
    alt: "Bespoke bridal hair and veil styling",
    cat: "Bridal",
    serviceName: "Bridal Atelier",
    title: "Royal Bridal Atelier",
    desc: "Soft sculpted waves designed for day-to-night hold",
    span: "md:col-span-5",
    aspect: "aspect-[4/3]",
  },
  {
    id: "g4",
    src: facial,
    fallback: facial,
    alt: "Luminous sculpting facial treatment result",
    cat: "Skin",
    serviceName: "Sculpting Facials",
    title: "Sculpting Facial Ritual",
    desc: "Deep lymphatic drainage and botanical cellular infusion",
    span: "md:col-span-7",
    aspect: "aspect-[16/11]",
  },
  {
    id: "g5",
    src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=80",
    fallback: hero,
    alt: "Editorial beauty makeup artistry",
    cat: "Makeup",
    serviceName: "Editorial Makeup",
    title: "Editorial Parisian Glamour",
    desc: "Weightless velvet complexion with defined eye contour",
    span: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    id: "g6",
    src: nails,
    fallback: nails,
    alt: "Nude almond Russian manicure",
    cat: "Nails",
    serviceName: "Russian Nail Artistry",
    title: "Quiet Luxury Manicure",
    desc: "Russian precision cuticle work with bespoke nude tint",
    span: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    id: "g7",
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
    fallback: facial,
    alt: "Skin therapy with botanical serums",
    cat: "Skin",
    serviceName: "Cellular Skincare",
    title: "Cellular Radiance Infusion",
    desc: "Antioxidant restorative treatment for deep luminosity",
    span: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    id: "g8",
    src: hero,
    fallback: hero,
    alt: "Golden hour beauty portrait",
    cat: "Makeup",
    serviceName: "Editorial Makeup",
    title: "Luminous Sunset Portrait",
    desc: "Dewy skin finish with champagne highlight accents",
    span: "md:col-span-8",
    aspect: "aspect-[16/10]",
  },
  {
    id: "g9",
    src: salon,
    fallback: salon,
    alt: "Maison Beauté salon interior and suites",
    cat: "Salon",
    serviceName: "The Signature Experience",
    title: "The Atelier Sanctuary",
    desc: "Private consultation booths and custom acoustics",
    span: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    id: "g10",
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
    fallback: hair,
    alt: "Precision hair cutting and texture",
    cat: "Hair",
    serviceName: "Hair Styling",
    title: "Architectural Precision Cut",
    desc: "Sculpted lines tailored to individual bone structure",
    span: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    id: "g11",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    fallback: bridal,
    alt: "Classic bridal veil and luminous glow",
    cat: "Bridal",
    serviceName: "Bridal Atelier",
    title: "Chantilly Couture Bride",
    desc: "Timeless elegance with bespoke floral hair accents",
    span: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    id: "g12",
    src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=80",
    fallback: hair,
    alt: "Hand-painted dimensional brunette melt",
    cat: "Colour",
    serviceName: "Hair Colour & Balayage",
    title: "Dimensional Brunette Melt",
    desc: "Cool mocha roots graduating into warm hazelnut ribbons",
    span: "md:col-span-4",
    aspect: "aspect-[4/5]",
  },
  {
    id: "g13",
    src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80",
    fallback: nails,
    alt: "Minimalist chrome and milky gel nails",
    cat: "Nails",
    serviceName: "Russian Nail Artistry",
    title: "Milky Glaze Gel Art",
    desc: "Sheer porcelain overlay with subtle pearl finish",
    span: "md:col-span-6",
    aspect: "aspect-[16/11]",
  },
  {
    id: "g14",
    src: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80",
    fallback: salon,
    alt: "Hair wash sanctuary basin with dimmed lighting",
    cat: "Salon",
    serviceName: "The Signature Experience",
    title: "Scalp Awakening Basin",
    desc: "Aromatherapy steam ritual with ergonomic lie-flat recliners",
    span: "md:col-span-6",
    aspect: "aspect-[16/11]",
  },
];

const GALLERY_CATS = ["All", "Hair", "Colour", "Bridal", "Skin", "Makeup", "Nails", "Salon"];

/* ─── Team Data ──────────────────────────────────────────────── */
const TEAM = [
  {
    src: expert1,
    name: "Sofia Laurent",
    role: "Founder & Creative Director",
    specialty: "Master Balayage & Couture Colour",
    bio: "15 years of Parisian craft. Trained at École Supérieure de Coiffure Paris. Renowned for seamless dimensional tone graduation and unhurried bespoke consultations.",
  },
  {
    src: expert2,
    name: "Julien Moreau",
    role: "Head of Makeup & Bridal Artistry",
    specialty: "Editorial & Red Carpet Artistry",
    bio: "Resident artist for Fashion Week runways and editorial covers. Julien specializes in luminous, breathable skin and bridal styling that remains effortless all night.",
  },
  {
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    fallbackSrc: expert1,
    name: "Élise Fontaine",
    role: "Lead Aesthetician & Skin Scientist",
    specialty: "Lymphatic Sculpting & Dermal Health",
    bio: "Certified in clinical botanical skin health and advanced buccal massage. Élise formulates custom cellular programmes for discerning international clientele.",
  },
];

/* ─── Testimonials Data ──────────────────────────────────────── */
const TESTIMONIALS = [
  {
    q: "The most serene, unhurried appointment I have experienced. The balayage graduation is sublime — it catches the Parisian light like silk. You leave feeling restored and undeniably yourself.",
    a: "Isabelle de Rivoire",
    s: "Balayage & Scalp Ritual · Paris",
  },
  {
    q: "From our first consultation to the final veil placement at Château de Chantilly, Julien understood my aesthetic before I could find the words. Flawless through tears and dancing.",
    a: "Amara Kensington",
    s: "Bridal Atelier Client · London",
  },
  {
    q: "Élise's sculpting facial removed weeks of fatigue in ninety minutes. No redness, only pure vitality and elevated contour. A true master of skin health.",
    a: "Valentina Sforza",
    s: "Cellular Sculpting Facial · Milan",
  },
  {
    q: "Colour mastery on par with the finest ateliers in the world. The discretion, acoustics, and single-chair dedication create a sanctuary in the city.",
    a: "Charlotte Montgomerie",
    s: "Dimensional Colour · Geneva",
  },
];

/* ─── Shared Utilities & Hooks ───────────────────────────────── */
function scrollToBooking(serviceName?: string, stylistName?: string) {
  const el = document.getElementById("book");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("maison-preselect", {
        detail: { service: serviceName, stylist: stylistName },
      }),
    );
  }
}

/**
 * Bulletproof InView hook that ensures content is ALWAYS revealed:
 * - Checks viewport immediately upon mount
 * - Observes scroll intersection with relaxed threshold
 * - Has an automatic safety timer so content never stays hidden
 */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if element is already in or near view
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 120 && rect.bottom > -80) {
      el.classList.add("in");
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("in");
      return;
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px 80px 0px" },
    );

    io.observe(el);

    // Guaranteed fallback reveal
    const timer = setTimeout(() => {
      el.classList.add("in");
    }, 1200);

    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);
  return ref;
}

function Reveal({
  children,
  delay = 0,
  className = "",
  mask = false,
  dir = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  mask?: boolean;
  dir?: "up" | "left" | "right" | "scale";
}) {
  const ref = useInView<HTMLDivElement>();
  const cls = mask
    ? "mask"
    : dir === "left"
      ? "reveal-left"
      : dir === "right"
        ? "reveal-right"
        : dir === "scale"
          ? "reveal-scale"
          : "reveal";
  return (
    <div
      ref={ref}
      className={`${cls} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ParallaxImage({
  src,
  fallback,
  alt,
  className = "",
  eager = false,
}: {
  src: string;
  fallback?: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={currentSrc}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        onError={() => {
          if (fallback && currentSrc !== fallback) {
            setCurrentSrc(fallback);
          }
        }}
        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
      />
    </div>
  );
}

/* ─── Header ─────────────────────────────────────────────────── */
/* ─── Header ─────────────────────────────────────────────────── */
function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 40);
      const sections = ["contact", "book", "experts", "philosophy", "gallery", "services", "story"];
      const scrollPos = window.scrollY + 220;
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(`#${s}`);
          return;
        }
      }
      setActiveSection("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: [string, string][] = [
    ["Services", "#services"],
    ["Our Story", "#story"],
    ["Transformations", "#gallery"],
    ["The Atelier", "#experts"],
    ["Philosophy", "#philosophy"],
    ["Contact", "#contact"],
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid || open
          ? "bg-[oklch(0.98_0.010_82)]/95 py-3.5 text-foreground shadow-sm backdrop-blur-md border-b border-border/60"
          : "py-6 text-[oklch(0.98_0.012_85)] bg-gradient-to-b from-black/60 via-black/25 to-transparent"
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 md:px-8 gap-3"
        aria-label="Main Navigation"
      >
        {/* Brand Logo & Tagline */}
        <a
          href="#top"
          className="group flex flex-col items-start leading-none shrink-0"
        >
          <span className="font-serif text-xl sm:text-2xl tracking-[0.22em] md:text-[1.4rem] font-light">
            MAISON BEAUTÉ
          </span>
          <span className="eyebrow text-[0.52rem] tracking-[0.32em] text-accent mt-0.5">
            PARIS · ATELIER 2026
          </span>
        </a>

        {/* Desktop Navigation Links — whitespace-nowrap and responsive gaps */}
        <ul className="hidden items-center gap-1 xl:gap-2.5 2xl:gap-4 lg:flex shrink-0">
          {links.map(([label, href]) => {
            const isActive = activeSection === href;
            return (
              <li key={href} className="shrink-0">
                <a
                  href={href}
                  className={`nav-pill whitespace-nowrap px-2.5 xl:px-3 py-1.5 rounded-full text-[0.68rem] xl:text-[0.74rem] tracking-[0.15em] xl:tracking-[0.22em] uppercase font-medium transition-all duration-300 block ${
                    isActive
                      ? "text-accent active font-semibold"
                      : "text-current hover:text-accent opacity-90 hover:opacity-100"
                  }`}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right CTA Button — strictly shrink-0 and whitespace-nowrap */}
        <div className="hidden items-center gap-3 lg:flex shrink-0">
          <button
            onClick={() => scrollToBooking()}
            className={`btn-lux shrink-0 whitespace-nowrap !px-4 xl:!px-6 !py-2.5 text-[0.68rem] xl:text-[0.74rem] flex items-center gap-2 ${
              solid
                ? "text-foreground border-foreground hover:text-accent-foreground"
                : "text-[oklch(0.98_0.012_85)] border-white/60 hover:border-accent"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="whitespace-nowrap">Reserve Your Visit</span>
          </button>
        </div>

        {/* Mobile / Tablet Toggle */}
        <button
          className="eyebrow lg:hidden flex items-center gap-2 border border-current/40 px-3 py-1.5 shrink-0 text-[0.68rem]"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <span>{open ? "Close" : "Menu"}</span>
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 top-[65px] bottom-0 z-40 bg-[oklch(0.98_0.010_82)]/98 backdrop-blur-xl transition-all duration-500 lg:hidden overflow-y-auto border-t border-border flex flex-col justify-between p-6 sm:p-10 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="space-y-6 pt-4">
          <span className="eyebrow text-accent text-[0.66rem] tracking-[0.3em] block">
            PARIS ATELIER NAVIGATION
          </span>
          <ul className="space-y-4">
            {links.map(([label, href], idx) => (
              <li key={href} style={{ transitionDelay: `${idx * 60}ms` }}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block font-serif text-[2.2rem] text-foreground hover:text-accent transition-colors font-light"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-8 border-t border-border/80 space-y-4">
          <button
            onClick={() => {
              setOpen(false);
              scrollToBooking();
            }}
            className="btn-lux w-full justify-center !py-3.5 text-foreground border-foreground flex items-center gap-2"
          >
            <span>Reserve Your Visit</span>
            <span>→</span>
          </button>
          <div className="flex justify-between items-center text-xs text-muted-foreground pt-2">
            <span>24 Rue de la Paix, Paris</span>
            <span>+33 1 42 68 55 00</span>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ─── Hero ───────────────────────────────────────────────────── */
function Hero() {
  return (
    <section
      id="top"
      className="grain relative min-h-[100svh] overflow-hidden bg-primary text-primary-foreground flex flex-col justify-between"
    >
      {/* Background Image with Cinematic Breath Zoom & Gradient Scrim */}
      <div className="absolute inset-0">
        <div className="hero-zoom h-full w-full">
          <ParallaxImage
            src={hero}
            alt="Maison Beauté 2026 atelier model in warm golden light"
            className="h-full w-full object-cover"
            eager
          />
        </div>
        <div className="hero-veil absolute inset-0 pointer-events-none" />
      </div>

      {/* Golden Ambient Glow & Shimmer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-gold-pulse" />
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl animate-gold-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Top spacer for header */}
      <div className="pt-32" />

      {/* Floating Accolade Badges */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex items-center gap-3 border border-amber-300/30 bg-neutral-950/75 px-4 py-2 backdrop-blur-md rounded-full shadow-lg">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
          </span>
          <span className="eyebrow text-amber-300 text-[0.72rem] tracking-[0.24em] font-medium">
            Paris · Place Vendôme · Private Atelier
          </span>
        </div>

        <div className="hidden sm:inline-flex items-center gap-2.5 border border-white/20 bg-neutral-950/60 px-4 py-1.5 backdrop-blur-md rounded-full text-white/90 text-xs shadow-md animate-float">
          <span className="text-amber-300">✦</span>
          <span>Bespoke 1-on-1 Sanctuary</span>
          <span className="text-white/40">·</span>
          <span className="text-amber-200">4.9★ Excellence</span>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 pb-12 md:pb-20">
        <div className="max-w-5xl">
          <p className="eyebrow mb-5 text-accent text-[0.88rem] tracking-[0.34em] font-semibold flex items-center gap-3">
            <span className="h-px w-10 bg-accent" />
            <span className="text-amber-200">The Art of Feeling Beautiful</span>
          </p>

          <h1 className="text-[clamp(3.4rem,8.5vw,9rem)] leading-[0.94] tracking-[-0.02em] font-serif font-light text-white text-shadow-lux">
            <span className="line block overflow-hidden">
              <span className="block animate-[rise_1.2s_cubic-bezier(.16,1,.3,1)_forwards]">
                Beauty, Elevated
              </span>
            </span>
            <span className="line block overflow-hidden mt-1 sm:mt-2">
              <span className="block animate-[rise_1.4s_cubic-bezier(.16,1,.3,1)_0.2s_both]">
                <em className="shimmer-gold-text not-italic font-normal italic">to an Art.</em>
              </span>
            </span>
          </h1>

          {/* Original Open Editorial Layout without Black Box */}
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between border-t border-white/25 pt-8 animate-[fadein_1.2s_ease-out_0.3s_both]">
            <p className="max-w-[480px] text-[1.125rem] sm:text-[1.2rem] leading-relaxed text-white font-normal text-shadow-lux">
              A private Parisian atelier devoted to couture hair, balayage, bespoke bridal artistry, and clinical sculpting facials. No rush. No templates. Only you.
            </p>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <button
                onClick={() => scrollToBooking()}
                className="group relative inline-flex items-center gap-2.5 border border-white/90 bg-white/10 px-8 py-4 text-xs font-semibold uppercase tracking-[0.26em] text-white backdrop-blur-sm transition-all duration-300 hover:bg-accent hover:border-accent hover:text-neutral-950 hover:shadow-[0_0_30px_rgba(212,175,55,0.45)]"
              >
                <span>Reserve Your Experience</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </button>
              <a
                href="#services"
                className="group inline-flex items-center gap-2 border border-white/40 bg-black/20 px-7 py-4 text-xs font-medium uppercase tracking-[0.24em] text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/20 hover:text-white"
              >
                <span>Explore The Menu</span>
                <span className="text-amber-300 transition-transform duration-300 group-hover:translate-x-1">✦</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Story Indicator */}
      <a
        href="#story"
        aria-label="Scroll to our story"
        className="relative z-10 mx-auto mb-6 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors"
      >
        <span className="eyebrow text-[0.66rem] tracking-[0.3em]">Scroll to Discover</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/40">
          <span className="scroll-dot absolute inset-x-0 h-1/2 bg-accent" />
        </span>
      </a>
    </section>
  );
}

/* ─── Animated Luxury Marquee Ticker ─────────────────────────── */
function LuxuryMarquee() {
  const tickerItems = [
    "PARIS · PLACE VENDÔME",
    "BESPOKE HAUTE COIFFURE",
    "HAND-PAINTED BALAYAGE",
    "SCULPTING BUCCAL FACIALS",
    "RUSSIAN GEL ARTISTRY",
    "ROYAL BRIDAL ATELIER",
    "UNHURRIED PRIVATE SUITES",
    "EST. 2014",
  ];

  return (
    <div className="relative overflow-hidden border-y border-border/80 bg-secondary/80 py-3.5 select-none backdrop-blur-sm">
      <div className="animate-marquee flex items-center gap-8">
        {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((text, i) => (
          <div key={i} className="flex items-center gap-8 shrink-0">
            <span className="eyebrow text-foreground/80 tracking-[0.28em] text-[0.68rem] font-medium">
              {text}
            </span>
            <span className="text-accent text-xs">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Story (Art-Directed Editorial Composition) ─────────────── */
function Story() {
  return (
    <section id="story" className="overflow-hidden bg-background py-28 md:py-36 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Headline & Readable Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <Reveal>
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-accent" />
                <span className="eyebrow text-accent text-[0.74rem]">
                  OUR STORY — EST. 2014 · PARIS
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="text-[clamp(2.6rem,5vw,5rem)] leading-[1.02] text-foreground font-light">
                A house devoted to the{" "}
                <em className="text-accent not-italic font-normal italic">quiet</em> luxury
                of unhurried care.
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-8 space-y-5 text-[1.125rem] leading-[1.85] text-foreground/80 font-normal">
                <p>
                  Maison Beauté began in 2014 with a single chair and an uncompromising conviction: true beauty is never applied or manufactured, but revealed through patient, masterful craft.
                </p>
                <p>
                  Today our atelier brings together master balayage colourists, licensed skin scientists, and editorial bridal artists. We allocate double the standard salon appointment time so you never experience an assembly-line atmosphere.
                </p>
                <p className="text-[1.05rem] text-muted-foreground">
                  Every visit begins with a fifteen-minute consultation over house botanical infusions — aligning your lifestyle, silhouette, and personal aesthetic before scissors or brush ever touch you.
                </p>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-border pt-6">
                <div className="flex flex-col">
                  <span className="font-serif text-xl text-foreground font-normal">
                    Sofia Laurent
                  </span>
                  <span className="eyebrow text-[0.66rem] text-muted-foreground tracking-widest">
                    Founder &amp; Creative Director
                  </span>
                </div>
                <div className="h-8 w-px bg-border hidden sm:block" />
                <a
                  href="#philosophy"
                  className="eyebrow link-lux text-foreground font-medium text-[0.74rem] flex items-center gap-2"
                >
                  Our Four Pillars of Care →
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Layered Art-Directed Visual Composition */}
          <div className="lg:col-span-6 relative mt-6 lg:mt-0">
            {/* Dominant Editorial Image */}
            <Reveal mask delay={100} className="relative z-10 aspect-[4/5] shadow-xl border border-border/70 overflow-hidden bg-muted">
              <ParallaxImage
                src={hair}
                alt="Stylist shaping glossy brunette hair in Maison Beauté atelier"
                className="h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
                <span className="eyebrow text-accent text-[0.65rem] tracking-widest">
                  Atelier Craftsmanship
                </span>
                <p className="font-serif text-2xl font-light italic mt-1">
                  Precision in every stroke.
                </p>
              </div>
            </Reveal>

            {/* Overlapping Secondary Card (Levitating with animate-float) */}
            <Reveal
              delay={250}
              className="relative lg:absolute lg:-bottom-10 lg:-left-12 z-20 mt-6 lg:mt-0 max-w-sm bg-card p-5 border border-border/90 shadow-2xl backdrop-blur-sm animate-float"
            >
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 shrink-0 overflow-hidden border border-border/70">
                  <img
                    src={salon}
                    alt="Maison Beauté salon interior detail"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <span className="eyebrow text-accent text-[0.62rem] tracking-widest block">
                    Sanctuary at Rue de la Paix
                  </span>
                  <h3 className="font-serif text-lg font-normal text-foreground mt-0.5">
                    10 Years of Quiet Mastery
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">
                    Dedicated acoustic suites with zero outside distraction.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Decorative Gold Archival Stamp */}
            <div className="absolute -top-6 -right-6 hidden xl:flex h-24 w-24 rounded-full border border-accent/40 items-center justify-center text-center p-2 bg-secondary/80 backdrop-blur-sm pointer-events-none">
              <span className="eyebrow text-accent text-[0.58rem] tracking-widest leading-tight">
                EST. 2014<br />PARIS
              </span>
            </div>
          </div>
        </div>

        {/* Four-Metric Heritage Strip */}
        <div className="mt-24 border-t border-b border-border bg-secondary/40">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y divide-x divide-border md:divide-y-0">
            {[
              ["12+", "Years of Mastery", "Over a decade of quiet Parisian craft."],
              ["3,400+", "Transformations", "Each ritual tailored to the individual."],
              ["7", "Artisanal Disciplines", "Hair, balayage, facials, bridal & nails."],
              ["100%", "Unhurried Service", "Zero double-booking. True dedicated care."],
            ].map(([num, title, sub], i) => (
              <Reveal key={title} delay={i * 90} className="p-8 text-center">
                <div className="font-serif text-[3.2rem] leading-none text-accent font-light">
                  {num}
                </div>
                <div className="mt-2 font-serif text-xl font-normal text-foreground">
                  {title}
                </div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  {sub}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Services (The Menu — Visually Rich & Interactive) ──────── */
function Services() {
  const [activeTab, setActiveTab] = useState("All");
  const [hoveredIdx, setHoveredIdx] = useState(0);

  const filterCats = ["All", "Hair", "Colour", "Bridal", "Skin", "Nails", "Makeup"];
  const displayServices =
    activeTab === "All"
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeTab);

  return (
    <section id="services" className="bg-primary py-28 text-primary-foreground md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-8 border-b border-white/15 pb-12 md:flex-row md:items-end">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-3 mb-3">
                <span className="h-px w-6 bg-accent" />
                <span className="eyebrow text-accent text-[0.74rem]">
                  SIGNATURE SERVICES
                </span>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="text-[clamp(2.8rem,5.5vw,5.5rem)] leading-[0.98] font-serif font-light text-white">
                The Atelier Menu
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160} className="max-w-md">
            <p className="text-[1.0625rem] leading-relaxed text-white/80">
              Seven artisanal disciplines, one elevated standard. Every ritual begins with an in-depth private consultation, hair/skin mapping, and bespoke formulations.
            </p>
          </Reveal>
        </div>

        {/* Filter Navigation */}
        <Reveal delay={100}>
          <div className="mt-8 flex flex-wrap gap-2" role="tablist">
            {filterCats.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeTab === cat}
                onClick={() => setActiveTab(cat)}
                className={`filter-pill !border-white/20 !text-white/70 hover:!border-accent hover:!text-white ${
                  activeTab === cat ? "!bg-accent !text-accent-foreground !border-accent" : ""
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Services List + Interactive Preview Image */}
        <div className="mt-12 grid gap-12 lg:grid-cols-12 items-start">
          {/* Services Items */}
          <div className="lg:col-span-7 space-y-2">
            {displayServices.map((service, idx) => (
              <Reveal key={service.n} delay={idx * 50}>
                <div
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className="group relative border-b border-white/12 py-7 transition-colors hover:border-accent/60"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-5">
                      <span className="eyebrow text-accent text-[0.72rem] font-mono">
                        {service.n}
                      </span>
                      <h3 className="font-serif text-[1.8rem] md:text-[2.2rem] font-light text-white group-hover:text-accent transition-colors">
                        {service.t}
                      </h3>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="eyebrow text-accent text-[0.8rem] font-medium block">
                        {service.p}
                      </span>
                      <span className="text-[0.72rem] text-white/50 block font-light">
                        {service.time}
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 pl-10 text-[0.98rem] leading-relaxed text-white/75 max-w-xl">
                    {service.d}
                  </p>

                  <div className="mt-4 pl-10 flex items-center gap-4">
                    <button
                      onClick={() => scrollToBooking(service.t)}
                      className="eyebrow text-accent hover:text-white transition-colors text-[0.68rem] flex items-center gap-2"
                    >
                      Book This Service →
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Sticky Visual Showcase for Desktop */}
          <div className="hidden lg:block lg:col-span-5 sticky top-32">
            <div className="relative aspect-[4/5] overflow-hidden border border-white/20 shadow-2xl bg-black/40">
              {displayServices.map((service, idx) => (
                <div
                  key={service.n}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    hoveredIdx === idx ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                  }`}
                >
                  <ParallaxImage
                    src={service.img}
                    fallback={service.fallbackImg}
                    alt={service.alt}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="eyebrow text-accent text-[0.66rem] tracking-widest">
                      {service.category} · {service.time}
                    </span>
                    <p className="font-serif text-2xl font-normal mt-1">
                      {service.t}
                    </p>
                    <p className="text-sm text-white/80 mt-1">
                      {service.p} · Private consultation included
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Experience (Full-Bleed Cinematic Showcase) ─────────────── */
function Experience() {
  return (
    <section className="grain relative min-h-[640px] overflow-hidden text-primary-foreground py-28 md:py-36 flex items-center justify-center">
      {/* Background Salon Image with Dark Atmospheric Scrim */}
      <ParallaxImage
        src={salon}
        alt="Maison Beauté salon interior atmosphere"
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-accent" />
            <span className="eyebrow text-accent text-[0.76rem]">
              THE SIGNATURE RITUAL
            </span>
            <span className="h-px w-8 bg-accent" />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="text-[clamp(2.6rem,6.5vw,6.5rem)] leading-[0.98] font-serif font-light text-white">
            Three hours.{" "}
            <em className="text-accent not-italic font-normal italic">No clocks.</em> Only you.
          </h2>
        </Reveal>

        <Reveal delay={180}>
          <p className="mx-auto mt-8 max-w-2xl text-[1.125rem] leading-[1.85] text-white/85 font-light">
            An all-inclusive private atelier residency. Welcome champagne, an invigorating scalp awakening massage, hand-painted dimensional gloss colour, bespoke blow-out styling, and a restorative botanical facial.
          </p>
        </Reveal>

        {/* 3 Pillars of the Experience */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto text-left">
          {[
            ["Private Acoustic Suite", "Zero background noise, bespoke lighting tailored to your preference."],
            ["Aromatherapy Basin", "Ergonomic lie-flat shampoo recliners with essential oil mist."],
            ["Bespoke Colour Archive", "Exact pigments and formulation ratios recorded for future visits."],
          ].map(([title, desc], i) => (
            <Reveal key={title} delay={220 + i * 80} className="border border-white/20 bg-black/40 p-6 backdrop-blur-sm">
              <span className="eyebrow text-accent text-[0.65rem] tracking-widest block mb-2">
                0{i + 1}
              </span>
              <h3 className="font-serif text-xl font-normal text-white">{title}</h3>
              <p className="text-xs text-white/70 mt-2 leading-relaxed">{desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={340} className="mt-12">
          <button
            onClick={() => scrollToBooking("The Signature Experience")}
            className="btn-lux text-white border-white hover:text-accent-foreground"
          >
            Reserve The Signature Experience →
          </button>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Gallery / Portfolio (14 Rich Editorial Beauty Items) ───── */
function Gallery() {
  const [activeCat, setActiveCat] = useState("All");
  const [lightboxItem, setLightboxItem] = useState<{
    src: string;
    alt: string;
    title: string;
    cat: string;
    desc: string;
    serviceName: string;
    idx: number;
  } | null>(null);

  const filteredItems =
    activeCat === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.cat === activeCat);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightboxItem) return;
      if (e.key === "Escape") setLightboxItem(null);
      if (e.key === "ArrowRight") {
        const nextIdx = (lightboxItem.idx + 1) % filteredItems.length;
        const next = filteredItems[nextIdx];
        setLightboxItem({ ...next, idx: nextIdx });
      }
      if (e.key === "ArrowLeft") {
        const prevIdx =
          (lightboxItem.idx - 1 + filteredItems.length) % filteredItems.length;
        const prev = filteredItems[prevIdx];
        setLightboxItem({ ...prev, idx: prevIdx });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxItem, filteredItems]);

  // Lock body scroll during lightbox
  useEffect(() => {
    document.body.style.overflow = lightboxItem ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxItem]);

  return (
    <section id="gallery" className="bg-background py-28 md:py-36 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Gallery Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-border pb-10">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-3 mb-3">
                <span className="h-px w-6 bg-accent" />
                <span className="eyebrow text-accent text-[0.74rem]">
                  TRANSFORMATION GALLERY
                </span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-[clamp(2.6rem,5vw,5.5rem)] leading-[0.98] font-serif font-light text-foreground">
                Beauty Transformations
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160} className="max-w-md">
            <p className="text-[1.05rem] leading-relaxed text-muted-foreground">
              Editorial balayage, bridal couture, clinical skincare, and precision manicures crafted by our atelier artists. Click any image to view details and reserve the look.
            </p>
          </Reveal>
        </div>

        {/* Category Filters with Counts — Guaranteed Never Empty! */}
        <Reveal delay={100}>
          <div
            className="mt-10 flex flex-wrap gap-2.5"
            role="group"
            aria-label="Filter gallery categories"
          >
            {GALLERY_CATS.map((cat) => {
              const count =
                cat === "All"
                  ? GALLERY_ITEMS.length
                  : GALLERY_ITEMS.filter((g) => g.cat === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`filter-pill flex items-center gap-2 ${
                    activeCat === cat ? "active" : ""
                  }`}
                >
                  <span>{cat}</span>
                  <span className="text-[0.6rem] opacity-70 font-mono">({count})</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Asymmetric Editorial Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-12">
          {filteredItems.map((item, i) => (
            <div
              key={item.id}
              className={`${item.span} transition-all duration-500`}
            >
              <div
                className={`img-hover-wrap w-full ${item.aspect} block border border-border/80 shadow-md bg-muted overflow-hidden group`}
                onClick={() =>
                  setLightboxItem({
                    src: item.src,
                    alt: item.alt,
                    title: item.title,
                    cat: item.cat,
                    desc: item.desc,
                    serviceName: item.serviceName,
                    idx: i,
                  })
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setLightboxItem({
                      src: item.src,
                      alt: item.alt,
                      title: item.title,
                      cat: item.cat,
                      desc: item.desc,
                      serviceName: item.serviceName,
                      idx: i,
                    });
                  }
                }}
                aria-label={`View ${item.title}`}
              >
                <ParallaxImage
                  src={item.src}
                  fallback={item.fallback}
                  alt={item.alt}
                  className="h-full w-full"
                />

                {/* Permanent subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity pointer-events-none" />

                {/* Content Overlay */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white flex flex-col justify-end">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-accent text-[0.66rem] tracking-widest bg-black/40 px-2.5 py-1 backdrop-blur-sm border border-white/10">
                      {item.cat}
                    </span>
                    <span className="text-xs text-white/60 font-mono hidden sm:inline">
                      Look #{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-2 font-serif text-2xl font-light text-white italic">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-white/80 line-clamp-2 font-light">
                    {item.desc}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-white/20 pt-3">
                    <span className="eyebrow text-accent text-[0.65rem] tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Fullscreen &amp; Book Look →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal with Prev/Next, Caption, and Direct Book CTA */}
      {lightboxItem && (
        <div
          className="lightbox-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setLightboxItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
        >
          {/* Controls Bar */}
          <div className="absolute top-6 right-6 z-20 flex items-center gap-4">
            <span className="eyebrow text-white/70 text-[0.7rem] font-mono">
              {String(lightboxItem.idx + 1).padStart(2, "0")} /{" "}
              {String(filteredItems.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => setLightboxItem(null)}
              className="eyebrow text-white border border-white/30 px-3 py-1.5 hover:border-accent hover:text-accent transition-colors"
              aria-label="Close modal"
            >
              Close ✕
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const prevIdx =
                (lightboxItem.idx - 1 + filteredItems.length) % filteredItems.length;
              setLightboxItem({ ...filteredItems[prevIdx], idx: prevIdx });
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-accent p-3 border border-white/20 bg-black/40 backdrop-blur-sm"
            aria-label="Previous look"
          >
            ← Prev
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              const nextIdx = (lightboxItem.idx + 1) % filteredItems.length;
              setLightboxItem({ ...filteredItems[nextIdx], idx: nextIdx });
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-accent p-3 border border-white/20 bg-black/40 backdrop-blur-sm"
            aria-label="Next look"
          >
            Next →
          </button>

          {/* Modal Content Box */}
          <div
            className="relative max-w-4xl w-full bg-[oklch(0.18_0.025_45)] border border-border/60 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-12 max-h-[85vh]">
              {/* Image Container */}
              <div className="md:col-span-8 bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={lightboxItem.src}
                  alt={lightboxItem.alt}
                  className="max-h-[70vh] w-full object-contain"
                />
              </div>

              {/* Information & Booking Panel */}
              <div className="md:col-span-4 p-8 flex flex-col justify-between text-white border-t md:border-t-0 md:border-l border-white/10">
                <div>
                  <span className="eyebrow text-accent text-[0.66rem] tracking-widest block">
                    {lightboxItem.cat} Transformation
                  </span>
                  <h3 className="font-serif text-3xl font-light italic mt-2 text-white">
                    {lightboxItem.title}
                  </h3>
                  <p className="mt-4 text-sm text-white/80 leading-relaxed">
                    {lightboxItem.desc}
                  </p>
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="text-xs text-white/60">
                      Recommended Service:
                    </p>
                    <p className="text-sm font-medium text-accent mt-0.5">
                      {lightboxItem.serviceName}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={() => {
                      setLightboxItem(null);
                      scrollToBooking(lightboxItem.serviceName);
                    }}
                    className="btn-lux w-full justify-center !py-3 text-white border-white hover:text-accent-foreground"
                  >
                    Book This Look →
                  </button>
                  <p className="text-center text-[0.7rem] text-white/40 mt-3">
                    Pre-selects this service in your reservation form
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ─── Philosophy (The Four Architectural Pillars) ────────────── */
function Philosophy() {
  const pillars = [
    {
      num: "I",
      title: "Considered Listening",
      desc: "Every appointment begins with fifteen unhurried minutes. No templates, no assumptions. We examine your facial architecture, lifestyle, and hair health before recommending a path.",
    },
    {
      num: "II",
      title: "Clean Clinical Efficacy",
      desc: "We exclusively formulate with European clinical botanicals, ammonia-free bonding agents, and non-toxic Russian nail gels. Efficacy without compromising personal vitality.",
    },
    {
      num: "III",
      title: "Dedicated Single-Chair Care",
      desc: "Zero double-booking. Your master colourist or aesthetician focuses entirely on you throughout your stay, ensuring undivided attention and immaculate acoustic calm.",
    },
  ];

  return (
    <section id="philosophy" className="bg-secondary py-28 md:py-36 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Quote Introduction */}
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-px w-6 bg-accent" />
              <span className="eyebrow text-accent text-[0.74rem]">
                OUR CORE PHILOSOPHY
              </span>
              <span className="h-px w-6 bg-accent" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <blockquote className="font-serif text-[clamp(1.8rem,3.8vw,3.4rem)] leading-[1.25] text-foreground font-light">
              "We believe self-care is not an indulgence, but a{" "}
              <em className="text-accent not-italic font-normal italic">sanctuary of respect</em> — for
              your time, your skin, and the quiet confidence you carry into the world."
            </blockquote>
          </Reveal>
        </div>

        {/* 3 Pillars Grid with Architectural Borders */}
        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="bg-card p-10 border border-border shadow-sm flex flex-col justify-between h-full hover:border-accent/60 transition-colors">
                <div>
                  <div className="font-serif text-5xl text-accent font-light mb-4">
                    {p.num}
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-foreground mb-4">
                    {p.title}
                  </h3>
                  <p className="text-[1.05rem] leading-[1.8] text-muted-foreground font-light">
                    {p.desc}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-border">
                  <span className="eyebrow text-accent text-[0.64rem] tracking-widest">
                    Maison Beauté Standard
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Meet the Experts (The Atelier Artists) ─────────────────── */
function Experts() {
  return (
    <section id="experts" className="bg-background py-28 md:py-36 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-border pb-10">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-3 mb-3">
                <span className="h-px w-6 bg-accent" />
                <span className="eyebrow text-accent text-[0.74rem]">
                  MEET THE EXPERTS
                </span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-[clamp(2.6rem,5vw,5.5rem)] leading-[0.98] font-serif font-light text-foreground">
                The Atelier Artists
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160} className="max-w-md">
            <p className="text-[1.05rem] leading-relaxed text-muted-foreground">
              Each resident specialist brings over a decade of international training across Paris, London, and Milan, united by an unyielding dedication to tailored elegance.
            </p>
          </Reveal>
        </div>

        {/* 3 Column Portrait Grid */}
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {TEAM.map((expert, i) => (
            <Reveal key={expert.name} delay={i * 120}>
              <div className="group bg-card border border-border overflow-hidden shadow-sm hover:border-accent/60 transition-all">
                {/* Portrait */}
                <div className="aspect-[3/4] overflow-hidden bg-muted relative">
                  <ParallaxImage
                    src={expert.src}
                    fallback={expert.fallbackSrc}
                    alt={`Portrait of ${expert.name}`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 backdrop-blur-sm border border-white/10 text-white">
                    <span className="eyebrow text-accent text-[0.62rem] tracking-widest">
                      Resident Master
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-8">
                  <h3 className="font-serif text-3xl font-normal text-foreground">
                    {expert.name}
                  </h3>
                  <p className="eyebrow text-accent text-[0.7rem] font-medium tracking-widest mt-1">
                    {expert.role}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono mt-1">
                    Specialty: {expert.specialty}
                  </p>
                  <p className="mt-4 text-[0.98rem] leading-relaxed text-muted-foreground font-light border-t border-border pt-4">
                    {expert.bio}
                  </p>

                  <button
                    onClick={() => scrollToBooking(undefined, expert.name)}
                    className="btn-lux w-full justify-center !py-2.5 mt-6 text-foreground border-foreground hover:text-accent-foreground text-[0.68rem]"
                  >
                    Book with {expert.name.split(" ")[0]} →
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials (High-Contrast Client Voices) ─────────────── */
function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-primary text-primary-foreground py-28 md:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Decorative Number & Accolades */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/15 pb-8 lg:pb-0 lg:pr-12">
            <Reveal>
              <div className="font-serif text-[7rem] leading-none text-accent font-light select-none">
                "
              </div>
              <h2 className="font-serif text-3xl font-light text-white -mt-6">
                Client Reflections
              </h2>
              <p className="text-sm text-white/70 mt-3 leading-relaxed">
                Words from guests who entrust their weddings, galas, and monthly hair rituals to our atelier.
              </p>

              {/* Progress Indicator */}
              <div className="mt-8 flex items-center gap-3">
                <span className="font-serif text-2xl text-accent">
                  0{activeIdx + 1}
                </span>
                <span className="text-xs text-white/40 font-mono">/ 0{TESTIMONIALS.length}</span>
                <div className="flex gap-2 ml-4">
                  {TESTIMONIALS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIdx(idx)}
                      className={`h-1.5 transition-all ${
                        activeIdx === idx ? "w-8 bg-accent" : "w-2 bg-white/30"
                      }`}
                      aria-label={`Jump to review ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Carousel Card */}
          <div className="lg:col-span-8 lg:pl-6 min-h-[260px] flex flex-col justify-center">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className={`transition-all duration-700 ${
                  activeIdx === idx
                    ? "opacity-100 translate-y-0 block"
                    : "opacity-0 translate-y-4 hidden pointer-events-none"
                }`}
              >
                {/* 5-Star Rating */}
                <div className="flex gap-1 text-accent mb-6" aria-label="5 stars rating">
                  {"★".repeat(5)}
                </div>

                <blockquote className="font-serif text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.3] font-light text-white">
                  "{t.q}"
                </blockquote>

                <div className="mt-8 flex items-center gap-4 border-t border-white/15 pt-6">
                  <div className="h-2 w-2 bg-accent rounded-full" />
                  <div>
                    <p className="font-serif text-xl font-normal text-white">
                      {t.a}
                    </p>
                    <p className="eyebrow text-accent text-[0.66rem] tracking-widest mt-0.5">
                      {t.s}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Manual Controls */}
            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={() =>
                  setActiveIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
                }
                className="eyebrow text-white/80 hover:text-accent border border-white/20 px-3 py-1.5 text-[0.65rem] transition-colors"
              >
                ← Previous
              </button>
              <button
                onClick={() => setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length)}
                className="eyebrow text-white/80 hover:text-accent border border-white/20 px-3 py-1.5 text-[0.65rem] transition-colors"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Luxury Booking Experience (High-Conversion 2-Column) ───── */
function Booking() {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Hair Styling",
  ]);
  const [selectedStylist, setSelectedStylist] = useState<string>("");
  const [preferredDate, setPreferredDate] = useState<string>("");
  const [preferredTime, setPreferredTime] = useState<string>("Morning (9am – 12pm)");
  const [fullName, setFullName] = useState<string>("");
  const [contactInfo, setContactInfo] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmationData, setConfirmationData] = useState<{
    name: string;
    services: string[];
    stylist: string;
    date: string;
    time: string;
  } | null>(null);

  // Listen to external preselect requests from portfolio or services
  useEffect(() => {
    const handlePreselect = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.service) {
        setSelectedServices((prev) =>
          prev.includes(detail.service) ? prev : [...prev, detail.service],
        );
      }
      if (detail?.stylist) {
        setSelectedStylist(detail.stylist);
      }
    };
    window.addEventListener("maison-preselect", handlePreselect);
    return () => window.removeEventListener("maison-preselect", handlePreselect);
  }, []);

  const toggleService = useCallback((serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName],
    );
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.name = "Please provide your full name.";
    }

    if (!contactInfo.trim()) {
      newErrors.contact = "Please provide an email address or mobile number.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactInfo) &&
      !/^[+\d][\d\s()-]{6,}$/.test(contactInfo)
    ) {
      newErrors.contact = "Please enter a valid email or phone number.";
    }

    if (selectedServices.length === 0) {
      newErrors.services = "Please select at least one beauty service.";
    }

    if (!preferredDate) {
      newErrors.date = "Please select your preferred date.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setConfirmationData({
        name: fullName.trim(),
        services: selectedServices,
        stylist: selectedStylist || "First Available Master",
        date: preferredDate,
        time: preferredTime,
      });
    }
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <section id="book" className="grain relative bg-primary text-primary-foreground py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-12 items-start">
          {/* Left Column: Salon Reassurance & Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal>
              <div className="inline-flex items-center gap-3 mb-2">
                <span className="h-px w-6 bg-accent" />
                <span className="eyebrow text-accent text-[0.74rem]">
                  APPOINTMENT RESERVATIONS
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="text-[clamp(2.6rem,5vw,5rem)] leading-[0.98] font-serif font-light text-white">
                Reserve your{" "}
                <em className="text-accent not-italic font-normal italic">moment of care.</em>
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <p className="text-[1.125rem] leading-relaxed text-white/80 font-light">
                Submit your preferred rituals and date. Our concierge desk will contact you within two business hours to confirm your private suite allocation and welcome preferences.
              </p>
            </Reveal>

            {/* Salon Ambiance Photo */}
            <Reveal delay={220} className="border border-white/20 aspect-[16/10] overflow-hidden bg-black/40">
              <ParallaxImage
                src={salon}
                alt="Maison Beauté salon interior atmosphere"
                className="h-full w-full object-cover"
              />
            </Reveal>

            {/* Concierge Direct Phone & Email */}
            <Reveal delay={280} className="border-t border-white/15 pt-8 space-y-4">
              <span className="eyebrow text-accent text-[0.68rem] tracking-widest block">
                Direct Concierge Assistance
              </span>
              <a
                href={`tel:${CONTACT.phone}`}
                className="font-serif text-2xl text-white hover:text-accent transition-colors block"
              >
                {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-white/70 hover:text-white transition-colors block text-sm font-light"
              >
                {CONTACT.email}
              </a>
              <p className="text-xs text-white/50 leading-relaxed mt-2">
                24 Rue de la Paix, 75002 Paris · Valet parking available on reservation
              </p>
            </Reveal>
          </div>

          {/* Right Column: Interactive Luxury Form */}
          <div className="lg:col-span-7 bg-[oklch(0.18_0.025_45)] border border-white/20 p-8 md:p-12 shadow-2xl">
            {confirmationData ? (
              /* Confirmation Screen (Honest demo confirmation) */
              <div className="py-6 text-center space-y-6" role="status">
                <div className="h-16 w-16 mx-auto rounded-full border border-accent flex items-center justify-center text-accent text-2xl font-serif">
                  ✓
                </div>
                <h3 className="font-serif text-4xl font-light text-white">
                  Merci, {confirmationData.name}.
                </h3>
                <p className="text-white/80 text-[1.05rem] max-w-md mx-auto leading-relaxed">
                  Your appointment preferences have been successfully recorded in our preview system.
                </p>

                {/* Summary Box */}
                <div className="bg-black/30 border border-white/15 p-6 text-left max-w-md mx-auto space-y-3 text-sm">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/60">Services:</span>
                    <span className="text-accent font-medium text-right">
                      {confirmationData.services.join(", ")}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/60">Preferred Stylist:</span>
                    <span className="text-white">{confirmationData.stylist}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/60">Date:</span>
                    <span className="text-white">{confirmationData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Time Slot:</span>
                    <span className="text-white">{confirmationData.time}</span>
                  </div>
                </div>

                {/* Honest Demo Notification Alert */}
                <div className="border border-accent/40 bg-accent/10 p-4 max-w-md mx-auto text-xs text-white/80 leading-relaxed text-left">
                  <strong className="text-accent block mb-1">Demonstration Notice:</strong>
                  This is an interactive frontend demonstration. No booking data has been transmitted to a live salon database. When connected to your salon booking API, reservations will sync instantly.
                </div>

                <button
                  onClick={() => {
                    setConfirmationData(null);
                    setFullName("");
                    setContactInfo("");
                    setNotes("");
                    setErrors({});
                  }}
                  className="btn-lux text-white border-white hover:text-accent-foreground mt-4"
                >
                  Create Another Reservation
                </button>
              </div>
            ) : (
              /* Actual Reservation Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-8">
                <div>
                  <h3 className="font-serif text-3xl font-light text-white">
                    Appointment Details
                  </h3>
                  <p className="text-xs text-white/60 mt-1">
                    Fields marked with an asterisk (*) are required.
                  </p>
                </div>

                {/* 1. Name */}
                <div>
                  <label htmlFor="name-input" className="eyebrow text-white/70 text-[0.7rem] block mb-2">
                    Full Name *
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Charlotte de Montgomerie"
                    className="field-lux"
                  />
                  {errors.name && (
                    <p className="text-xs text-[oklch(0.72_0.06_20)] mt-1.5" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* 2. Contact Info */}
                <div>
                  <label htmlFor="contact-input" className="eyebrow text-white/70 text-[0.7rem] block mb-2">
                    Email or Mobile Number *
                  </label>
                  <input
                    id="contact-input"
                    type="text"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="charlotte@example.com or +33 6 00 00 00 00"
                    className="field-lux"
                  />
                  {errors.contact && (
                    <p className="text-xs text-[oklch(0.72_0.06_20)] mt-1.5" role="alert">
                      {errors.contact}
                    </p>
                  )}
                </div>

                {/* 3. Interactive Service Selection Chips */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <label className="eyebrow text-white/70 text-[0.7rem]">
                      Select Desired Services *
                    </label>
                    <span className="text-[0.68rem] text-accent font-mono">
                      {selectedServices.length} selected
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      ...SERVICES.map((s) => s.t),
                      "The Signature Experience",
                    ].map((name) => {
                      const isSelected = selectedServices.includes(name);
                      return (
                        <button
                          key={name}
                          type="button"
                          onClick={() => toggleService(name)}
                          className={`px-3.5 py-2 text-[0.72rem] tracking-wider uppercase font-sans border transition-all ${
                            isSelected
                              ? "bg-accent text-accent-foreground border-accent font-medium shadow-sm"
                              : "border-white/20 text-white/75 hover:border-accent/60 hover:text-white bg-black/20"
                          }`}
                        >
                          {isSelected ? "✓ " : "+ "}
                          {name}
                        </button>
                      );
                    })}
                  </div>
                  {errors.services && (
                    <p className="text-xs text-[oklch(0.72_0.06_20)] mt-1.5" role="alert">
                      {errors.services}
                    </p>
                  )}
                </div>

                {/* 4. Preferred Stylist */}
                <div>
                  <label htmlFor="stylist-select" className="eyebrow text-white/70 text-[0.7rem] block mb-2">
                    Preferred Specialist
                  </label>
                  <select
                    id="stylist-select"
                    value={selectedStylist}
                    onChange={(e) => setSelectedStylist(e.target.value)}
                    className="field-lux"
                  >
                    <option value="">No preference (First available master)</option>
                    {TEAM.map((m) => (
                      <option key={m.name} value={m.name}>
                        {m.name} — {m.specialty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 5. Date & Time Selection */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="date-input" className="eyebrow text-white/70 text-[0.7rem] block mb-2">
                      Preferred Date *
                    </label>
                    <input
                      id="date-input"
                      type="date"
                      min={todayStr}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="field-lux [color-scheme:dark]"
                    />
                    {errors.date && (
                      <p className="text-xs text-[oklch(0.72_0.06_20)] mt-1.5" role="alert">
                        {errors.date}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="time-select" className="eyebrow text-white/70 text-[0.7rem] block mb-2">
                      Preferred Time Window
                    </label>
                    <select
                      id="time-select"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="field-lux"
                    >
                      <option>Morning (9:00 — 12:00)</option>
                      <option>Afternoon (12:00 — 16:00)</option>
                      <option>Evening (16:00 — 20:00)</option>
                    </select>
                  </div>
                </div>

                {/* 6. Special Requests */}
                <div>
                  <label htmlFor="notes-input" className="eyebrow text-white/70 text-[0.7rem] block mb-2">
                    Special Requests or Allergies (Optional)
                  </label>
                  <textarea
                    id="notes-input"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tell us about scalp sensitivities, upcoming gala events, or beverage preferences…"
                    className="field-lux resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-lux w-full justify-center !py-3.5 text-white border-white hover:text-accent-foreground text-[0.76rem]"
                  >
                    Reserve Your Experience →
                  </button>
                  <p className="text-center text-xs text-white/50 mt-3 font-light">
                    Discreet consultation · Zero booking fee · Guaranteed private suite
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Location & Contact (Split Luxury Layout) ───────────────── */
function Contact() {
  const hours = [
    ["Tuesday — Friday", "09:30 — 20:00"],
    ["Saturday", "09:00 — 18:30"],
    ["Sunday", "By Private Appointment"],
    ["Monday", "Atelier Closed"],
  ];

  return (
    <section id="contact" className="bg-background py-28 md:py-36 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left: Atelier Details & Hours */}
          <div className="lg:col-span-6 space-y-8">
            <Reveal>
              <div className="inline-flex items-center gap-3 mb-2">
                <span className="h-px w-6 bg-accent" />
                <span className="eyebrow text-accent text-[0.74rem]">
                  LOCATION &amp; ATELIER HOURS
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="text-[clamp(2.6rem,4.5vw,5rem)] leading-[1.0] font-serif font-light text-foreground">
                Visit the Maison
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <div className="space-y-3 text-[1.125rem] text-foreground/80 font-light">
                <p className="font-medium text-foreground">
                  {CONTACT.address}
                </p>
                <p className="text-sm text-muted-foreground">
                  Located two doors from Place Vendôme. Private entrance on courtyard side.
                </p>
                <div className="pt-2 flex flex-col gap-1">
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="link-lux text-foreground text-lg font-serif"
                  >
                    Tel: {CONTACT.phone}
                  </a>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="link-lux text-muted-foreground text-sm"
                  >
                    Email: {CONTACT.email}
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Opening Hours Table */}
            <Reveal delay={220}>
              <div className="border-t border-border pt-6">
                <span className="eyebrow text-accent text-[0.68rem] tracking-widest block mb-4">
                  Hours of Service
                </span>
                <dl className="space-y-3">
                  {hours.map(([days, time]) => (
                    <div
                      key={days}
                      className="flex justify-between items-center text-sm border-b border-border/50 pb-2"
                    >
                      <dt className="text-foreground font-medium">{days}</dt>
                      <dd className="text-muted-foreground font-light">{time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            {/* Social Links */}
            <Reveal delay={280}>
              <div className="flex items-center gap-6 pt-4">
                <span className="eyebrow text-muted-foreground text-[0.68rem]">
                  Follow:
                </span>
                {[
                  ["Instagram", CONTACT.instagram],
                  ["Pinterest", CONTACT.pinterest],
                  ["TikTok", CONTACT.tiktok],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="eyebrow link-lux text-foreground hover:text-accent text-[0.68rem]"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: Exterior / Courtyard Atelier Photography */}
          <div className="lg:col-span-6">
            <Reveal mask delay={140} className="border border-border/80 aspect-[4/3] overflow-hidden shadow-xl bg-muted">
              <ParallaxImage
                src={salon}
                alt="Maison Beauté salon atelier exterior and styling suites"
                className="h-full w-full object-cover"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground pt-24 pb-12 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Top Editorial Sign-off */}
        <div className="flex flex-col justify-between gap-8 border-b border-white/15 pb-16 md:flex-row md:items-end">
          <div>
            <span className="eyebrow text-accent text-[0.74rem] tracking-[0.3em] block mb-4">
              MAISON BEAUTÉ PARIS
            </span>
            <h2 className="text-[clamp(2.8rem,6vw,6.5rem)] leading-[0.92] font-serif font-light text-white">
              The Art of <br />
              <em className="text-accent not-italic font-normal italic">Feeling Beautiful.</em>
            </h2>
          </div>
          <div>
            <button
              onClick={() => scrollToBooking()}
              className="btn-lux text-white border-white hover:text-accent-foreground"
            >
              Reserve An Appointment →
            </button>
          </div>
        </div>

        {/* Navigation & Address Columns */}
        <div className="grid gap-10 py-16 sm:grid-cols-2 md:grid-cols-4 text-sm font-light">
          <div>
            <span className="eyebrow text-white/50 text-[0.66rem] tracking-widest block mb-4">
              ATELIER RESIDENCY
            </span>
            <p className="text-white/80 leading-relaxed">
              24 Rue de la Paix<br />
              75002 Paris, France<br />
              Courtyard Entrance
            </p>
          </div>

          <div>
            <span className="eyebrow text-white/50 text-[0.66rem] tracking-widest block mb-4">
              NAVIGATE
            </span>
            <ul className="space-y-2">
              {[
                ["Services Menu", "#services"],
                ["Our Story", "#story"],
                ["Transformation Gallery", "#gallery"],
                ["The Atelier Artists", "#experts"],
                ["Philosophy", "#philosophy"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="link-lux text-white/80 hover:text-white">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="eyebrow text-white/50 text-[0.66rem] tracking-widest block mb-4">
              SERVICES
            </span>
            <ul className="space-y-2 text-white/70">
              <li>Balayage &amp; Couture Colour</li>
              <li>Precision Architectural Hair</li>
              <li>Bridal Atelier &amp; Veils</li>
              <li>Sculpting Buccal Facials</li>
              <li>Russian Gel Manicures</li>
            </ul>
          </div>

          <div>
            <span className="eyebrow text-white/50 text-[0.66rem] tracking-widest block mb-4">
              CONCIERGE
            </span>
            <p className="text-white/80 leading-relaxed">
              T: {CONTACT.phone}<br />
              E: {CONTACT.email}<br />
              Discreet arrivals accommodated.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row text-xs text-white/50">
          <p>© {year} Maison Beauté. All rights reserved. 2026 Luxury Edition.</p>
          <div className="flex gap-6">
            <a href="#top" className="hover:text-white transition-colors">
              Back to Top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Floating WhatsApp Concierge Button ─────────────────────── */
function WhatsAppFloat() {
  const [showTooltip, setShowTooltip] = useState(true);

  const phoneNumber = "33142685500";
  const message = encodeURIComponent(
    "Bonjour Maison Beauté Paris, I would like to inquire about booking a private appointment.",
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <aside
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 select-none"
      aria-label="WhatsApp Concierge"
    >
      {/* Concierge Tooltip Bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2.5 bg-white text-foreground px-4 py-2.5 rounded-full shadow-2xl border border-border/80 text-xs font-medium">
          <span className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
          <span>Concierge Online · <strong>Chat on WhatsApp</strong></span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-muted-foreground hover:text-foreground text-sm ml-1 leading-none"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      )}

      {/* Floating WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Maison Beauté concierge on WhatsApp"
        className="whatsapp-float-btn group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-all hover:bg-[#20bd5a] focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        {/* Pulsing Green Online Indicator */}
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white"></span>
        </span>

        {/* Official Crisp WhatsApp SVG Icon */}
        <svg
          className="h-7 w-7 sm:h-8 sm:w-8 fill-current transition-transform group-hover:scale-110"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
        </svg>
      </a>
    </aside>
  );
}

/* ─── Page Composition ───────────────────────────────────────── */
function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-foreground relative">
      <Header />
      <main id="main-content">
        <Hero />
        <LuxuryMarquee />
        <Story />
        <Services />
        <Experience />
        <Gallery />
        <Philosophy />
        <Experts />
        <Testimonials />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
