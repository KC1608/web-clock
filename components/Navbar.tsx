"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gauge, Wind, Clock, MessageSquarePlus, PenTool, Menu, X } from "lucide-react";
import AuthButton from "./AuthButton";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Car Tech Hub", href: "/articles", icon: Gauge },
    { name: "Share Knowledge", href: "/articles/new", icon: PenTool },
    { name: "Let's Connect", href: "/connect", icon: MessageSquarePlus },
    { name: "Web Clock", href: "/clock", icon: Clock },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-amber-600 text-white shadow-lg shadow-red-900/30 group-hover:scale-105 transition-transform duration-200">
            <Wind className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-white text-lg">REV</span>
              <span className="font-extrabold tracking-tight text-red-500 text-lg">PULSE</span>
              <span className="rounded bg-red-500/20 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-red-400 uppercase">
                AutoTech
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-none">Automotive Engineering & Knowledge Hub</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          <Link
            href="/"
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              pathname === "/"
                ? "bg-zinc-800 text-white font-semibold"
                : "text-zinc-300 hover:text-white hover:bg-zinc-800/60"
            }`}
          >
            Home
          </Link>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-red-500/10 text-red-400 border border-red-500/30 font-semibold"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-800/60"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions: Google Auth & Submit Guide */}
        <div className="hidden lg:flex items-center gap-3">
          <AuthButton />
          <Link
            href="/articles/new"
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-red-950 hover:from-red-500 hover:to-amber-500 transition-all hover:scale-[1.02]"
          >
            <PenTool className="h-3.5 w-3.5" />
            Write Tech Post
          </Link>
        </div>

        {/* Mobile menu button & Auth */}
        <div className="flex items-center gap-2 md:hidden">
          <AuthButton />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 pt-2 pb-5 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block rounded-lg px-3 py-2 text-base font-medium ${
              pathname === "/" ? "bg-zinc-800 text-white" : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            Home
          </Link>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-base font-medium ${
                  isActive
                    ? "bg-red-500/15 text-red-400 font-semibold"
                    : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
