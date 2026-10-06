import React from "react";
import Image from "next/image";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function BrandLogo({ size = "md", showText = true }: BrandLogoProps) {
  const dimension = size === "sm" ? 32 : size === "lg" ? 56 : 42;

  return (
    <div className="flex items-center gap-2.5 group">
      {/* Emblem Badge */}
      <div className="relative overflow-hidden rounded-xl border border-red-500/30 bg-zinc-900/90 shadow-lg shadow-red-950/40 transition-transform duration-200 group-hover:scale-105 group-hover:border-red-500/60 shrink-0">
        <Image
          src="/logo.png"
          alt="RevPulse AutoTech Emblem"
          width={dimension}
          height={dimension}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/30 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-black tracking-tight text-white text-lg">REV</span>
            <span className="font-black tracking-tight text-red-500 text-lg">PULSE</span>
            <span className="rounded bg-red-500/20 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-red-400 uppercase border border-red-500/20">
              AutoTech
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 leading-none font-medium">
            Automotive Engineering &amp; Knowledge Hub
          </p>
        </div>
      )}
    </div>
  );
}
