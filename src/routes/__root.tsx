import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#141110" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Jost:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon.png", type: "image/png", sizes: "512x512" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "shortcut icon", href: "/favicon.ico" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

/* ─── Global Floating WhatsApp Concierge Component ────────────── */
function GlobalWhatsAppConcierge() {
  const [showTooltip, setShowTooltip] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Automatically minimize tooltip after 9 seconds if unopened
    const timer = setTimeout(() => {
      if (!hasInteracted) setShowTooltip(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, [hasInteracted]);

  return (
    <aside
      aria-label="WhatsApp Concierge Floating Contact"
      className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end select-none pointer-events-auto"
    >
      {/* Concierge Tooltip Popup */}
      {showTooltip && (
        <div className="relative mb-3.5 mr-1 max-w-[280px] animate-[fadein_0.4s_cubic-bezier(.16,1,.3,1)] rounded-2xl border border-amber-300/30 bg-neutral-950/95 p-4 text-white shadow-[0_12px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          <button
            onClick={() => {
              setShowTooltip(false);
              setHasInteracted(true);
            }}
            className="absolute top-2 right-2.5 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white/50 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Close concierge notification"
          >
            ✕
          </button>
          
          <div className="flex items-center gap-2 mb-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="text-[0.68rem] font-semibold tracking-[0.2em] text-amber-300 uppercase">
              Atelier Concierge
            </span>
          </div>
          
          <p className="text-[0.82rem] leading-[1.45] text-white/90 font-light">
            Need consultation or bespoke booking? Chat live with our Parisian atelier team.
          </p>
          
          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[0.68rem] text-white/60">
            <span>Place Vendôme · Paris</span>
            <span className="text-emerald-400 font-medium">Online Now</span>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href="https://wa.me/33142685500?text=Hello%20Maison%20Beaut%C3%A9%20Atelier%2C%20I%20would%20like%20to%20inquire%20about%20a%20private%20experience."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Maison Beauté Concierge on WhatsApp"
        onClick={() => setHasInteracted(true)}
        className="whatsapp-float-btn group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#2ecc71] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_45px_rgba(37,211,102,0.7)] focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
      >
        {/* Pulsing online badge dot */}
        <span className="absolute top-0 right-0 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-neutral-900" />
        </span>

        {/* WhatsApp Vector Icon */}
        <svg
          viewBox="0 0 24 24"
          width="32"
          height="32"
          stroke="currentColor"
          strokeWidth="0"
          fill="currentColor"
          className="transition-transform duration-300 group-hover:scale-110 drop-shadow-sm"
        >
          <path d="M17.472 14.382c-.301-.15-1.782-.879-2.057-.98-.276-.1-.476-.15-.676.15-.2.301-.776.98-.952 1.18-.176.2-.351.226-.652.076-.301-.15-1.27-.468-2.42-1.493-.894-.798-1.497-1.784-1.673-2.085-.176-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.15-.176.2-.301.301-.501.101-.2.05-.376-.025-.526-.075-.15-.676-1.63-.927-2.232-.244-.587-.492-.507-.676-.516l-.577-.01c-.2 0-.526.075-.802.376-.276.301-1.052 1.028-1.052 2.508 0 1.48 1.077 2.909 1.228 3.109.15.2 2.12 3.238 5.136 4.542.717.311 1.278.497 1.714.636.721.23 1.377.198 1.896.12.578-.087 1.782-.728 2.032-1.431.25-.703.25-1.305.175-1.431-.075-.126-.275-.201-.576-.351z" />
          <path d="M12.004 0C5.385 0 0 5.385 0 12.004c0 2.115.552 4.179 1.602 6.002L.055 23.95l6.096-1.599c1.761.961 3.753 1.468 5.853 1.468 6.618 0 12.004-5.386 12.004-12.004S18.622 0 12.004 0zm0 21.996c-1.879 0-3.719-.505-5.322-1.46l-.382-.228-3.953 1.037 1.055-3.855-.25-.398c-1.047-1.666-1.601-3.606-1.601-5.601 0-5.787 4.707-10.494 10.494-10.494 5.786 0 10.493 4.707 10.493 10.494 0 5.786-4.707 10.493-10.493 10.493z" />
        </svg>
      </a>
    </aside>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      {/* Global floating WhatsApp button available across the entire site */}
      <GlobalWhatsAppConcierge />
    </QueryClientProvider>
  );
}
