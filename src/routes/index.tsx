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
  FiArrowLeft,
  FiCheck,
  FiX,
  FiMenu,
  FiCalendar,
  FiUser,
  FiScissors,
  FiStar,
  FiHeart,
  FiShield,
} from "react-icons/fi";
import {
  FaTiktok,
  FaWhatsapp,
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "صالون وهلة أولى للتزيين النسائي | Wahla Spa — الرياض، المملكة العربية السعودية" },
      {
        name: "description",
        content:
          "صالون وهلة أولى للتزيين النسائي (Wahla Spa) الفاخر في الرياض — خدمات تصفيف وصبغات الشعر، العناية بالبشرة، الأظافر، والمكياج في أجنحة خاصة تسودها الخصوصية التامة والراحة.",
      },
      { property: "og:title", content: "صالون وهلة أولى للتزيين النسائي | Wahla Spa" },
      {
        property: "og:description",
        content:
          "صالون نسائي فاخر للشعر، البشرة، الأظافر والمكياج في الرياض — احجزي موعدكِ الآن لتجربة جمال استثنائية في صالون وهلة أولى.",
      },
    ],
  }),
  component: Index,
});

/* ══════════════════════════════════════════════════════════════
   DATA & CONFIGURATION
══════════════════════════════════════════════════════════════ */

const BRAND = {
  nameEn: "Wahla Spa",
  nameAr: "صالون وهلة أولى للتزيين النسائي",
  shortName: "صالون وهلة أولى",
  tagline: "فن الجمال والأناقة الهادئة",
};

const CONTACT = {
  phone: "+966 54 734 3934",
  phoneDisplay: "054 734 3934",
  email: "info@wahlaspa.com",
  address: "المملكة العربية السعودية، الرياض — حي العقيق، طريق الأمير محمد بن سلمان",
  instagram: "https://www.instagram.com/wahlaspa/",
  whatsapp:
    "https://api.whatsapp.com/send/?phone=966547343934&text&type=phone_number&app_absent=0&utm_source=ig",
  tiktok: "https://www.tiktok.com",
};

const SERVICES = [
  {
    id: "hair-styling",
    icon: <FiScissors className="w-5 h-5" />,
    title: "تصفيف وتسريح الشعر",
    subtitle: "قص احترافي وسشوار مميز",
    desc: "قصات شعر دقيقة وسشوار مخصص يبرز ملامحكِ وتألق إطلالتكِ بأيدي خبيرات محترفات.",
    duration: "60–75 دقيقة",
    price: "ابتداءً من 200 ر.س",
    img: hair,
    category: "الشعر",
  },
  {
    id: "hair-colour",
    icon: <PiFlowerLotusThin className="w-5 h-5" />,
    title: "صبغات الشعر والبالياج",
    subtitle: "بالياج متدرج ورنساج فاخر",
    desc: "تدرجات ألوان ساحرة وتقنيات بالياج عصرية تمنح شعركِ عمقاً وحيوية ولمعاناً لا يقاوم.",
    duration: "120–180 دقيقة",
    price: "ابتداءً من 450 ر.س",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    fallback: hair,
    category: "الصبغات",
  },
  {
    id: "bridal",
    icon: <PiHandHeartThin className="w-5 h-5" />,
    title: "جناح العروس الملكي",
    subtitle: "شعر ومكياج عرائسي متكامل",
    desc: "عناية خاصة واستثنائية لأجمل أيام حياتكِ، تتضمن بروفة للشعر والمكياج في جناح خاص ومستقل.",
    duration: "نصف يوم / يوم كامل",
    price: "حسب الاستشارة",
    img: bridal,
    category: "العرائس",
  },
  {
    id: "facials",
    icon: <PiFlowerLotusThin className="w-5 h-5" />,
    title: "جلسات نضارة وشد البشرة",
    subtitle: "تنظيف عميق ونضارة فورية",
    desc: "جلسات تنظيف عميق وتقشير لطيف ومساج شد الوجه لإعادة النضارة والإشراق الطبيعي لبشرتكِ.",
    duration: "75–90 دقيقة",
    price: "ابتداءً من 350 ر.س",
    img: facial,
    category: "البشرة",
  },
  {
    id: "skincare",
    icon: <PiHandHeartThin className="w-5 h-5" />,
    title: "عناية متقدمة وتجديد البشرة",
    subtitle: "برامج ترطيب وترميم مكثفة",
    desc: "برامج عناية مخصصة لنوع بشرتكِ مع ترطيب عميق ومغذيات مركزة من أرقى المنتجات العالمية.",
    duration: "60 دقيقة",
    price: "ابتداءً من 300 ر.س",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    fallback: facial,
    category: "البشرة",
  },
  {
    id: "nails",
    icon: <FiStar className="w-5 h-5" />,
    title: "عناية بالأظافر (مانيكير وبديكير)",
    subtitle: "مانيكير روسي وديزاين راقٍ",
    desc: "تنظيف الجلد الجاف بدقة متناهية وألوان كلاسيكية وعصرية تدوم طويلاً بلمسات أنيقة وفاخرة.",
    duration: "60–75 دقيقة",
    price: "ابتداءً من 180 ر.س",
    img: nails,
    category: "الأظافر",
  },
  {
    id: "makeup",
    icon: <FiStar className="w-5 h-5" />,
    title: "مكياج سهرة ومناسبات",
    subtitle: "إطلالات فخمة وجذابة",
    desc: "مكياج سينمائي وسهرات بأجود الماركات العالمية يبرز جمالكِ بلمسات راقية تناسب كافة المناسبات.",
    duration: "60–75 دقيقة",
    price: "ابتداءً من 350 ر.س",
    img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80",
    fallback: heroDesktop,
    category: "المكياج",
  },
];

