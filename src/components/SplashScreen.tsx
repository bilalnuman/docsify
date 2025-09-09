import React, { useEffect, useRef, useState } from "react";
import AppDarkLogo from "@/assets/images/dark-logo.svg";

type SplashScreenProps = {
  appName?: string;
  subtitle?: string;
  progress?: number;
  tip?: string;
  logo?: React.ReactNode;
  className?: string;
  show?: boolean; 
  onExited?: () => void; 
  fadeMs?: number;
};

export default function SplashScreen({
  appName = "Docsify",
  subtitle = "",
  progress,
  tip,
  logo,
  className = "",
  show = true,
  onExited,
  fadeMs = 900,
}: SplashScreenProps) {
  const pct =
    typeof progress === "number" ? Math.max(0, Math.min(100, progress)) : undefined;

 
  const [mounted, setMounted] = useState(show);
  const [visible, setVisible] = useState(show);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (show) {
      setMounted(true);
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [show]);

  const handleWrapperEnd: React.TransitionEventHandler<HTMLDivElement> = (e) => {
    if (e.target !== wrapperRef.current) return;
    if (!visible) {
      setMounted(false);
      onExited?.();
    }
  };

  if (!mounted) return null;

  return (
    <div
      ref={wrapperRef}
      onTransitionEnd={handleWrapperEnd}
      className={[
        "fixed inset-0  grid place-items-center overflow-hidden z-[9999]",
        "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950",
        "transition-opacity ease-out",
        visible ? "opacity-100" : "opacity-0 pointer-events-none",
        className,
      ].join(" ")}
      style={{ transitionDuration: `${fadeMs}ms` }}
      role="status"
      aria-live="polite"
    >
     
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-fuchsia-500/25 blur-3xl opacity-70 animate-pulse" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl opacity-70 animate-pulse" />
      <div className="pointer-events-none absolute top-1/3 -right-32 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl opacity-60" />

     
      <div
        ref={cardRef}
        className={[
          "relative w-[min(92vw,600px)]",
          "transition-all ease-out",
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0",
        ].join(" ")}
        style={{ transitionDuration: `${fadeMs}ms` }}
      >
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-white/30 via-white/10 to-white/5 shadow-2xl">
          <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
            <div className="px-8 py-10 text-center text-white">
              <div className="mx-auto mb-6 h-20 w-20 rounded-2xl p-[2px] bg-gradient-to-br from-indigo-400 via-sky-400 to-cyan-400">
                <div className="grid h-full w-full place-items-center rounded-[14px] bg-slate-950/80">
                  {logo ?? <img src={AppDarkLogo} alt="logo" className="p-2 object-contain" />}
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{appName}</h1>
              {subtitle && <p className="mt-2 text-sm md:text-base text-slate-300">{subtitle}</p>}

              <div className="mt-6 flex items-center justify-center gap-3">
                <span className="inline-flex h-4 w-4 rounded-full border-2 border-white/40 border-t-transparent animate-spin" aria-hidden="true" />
                <span className="text-slate-300 text-sm">Loading</span>
                <span className="sr-only">Loading…</span>
              </div>

              {typeof pct === "number" && (
                <div className="mx-auto mt-6 h-2 w-full max-w-[420px] overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-400 via-sky-400 to-cyan-400 transition-[width] duration-500 ease-out"
                    style={{ width: `${pct}%` }}
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={pct}
                  />
                </div>
              )}

              {tip && <p className="mx-auto mt-6 max-w-[460px] text-xs md:text-sm text-slate-400">{tip}</p>}

              <div className="mt-8 text-[11px] text-slate-500">
                Securing your session <span className="mx-2">•</span> Optimizing assets
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