const GALLERY_ITEMS = [
  { id: "g1",  src: hair,    fallback: hair,    alt: "تصفيف شعر احترافي",          cat: "الشعر",   title: "شعر حريري ولامع",        span: "col-span-1 md:col-span-7", aspect: "aspect-[4/3]" },
  { id: "g2",  src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80", fallback: hair,  alt: "صبغات وبالياج",  cat: "الصبغات", title: "بالياج بتدرجات طبيعية", span: "col-span-1 md:col-span-5", aspect: "aspect-[4/3]" },
  { id: "g3",  src: bridal,  fallback: bridal,  alt: "تسريحة عروس",            cat: "العرائس", title: "إطلالة عروس ساحرة",      span: "col-span-1 md:col-span-5", aspect: "aspect-[4/3]" },
  { id: "g4",  src: facial,  fallback: facial,  alt: "جلسة نضارة البشرة",          cat: "البشرة",   title: "جلسة إشراق ونضارة",    span: "col-span-1 md:col-span-7", aspect: "aspect-[4/3]" },
  { id: "g5",  src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80", fallback: heroDesktop, alt: "مكياج سهرة", cat: "المكياج", title: "مكياج سهرة راقٍ", span: "col-span-1 md:col-span-4", aspect: "aspect-square" },
  { id: "g6",  src: nails,   fallback: nails,   alt: "مانيكير روسي راقٍ",          cat: "الأظافر",  title: "أظافر أنيقة وهادئة",  span: "col-span-1 md:col-span-4", aspect: "aspect-square" },
  { id: "g7",  src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80", fallback: facial, alt: "عناية بالبشرة",  cat: "البشرة",   title: "ترطيب وتغذية مكثفة",  span: "col-span-1 md:col-span-4", aspect: "aspect-square" },
  { id: "g8",  src: heroDesktop, fallback: heroDesktop, alt: "إطلالة مكياج مميزة", cat: "المكياج", title: "جمال الملامح والتألق", span: "col-span-1 md:col-span-7", aspect: "aspect-[16/9]" },
  { id: "g9",  src: salon,   fallback: salon,   alt: "أجواء صالون وهلة أولى",            cat: "الصالون",  title: "أجواء الصالون الفاخرة",         span: "col-span-1 md:col-span-5", aspect: "aspect-[4/3]" },
  { id: "g10", src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80", fallback: hair, alt: "قصة شعر عصرية", cat: "الشعر",   title: "قص وتشكيل متقن",      span: "col-span-1 md:col-span-5", aspect: "aspect-[4/3]" },
  { id: "g11", src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80", fallback: bridal, alt: "عروس متألقة", cat: "العرائس", title: "أناقة العروس الملكية",    span: "col-span-1 md:col-span-7", aspect: "aspect-[16/9]" },
  { id: "g12", src: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=900&q=80",  fallback: hair, alt: "صبغة شعر بنية",  cat: "الصبغات", title: "تدرجات الشوكولاتة والكراميل",      span: "col-span-1 md:col-span-5", aspect: "aspect-[4/3]" },
];

const GALLERY_CATS = ["الكل", "الشعر", "الصبغات", "العرائس", "البشرة", "المكياج", "الأظافر", "الصالون"];

const HOURS = [
  ["السبت – الأربعاء", "1:00 ظهراً – 10:00 مساءً"],
  ["الخميس",           "1:00 ظهراً – 11:00 مساءً"],
  ["الجمعة",           "2:00 ظهراً – 10:00 مساءً"],
  ["الأحد",            "متاح بالحجز المسبق"],
];

/* ══════════════════════════════════════════════════════════════
   HOOKS & SHARED COMPONENTS
══════════════════════════════════════════════════════════════ */

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
  src: string; fallback?: string | undefined; alt: string; className?: string; eager?: boolean;
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
    ["الخدمات والأسعار", "#services"],
    ["معرض الأعمال",   "#gallery"],
    ["عن الصالون",     "#story"],
    ["حجز موعد",       "#book"],
    ["الموقع والتواصل", "#contact"],
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
          <a href="#top" className="flex flex-col leading-none shrink-0 group">
            <span className="font-serif text-lg sm:text-2xl font-bold tracking-wide">
              {BRAND.nameAr}
            </span>
            <span className="text-[0.68rem] text-accent font-medium mt-1">
              {BRAND.nameEn} · للتزيين النسائي
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {links.map(([label, href]) => (
              <a key={href} href={href}
                className="eyebrow text-[0.78rem] link-lux opacity-90 hover:opacity-100 hover:text-accent transition-all">
                {label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
              aria-label="تواصل واتساب"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium px-3 py-2 border border-emerald-400/40 rounded transition-colors">
              <FaWhatsapp className="w-4 h-4" />
              <span>واتساب سريع</span>
            </a>
            <a href="#book"
              className="inline-flex btn-primary text-sm !py-2.5 !px-5">
              <FiCalendar className="w-3.5 h-3.5" />
              احجزي موعدكِ
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
            className="lg:hidden p-2 hover:text-accent transition-colors">
            {open ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
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
        {/* Drawer top bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1rem 1.25rem", borderBottom: "1px solid #e5ddd4", flexShrink: 0,
        }}>
          <div>
            <div style={{ fontFamily: "Cairo, Georgia, serif", fontSize: "1.1rem", fontWeight: "700", color: "#1a1410" }}>
              {BRAND.nameAr}
            </div>
            <div style={{ fontSize: "0.75rem", color: "#b8914a", fontWeight: "500" }}>
              {BRAND.nameEn}
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="إغلاق القائمة"
            style={{ padding: "0.5rem", color: "#1a1410", background: "none", border: "none", cursor: "pointer" }}
          >
            <FiX style={{ width: "1.6rem", height: "1.6rem" }} />
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
                padding: "1.1rem 0",
                fontFamily: "Cairo, sans-serif",
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#1a1410",
                textDecoration: "none",
                borderBottom: "1px solid #e5ddd4",
                transition: "color 0.2s ease",
              }}
            >
              <span>{label}</span>
              <FiArrowLeft style={{ width: "1.2rem", height: "1.2rem", opacity: 0.4 }} />
            </a>
          ))}

          {/* Mobile WhatsApp Quick Action */}
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "1.1rem 0",
              fontFamily: "Cairo, sans-serif",
              fontSize: "1.2rem",
              fontWeight: "600",
              color: "#128C7E",
              textDecoration: "none",
              borderBottom: "1px solid #e5ddd4",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <FaWhatsapp style={{ width: "1.3rem", height: "1.3rem" }} />
              تواصل سريع عبر واتساب
            </span>
            <FiArrowLeft style={{ width: "1.2rem", height: "1.2rem", opacity: 0.6 }} />
          </a>
        </nav>

        {/* Bottom contact info */}
        <div style={{ padding: "1.25rem", borderTop: "1px solid #e5ddd4", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          <a
            href={`tel:${CONTACT.phone}`}
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.95rem", color: "#6b5c4e", textDecoration: "none", direction: "ltr", justifyContent: "flex-end" }}
          >
            <span>{CONTACT.phone}</span>
            <FiPhone style={{ width: "1rem", height: "1rem", flexShrink: 0 }} />
          </a>
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "#b8914a", textDecoration: "none" }}
          >
            <FiInstagram style={{ width: "1.1rem", height: "1.1rem", flexShrink: 0 }} />
            حساب إنستغرام: @wahlaspa
          </a>
        </div>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════ */

function Hero() {
  return (
    <section id="top"
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-neutral-950 text-white">

      {/* Desktop background (landscape) — hidden on mobile */}
      <div className="absolute inset-0 hidden sm:block">
        <img src={heroDesktop} alt="صالون وهلة أولى للتزيين النسائي - الرياض"
          className="h-full w-full object-cover object-center scale-[1.04]"
          style={{ animation: "heroZoom 12s ease-in-out infinite alternate" }}
          loading="eager" aria-hidden />
      </div>

      {/* Mobile background (portrait) — shown only on mobile */}
      <div className="absolute inset-0 block sm:hidden">
        <img src={heroMobile} alt="صالون وهلة أولى للتزيين النسائي"
          className="h-full w-full object-cover object-top"
          loading="eager" aria-hidden />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b
        from-black/75 via-black/45 to-black/90
        sm:from-black/60 sm:via-black/30 sm:to-black/85" />

      {/* Top spacer for nav */}
      <div className="relative z-10 pt-20 sm:pt-28" />

      {/* Hero content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10 pb-10 sm:pb-16 flex-1 flex flex-col justify-end gap-6 sm:gap-8">

        {/* Eyebrow */}
        <p className="fade-in eyebrow text-amber-300 flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold"
          style={{ animationDelay: ".2s" }}>
          <span className="h-px w-6 sm:w-10 bg-amber-300/60 shrink-0" />
          {BRAND.nameAr} | {BRAND.tagline}
        </p>

        {/* Headline */}
        <h1 className="text-[clamp(2.4rem,7.5vw,6.5rem)] font-bold leading-[1.1] tracking-[-0.01em] max-w-4xl">
          <span className="line">
            <span style={{ animationDelay: ".3s" }}>جمالكِ،</span>
          </span>
          <span className="line">
            <span style={{ animationDelay: ".48s" }}>
              يرتقي{" "}
              <em className="text-amber-300 not-italic font-bold">إلى مستوى الفن.</em>
            </span>
          </span>
        </h1>

        {/* Sub-text + CTAs */}
        <div className="fade-in flex flex-col gap-5 sm:gap-6 sm:flex-row sm:items-end sm:justify-between"
          style={{ animationDelay: ".85s" }}>
          <p className="text-[1rem] sm:text-[1.125rem] leading-relaxed text-white/85 max-w-[500px]">
            صالون نسائي فاخر للشعر، البشرة، الأظافر والمكياج في الرياض — حيث تلتقي العناية
            الفائقة بأعلى درجات الخصوصية والهدوء الراقي في أجنحة مخصصة لكل عميلة.
          </p>

          <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto shrink-0">
            <a href="#book"
              className="btn-white !py-3.5 !px-6 sm:!px-7 text-[0.82rem] flex items-center justify-center gap-2 w-full sm:w-auto font-semibold">
              <FiCalendar className="w-4 h-4 shrink-0" />
              احجزي موعدكِ الآن
            </a>
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
              className="btn-outline border-emerald-400 text-emerald-300 hover:!bg-emerald-600 hover:!border-emerald-600 hover:!text-white !py-3.5 !px-6 text-[0.82rem] flex items-center justify-center gap-2 w-full sm:w-auto">
              <FaWhatsapp className="w-4 h-4 shrink-0 text-emerald-400" />
              استفسار عبر واتساب
            </a>
            <a href="#services"
              className="hidden sm:inline-flex btn-outline border-white/30 text-white/85 !py-3.5 !px-5 text-[0.82rem] items-center justify-center gap-2">
              استكشفي الخدمات
              <FiArrowLeft className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </div>

        {/* Trust features */}
        <div className="fade-in flex flex-wrap items-center gap-4 sm:gap-6 pt-3 border-t border-white/15"
          style={{ animationDelay: "1.1s" }}>
          {[
            { icon: <FiShield className="w-4 h-4 text-amber-300" />, text: "أجنحة خاصة بخصوصية تامة" },
            { icon: <FiClock className="w-4 h-4 text-amber-300" />, text: "مواعيد مريحة بلا استعجال" },
            { icon: <FiHeart className="w-4 h-4 text-amber-300" />, text: "عناية مخصصة بكل تفاصيلكِ" },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-white/80 text-xs sm:text-sm font-medium">
              {icon}
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#services" aria-label="التمرير للأسفل"
        className="relative z-10 mx-auto mb-6 hidden sm:flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors">
        <span className="eyebrow text-[0.65rem]">اكتشفي المزيد</span>
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
  const [activeTab, setActiveTab] = useState("الكل");
  const tabs = ["الكل", "الشعر", "الصبغات", "العرائس", "البشرة", "الأظافر", "المكياج"];
  const visible = activeTab === "الكل"
    ? SERVICES
    : SERVICES.filter(s => s.category === activeTab);

  return (
    <section id="services" className="bg-[oklch(0.15_0.025_45)] text-white py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between mb-10 sm:mb-14 pb-8 sm:pb-10 border-b border-white/12">
          <div>
            <Reveal>
              <p className="eyebrow text-amber-300 flex items-center gap-2 mb-3 text-xs sm:text-sm font-medium">
                <span className="h-px w-6 bg-amber-300/60" />
                الخدمات وقائمة الأسعار
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-none">
                خدمات {BRAND.nameAr}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="text-white/70 text-[0.95rem] sm:text-base max-w-sm leading-relaxed">
              كل خدمة تبدأ باستشارة شخصية مجانية لتحديد ما يلائم شعركِ وبشرتكِ بكل دقة واهتمام.
            </p>
          </Reveal>
        </div>

        {/* Category tabs */}
        <Reveal delay={60}>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap mb-8 sm:mb-10">
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`pill shrink-0 !border-white/20 !text-white/70 hover:!text-white hover:!bg-white/10 hover:!border-white/40 text-xs sm:text-sm ${
                  activeTab === tab ? "!bg-amber-300/95 !text-neutral-900 !border-amber-300 font-bold" : ""
                }`}>
                {tab}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Service cards grid */}
        <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((svc, i) => (
            <Reveal key={svc.id} delay={i * 60}>
              <div className="group relative overflow-hidden border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-amber-300/40 transition-all duration-400 h-full flex flex-col justify-between">
                <div>
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
                          <h3 className="font-serif text-lg sm:text-xl font-bold leading-tight text-white">{svc.title}</h3>
                          <p className="text-xs text-amber-300/80 font-medium mt-0.5">{svc.subtitle}</p>
                        </div>
                      </div>
                      {/* Price badge */}
                      <div className="shrink-0 text-left">
                        <div className="font-serif text-base sm:text-lg font-bold text-amber-300 leading-tight">{svc.price}</div>
                        <div className="flex items-center gap-1 text-[0.72rem] text-white/50 mt-0.5 justify-end">
                          <FiClock className="w-3 h-3" />
                          <span>{svc.duration}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-white/70 leading-relaxed mb-4">{svc.desc}</p>
                  </div>
                </div>

                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0">
                  <a href="#book"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-300 hover:gap-3 transition-all duration-200">
                    <span>طلب حجز الخدمة</span>
                    <FiArrowLeft className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Signature experience banner */}
        <Reveal delay={100} className="mt-8 sm:mt-12">
          <div className="relative overflow-hidden border border-amber-300/30 bg-amber-300/5 p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex-1">
              <p className="eyebrow text-amber-300 text-xs mb-2 flex items-center gap-2 font-semibold">
                <span className="h-px w-5 bg-amber-300/60" />
                الباقة الملكية الخاصة
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                ثلاث ساعات من الدلال. <em className="text-amber-300 not-italic font-bold">خصوصية واسترخاء تام.</em>
              </h3>
              <p className="text-white/75 text-sm sm:text-base max-w-xl leading-relaxed">
                ضيافة سعودية فاخرة، جلسة عناية متكاملة بالشعر وفروة الرأس، لون مخصص، وعناية فائقة بنضارة البشرة
                داخل جناحكِ الخاص. متوفرة بالحجز المسبق.
              </p>
            </div>
            <a href="#book"
              className="btn-white shrink-0 !py-3.5 !px-6 text-xs sm:text-sm font-bold flex items-center gap-2">
              <FiCalendar className="w-4 h-4 shrink-0" />
              احجزي الباقة الملكية
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
  const [activeCat, setActiveCat] = useState("الكل");
  const [lb, setLb]               = useState<typeof GALLERY_ITEMS[0] | null>(null);
  const filtered = activeCat === "الكل" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.cat === activeCat);

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
              <p className="eyebrow text-accent flex items-center gap-2 mb-3 text-xs sm:text-sm font-semibold">
                <span className="h-px w-6 bg-accent/60" />
                إبداعات وتألق
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-none text-foreground">
                معرض أعمالنا
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer"
              className="eyebrow link-lux text-muted-foreground hover:text-accent flex items-center gap-2 text-xs sm:text-sm font-semibold">
              <FiInstagram className="w-4 h-4 text-accent" />
              تابعي حسابنا على إنستغرام (@wahlaspa)
            </a>
          </Reveal>
        </div>

        {/* Filter pills */}
        <Reveal delay={60}>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap mb-8">
            {GALLERY_CATS.map(cat => (
              <button key={cat} onClick={() => setActiveCat(cat)}
                className={`pill shrink-0 text-xs sm:text-sm ${activeCat === cat ? "active font-bold" : ""}`}>
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-12">
          {filtered.map((item, i) => (
            <Reveal key={item.id} mask delay={Math.min(i * 70, 420)}
              className={`${item.span} ${item.aspect} min-h-[220px] sm:min-h-0`}>
              <div className="gallery-item w-full h-full"
                onClick={() => setLb(item)} role="button" tabIndex={0}
                onKeyDown={e => { if (e.key === "Enter") setLb(item); }}
                aria-label={`عرض ${item.title}`}>
                <Img src={item.src} fallback={item.fallback} alt={item.alt}
                  className="w-full h-full object-cover" />
                <div className="gallery-overlay" />
                <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5 opacity-0 [.gallery-item:hover_&]:opacity-100 transition-opacity duration-400">
                  <p className="eyebrow text-amber-300 text-xs mb-1 font-medium">{item.cat}</p>
                  <p className="font-serif text-lg sm:text-xl text-white font-bold">{item.title}</p>
                  <p className="eyebrow text-amber-300/90 text-xs mt-2 flex items-center gap-1 font-semibold">
                    احجزي هذه الإطلالة <FiArrowLeft className="w-3 h-3" />
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
          <button onClick={() => setLb(null)} aria-label="إغلاق"
            className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10 text-white/70 hover:text-white p-2 border border-white/20 hover:border-white transition-colors">
            <FiX className="w-6 h-6" />
          </button>
          <figure className="flex flex-col items-center gap-4 max-w-4xl w-full"
            onClick={e => e.stopPropagation()}>
            <img src={lb.src} alt={lb.alt}
              className="max-h-[75vh] max-w-full object-contain rounded-sm"
              onError={e => { if (lb.fallback) (e.currentTarget as HTMLImageElement).src = lb.fallback; }} />
            <figcaption className="text-center">
              <p className="eyebrow text-amber-300 text-xs mb-1">{lb.cat}</p>
              <p className="font-serif text-2xl text-white font-bold">{lb.title}</p>
              <a href="#book" onClick={() => setLb(null)}
                className="mt-3 inline-flex items-center gap-2 btn-white !py-2.5 !px-6 text-xs font-bold">
                <FiCalendar className="w-4 h-4" />
                احجزي هذا الموعد
              </a>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   STORY & ABOUT
══════════════════════════════════════════════════════════════ */

function Story() {
  return (
    <section id="story" className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-20 sm:py-28 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">

          {/* Text */}
          <div>
            <Reveal>
              <p className="eyebrow text-accent flex items-center gap-2 mb-4 text-xs sm:text-sm font-semibold">
                <span className="h-px w-6 bg-accent/60" />
                عن {BRAND.nameAr}
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-[clamp(2.2rem,4.5vw,4.2rem)] font-bold leading-[1.1] mb-6 sm:mb-8">
                صالونٌ مخصصٌ لـ{" "}
                <em className="text-accent not-italic font-bold">الفخامة الهادئة</em> والجمال الراقي.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="space-y-4 text-muted-foreground text-base sm:text-[1.0625rem] leading-relaxed">
                <p>
                  انطلق {BRAND.nameAr} ({BRAND.nameEn}) في الرياض ليكون الوجهة المفضلة لكل سيدة تبحث عن
                  التميز والخصوصية التامة في تجربة الجمال والعناية.
                </p>
                <p>
                  نؤمن في صالوننا بأن الجمال ليس مجرد خدمة تقدم، بل هو رحلة استرخاء متكاملة. لذا خصصنا
                  أجنحة خاصة مستقلة ومواعيد مدروسة تمنحكِ كامل الوقت والاهتمام بلا أي استعجال، وباستخدام
                  أجود الماركات العالمية المعتمدة.
                </p>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <a href="#philosophy" className="eyebrow link-lux mt-8 inline-flex items-center gap-2 text-foreground text-xs sm:text-sm font-bold">
                فلسفتنا في العناية
                <FiArrowLeft className="w-3.5 h-3.5" />
              </a>
            </Reveal>

            {/* Stats row */}
            <Reveal delay={300} className="mt-10 grid grid-cols-3 gap-4 sm:gap-6 border-t border-border pt-8">
              {[["١٠+", "سنوات خبرة"], ["٥,٠٠٠+", "عميلة سعيدة"], ["٧", "أقسام تخصصية"]].map(([n, l]) => (
                <div key={l} className="text-center">
                  <div className="font-serif text-[2.2rem] sm:text-[2.8rem] font-bold leading-none text-accent">{n}</div>
                  <p className="eyebrow text-xs text-muted-foreground mt-1 font-medium">{l}</p>
                </div>
              ))}
            </Reveal>
          </div>

          {/* Image stack */}
          <div className="relative mt-4 lg:mt-0">
            <Reveal mask className="aspect-[4/5] overflow-hidden shadow-xl rounded-sm">
              <img src={hair} alt="العناية بالشعر في صالون وهلة أولى"
                className="w-full h-full object-cover" loading="lazy" />
            </Reveal>
            {/* Floating card */}
            <Reveal delay={300}
              className="absolute -bottom-6 -right-4 sm:-right-8 z-10 w-[70%] sm:w-[60%] bg-card border border-border shadow-xl p-4 sm:p-5 rounded-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 sm:h-12 sm:w-12 overflow-hidden shrink-0 rounded-sm">
                  <img src={salon} alt="صالون وهلة أولى الرياض" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div>
                  <p className="font-serif text-sm sm:text-base font-bold leading-tight text-foreground">أجنحة خاصة ومستقلة</p>
                  <p className="eyebrow text-[0.65rem] text-accent mt-0.5 font-semibold">أعلى درجات الخصوصية</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-snug">
                استمتعي بجلسة العناية الخاصة بكِ في جو هادئ ومريح تماماً لكِ وحدكِ.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Philosophy strip */}
      <div id="philosophy" className="bg-secondary border-t border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
          <Reveal className="mb-10 sm:mb-14 text-center">
            <p className="font-serif text-[clamp(1.35rem,2.8vw,2.4rem)] font-bold leading-snug max-w-3xl mx-auto">
              "العناية بالجمال ليست رفاهية، بل هي{" "}
              <em className="text-accent not-italic font-bold">طقسٌ من الاحترام والتقدير</em> — لوقتكِ،
              لراحتكِ، ولتألقكِ الدائم."
            </p>
          </Reveal>
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-3">
            {[
              { icon: <PiFlowerLotusThin className="w-8 h-8 text-accent" />, title: "استماع واهتمام", desc: "كل موعد يبدأ باستشارة شخصية لفهم ما ترغبين به بدقة وتحقيقه بأعلى معايير الإتقان." },
              { icon: <PiHandHeartThin className="w-8 h-8 text-accent" />,   title: "منتجات نقية ومعتمدة", desc: "نستخدم فقط أفضل الماركات العالمية الآمنة المعتمدة التي تحافظ على صحة شعركِ وبشرتكِ." },
              { icon: <PiClockCountdownThin className="w-8 h-8 text-accent" />, title: "وقتٌ كافٍ بلا استعجال", desc: "نمنح كل عميلة الوقت الكامل للاستمتاع بجلسة هادئة ومتقنة دون أي تداخل في المواعيد." },
            ].map(({ icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 100}
                className="border-t-2 border-accent/40 pt-5 sm:pt-6">
                <div className="mb-3">{icon}</div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold mb-2">{title}</h3>
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
   BOOKING
══════════════════════════════════════════════════════════════ */

interface BookingErrors {
  name?: string;
  contact?: string;
  service?: string;
  date?: string;
}

function Booking() {
  const [selected, setSelected] = useState<string[]>([]);
  const [errors,   setErrors]   = useState<BookingErrors>({});
  const [done,     setDone]     = useState<{ name: string; phone: string; service: string } | null>(null);

  const toggle = (name: string) =>
    setSelected(p => p.includes(name) ? p.filter(s => s !== name) : [...p, name]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const g  = (k: string) => String(fd.get(k) ?? "").trim();
    const err: BookingErrors = {};

    const name = g("name");
    const contact = g("contact");
    const date = g("date");

    if (!name) err.name = "يرجى كتابة الاسم الكريم.";
    if (!contact) {
      err.contact = "يرجى إدخال رقم الجوال أو البريد الإلكتروني.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) && !/^[+\d][\d\s()-]{7,}$/.test(contact)) {
      err.contact = "يرجى إدخال رقم جوال صحيح (مثال: 0500000000).";
    }
    if (!selected.length) err.service = "يرجى اختيار خدمة واحدة على الأقل.";
    if (!date) err.date = "يرجى اختيار التاريخ المفضل.";

    setErrors(err);
    if (!Object.keys(err).length) {
      setDone({
        name,
        phone: contact,
        service: selected.join("، "),
      });
    }
  };

  return (
    <section id="book" className="grain bg-[oklch(0.15_0.025_45)] text-white py-20 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Right/Top in Arabic — context */}
          <div>
            <Reveal>
              <p className="eyebrow text-amber-300 flex items-center gap-2 mb-4 text-xs sm:text-sm font-semibold">
                <span className="h-px w-6 bg-amber-300/60" />
                الحجوزات والاستفسارات
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-bold leading-none mb-6">
                احجزي{" "}
                <em className="text-amber-300 not-italic font-bold">لحظتكِ الخاصة.</em>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-white/75 text-base sm:text-[1.0625rem] leading-relaxed mb-8 max-w-md">
                شاركينا تفضيلاتكِ وسيتواصل معكِ فريق استقبال صالون وهلة أولى فوراً لتأكيد موعدكِ
                وتجهيز الجناح الخاص بكِ.
              </p>
            </Reveal>

            {/* Salon image */}
            <Reveal mask delay={200} className="aspect-[4/3] overflow-hidden mb-8 rounded-sm">
              <img src={salon} alt="صالون وهلة أولى الرياض" className="w-full h-full object-cover" loading="lazy" />
            </Reveal>

            {/* Contact info */}
            <Reveal delay={260}>
              <div className="space-y-4 pt-6 border-t border-white/12">
                <p className="eyebrow text-white/50 text-xs mb-2">تفضلين الاتصال المباشر؟</p>
                <a href={`tel:${CONTACT.phone}`}
                  className="flex items-center gap-3 font-serif text-xl sm:text-2xl font-bold link-lux w-fit"
                  style={{ direction: "ltr" }}>
                  <FiPhone className="w-5 h-5 text-amber-300 shrink-0" />
                  <span>{CONTACT.phone}</span>
                </a>
                <a href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 text-base text-white/75 link-lux w-fit">
                  <FiMail className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>{CONTACT.email}</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Left/Form in Arabic */}
          <Reveal delay={120}>
            {/* Direct WhatsApp Quick Booking Button */}
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
              className="btn-white w-full !py-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 mb-4 shadow-lg hover:shadow-xl transition-all">
              <FaWhatsapp className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>حجز فوري ومباشر عبر واتساب</span>
            </a>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-white/15" />
              <span className="eyebrow text-white/40 text-[0.65rem] font-medium">أو أرسلي طلب الحجز من النموذج أدناه</span>
              <div className="flex-1 h-px bg-white/15" />
            </div>

            {done ? (
              /* Success state */
              <div className="border border-amber-300/30 bg-amber-300/5 p-8 sm:p-10 flex flex-col items-start rounded-sm" role="status">
                <div className="w-12 h-12 rounded-full bg-amber-300/20 flex items-center justify-center mb-6">
                  <FiCheck className="w-6 h-6 text-amber-300" />
                </div>
                <p className="eyebrow text-amber-300 text-xs font-semibold mb-2">تم استلام طلبكِ بنجاح</p>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">أهلاً بكِ، {done.name}.</h3>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
                  تم تسجيل رغبتكِ في حجز ({done.service}). سيتواصل معكِ فريق صالون وهلة أولى في أقرب وقت لتأكيد الموعد والتفاصيل.
                </p>

                {/* Direct WhatsApp confirmation option */}
                <a
                  href={`https://api.whatsapp.com/send/?phone=966547343934&text=${encodeURIComponent(
                    `مرحباً صالون وهلة أولى للتزيين النسائي، قمت بطلب حجز موعد باسم (${done.name}) لخدمة (${done.service}). أود تأكيد الموعد.`
                  )}&type=phone_number&app_absent=0&utm_source=ig`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-3 rounded text-xs sm:text-sm mb-6 transition-colors"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>تأكيد الموعد عبر واتساب الآن</span>
                </a>

                <button onClick={() => { setDone(null); setSelected([]); setErrors({}); }}
                  className="btn-outline border-white/50 text-white text-xs font-medium">
                  إرسال طلب موعد آخر
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="space-y-6">

                {/* Name */}
                <div>
                  <label htmlFor="f-name" className="eyebrow text-white/60 text-xs flex items-center gap-1.5 mb-1.5 font-medium">
                    <FiUser className="w-3.5 h-3.5 text-amber-300" /> الاسم الكريم *
                  </label>
                  <input id="f-name" name="name" placeholder="اكتبي اسمكِ الكريم"
                    className="field text-right" autoComplete="name" />
                  {errors.name && <p className="mt-1.5 text-xs text-rose-400 font-medium" role="alert">{errors.name}</p>}
                </div>

                {/* Contact */}
                <div>
                  <label htmlFor="f-contact" className="eyebrow text-white/60 text-xs flex items-center gap-1.5 mb-1.5 font-medium">
                    <FiPhone className="w-3.5 h-3.5 text-amber-300" /> رقم الجوال أو البريد الإلكتروني *
                  </label>
                  <input id="f-contact" name="contact" placeholder="050 000 0000 أو info@example.com"
                    className="field text-right" />
                  {errors.contact && <p className="mt-1.5 text-xs text-rose-400 font-medium" role="alert">{errors.contact}</p>}
                </div>

                {/* Service chips */}
                <div>
                  <p className="eyebrow text-white/60 text-xs flex items-center gap-1.5 mb-3 font-medium">
                    <FiScissors className="w-3.5 h-3.5 text-amber-300" /> اختاري الخدمة المطلوبة *
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[...SERVICES.map(s => s.title), "الباقة الملكية الخاصة"].map(name => (
                      <button key={name} type="button" onClick={() => toggle(name)}
                        aria-pressed={selected.includes(name)}
                        className={`px-3.5 py-2 text-xs font-semibold border transition-all duration-200 rounded-sm ${
                          selected.includes(name)
                            ? "bg-amber-300 text-neutral-900 border-amber-300"
                            : "border-white/20 text-white/70 hover:border-amber-300/50 hover:text-white"
                        }`}>
                        {name}
                      </button>
                    ))}
                  </div>
                  {errors.service && <p className="mt-2 text-xs text-rose-400 font-medium" role="alert">{errors.service}</p>}
                </div>

                {/* Category preference */}
                <div>
                  <label htmlFor="f-dept" className="eyebrow text-white/60 text-xs flex items-center gap-1.5 mb-1.5 font-medium">
                    <FiStar className="w-3.5 h-3.5 text-amber-300" /> القسم المطلوب
                  </label>
                  <select id="f-dept" name="department" className="field text-right">
                    <option value="">أي قسم متاح</option>
                    <option value="شعر">قسم تصفيف وتسريحات الشعر</option>
                    <option value="صبغات">قسم الصبغات والبالياج</option>
                    <option value="عرائس">باقات العرائس الملكية</option>
                    <option value="بشرة">قسم العناية بالبشرة والمساج</option>
                    <option value="أظافر">قسم الأظافر والبديكير الروسي</option>
                    <option value="مكياج">قسم المكياج والسهرات</option>
                  </select>
                </div>

                {/* Date + Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="f-date" className="eyebrow text-white/60 text-xs flex items-center gap-1.5 mb-1.5 font-medium">
                      <FiCalendar className="w-3.5 h-3.5 text-amber-300" /> التاريخ المفضل *
                    </label>
                    <input id="f-date" name="date" type="date"
                      className="field [color-scheme:dark]" />
                    {errors.date && <p className="mt-1.5 text-xs text-rose-400 font-medium" role="alert">{errors.date}</p>}
                  </div>
                  <div>
                    <label htmlFor="f-time" className="eyebrow text-white/60 text-xs flex items-center gap-1.5 mb-1.5 font-medium">
                      <FiClock className="w-3.5 h-3.5 text-amber-300" /> الوقت المفضل
                    </label>
                    <select id="f-time" name="time" className="field text-right">
                      <option>فترة بعد الظهر (1:00 م – 4:00 م)</option>
                      <option>فترة المساء (4:00 م – 7:00 م)</option>
                      <option>فترة الليل (7:00 م – 10:00 م)</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="f-msg" className="eyebrow text-white/60 text-xs mb-1.5 block font-medium">
                    ملاحظات أو طلبات خاصة
                  </label>
                  <textarea id="f-msg" name="message" rows={3} placeholder="أي تفاصيل ترغبين بمشاركتها معنا قبل الموعد..."
                    className="field resize-none text-right" />
                </div>

                {/* Submit */}
                <div className="pt-2 space-y-3">
                  <button type="submit"
                    className="btn-white w-full !py-4 text-xs sm:text-sm font-bold flex items-center justify-center gap-2">
                    <FiCalendar className="w-4 h-4 shrink-0" />
                    إرسال طلب حجز الموعد
                  </button>
                  <p className="text-center text-xs text-white/40">
                    خدمة خاصة ومتميزة في صالون وهلة أولى للتزيين النسائي · الرياض
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
   CONTACT & LOCATION
══════════════════════════════════════════════════════════════ */

function Contact() {
  return (
    <section id="contact" className="overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-12">
        {/* Info */}
        <div className="px-4 sm:px-6 lg:px-10 py-20 sm:py-28 lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-accent flex items-center gap-2 mb-4 text-xs sm:text-sm font-semibold">
              <span className="h-px w-6 bg-accent/60" />
              الموقع والتواصل
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-[clamp(2.2rem,4vw,3.8rem)] font-bold leading-none mb-8">
              زيارة {BRAND.nameAr}
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <div className="space-y-4 mb-8">
              <a href={`tel:${CONTACT.phone}`}
                className="flex items-center gap-3 text-foreground hover:text-accent transition-colors group">
                <div className="w-10 h-10 shrink-0 border border-border flex items-center justify-center text-accent group-hover:border-accent transition-colors rounded-sm">
                  <FiPhone className="w-4 h-4" />
                </div>
                <span className="text-sm sm:text-base font-semibold" style={{ direction: "ltr" }}>{CONTACT.phone}</span>
              </a>

              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-foreground hover:text-emerald-600 transition-colors group">
                <div className="w-10 h-10 shrink-0 border border-border flex items-center justify-center text-emerald-600 group-hover:border-emerald-600 transition-colors rounded-sm">
                  <FaWhatsapp className="w-4 h-4" />
                </div>
                <span className="text-sm sm:text-base font-semibold">محادثة واتساب سريعة</span>
              </a>

              <a href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 text-foreground hover:text-accent transition-colors group">
                <div className="w-10 h-10 shrink-0 border border-border flex items-center justify-center text-accent group-hover:border-accent transition-colors rounded-sm">
                  <FiMail className="w-4 h-4" />
                </div>
                <span className="text-sm sm:text-base">{CONTACT.email}</span>
              </a>

              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 shrink-0 border border-border flex items-center justify-center text-accent rounded-sm">
                  <FiMapPin className="w-4 h-4" />
                </div>
                <span className="text-sm sm:text-base leading-snug">{CONTACT.address}</span>
              </div>
            </div>
          </Reveal>

          {/* Hours */}
          <Reveal delay={200}>
            <div className="border-t border-border">
              <div className="py-2.5 text-xs text-accent font-bold eyebrow">أوقات العمل في الرياض</div>
              {HOURS.map(([day, time]) => (
                <div key={day} className="flex items-center justify-between py-3 border-b border-border text-sm sm:text-base">
                  <dt className="text-foreground font-medium">{day}</dt>
                  <dd className="text-muted-foreground">{time}</dd>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Social */}
          <Reveal delay={280}>
            <div className="mt-8 flex items-center gap-4">
              <p className="eyebrow text-muted-foreground text-xs font-semibold">تابعينا:</p>
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="حساب إنستغرام"
                className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-colors rounded-sm">
                <FiInstagram className="w-4 h-4" />
              </a>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="واتساب"
                className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:border-emerald-500 hover:text-emerald-500 transition-colors rounded-sm">
                <FaWhatsapp className="w-4 h-4" />
              </a>
              <a href={CONTACT.tiktok} target="_blank" rel="noopener noreferrer" aria-label="تيك توك"
                className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-colors rounded-sm">
                <FaTiktok className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Salon image */}
        <Reveal mask delay={120} className="min-h-[320px] sm:min-h-[420px] lg:col-span-7">
          <img src={salon} alt="صالون وهلة أولى الداخلي"
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
            <h2 className="text-[clamp(2.4rem,6vw,5.5rem)] font-bold leading-[1.05]">
              فن الجمال<br />
              <em className="text-amber-300 not-italic font-bold">والأناقة الاستثنائية.</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <a href="#book"
              className="btn-white self-start shrink-0 flex items-center gap-2 !py-3.5 !px-7 font-bold text-xs sm:text-sm">
              <FiCalendar className="w-4 h-4 shrink-0" />
              احجزي موعدكِ الآن
            </a>
          </Reveal>
        </div>

        {/* Grid */}
        <div className="grid gap-10 py-12 sm:py-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-xl font-bold tracking-wide mb-2">{BRAND.nameEn}</p>
            <p className="text-amber-300 font-medium text-sm mb-4">{BRAND.nameAr}</p>
            <p className="text-white/60 text-sm leading-relaxed">
              صالون نسائي متكامل للشعر، البشرة، الأظافر والمكياج في الرياض — نسعد بزيارتكِ وتقديم أرقى درجات العناية.
            </p>
          </div>

          <div>
            <p className="eyebrow text-white/40 text-xs font-semibold mb-4">أقسام الموقع</p>
            <ul className="space-y-2.5">
              {[
                ["الخدمات والأسعار", "#services"],
                ["معرض الأعمال", "#gallery"],
                ["عن صالون وهلة أولى", "#story"],
                ["حجز موعد", "#book"],
                ["الموقع والتواصل", "#contact"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="text-sm text-white/70 link-lux hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-white/40 text-xs font-semibold mb-4">التواصل الاجتماعي</p>
            <ul className="space-y-2.5">
              <li>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-amber-300 transition-colors">
                  <FiInstagram className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>إنستغرام: @wahlaspa</span>
                </a>
              </li>
              <li>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-emerald-400 transition-colors">
                  <FaWhatsapp className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>واتساب مباشر</span>
                </a>
              </li>
              <li>
                <a href={CONTACT.tiktok} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                  <FaTiktok className="w-4 h-4 shrink-0" />
                  <span>تيك توك</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-white/40 text-xs font-semibold mb-4">العنوان والتواصل</p>
            <address className="not-italic space-y-2 text-sm text-white/60">
              <p className="leading-snug">{CONTACT.address}</p>
              <p style={{ direction: "ltr", textAlign: "right" }}>{CONTACT.phone}</p>
              <p>{CONTACT.email}</p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-6 border-t border-white/10">
          <p className="text-xs text-white/40">
            © {year} {BRAND.nameEn} ({BRAND.nameAr}). جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-5">
            <a href="#top" className="text-xs text-white/40 link-lux hover:text-white/70 transition-colors">الخصوصية</a>
            <a href="#top" className="text-xs text-white/40 link-lux hover:text-white/70 transition-colors">الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
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
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
