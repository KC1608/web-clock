import React from "react";
import Link from "next/link";
import { Wind, Heart, Shield, Cpu, Clock, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white">
                <Wind className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                REV<span className="text-red-500">PULSE</span> AutoTech
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-md">
              A community knowledge hub built for automotive engineers, mechanics, and car enthusiasts.
              Explaining the intricate physics and mechanics of engines, turbos, intakes, exhausts, and headlights.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Shield className="h-4 w-4 text-emerald-500" />
              <span>Free open engineering knowledge platform</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-200 mb-3">
              Explore Tech
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/articles" className="hover:text-red-400 transition-colors">
                  All Technical Guides
                </Link>
              </li>
              <li>
                <Link href="/articles/new" className="hover:text-red-400 transition-colors">
                  Contribute an Article
                </Link>
              </li>
              <li>
                <Link href="/articles?category=Engines" className="hover:text-red-400 transition-colors">
                  Internal Combustion Engines
                </Link>
              </li>
              <li>
                <Link href="/articles?category=Turbos" className="hover:text-red-400 transition-colors">
                  Turbos & Forced Induction
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Tools */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-zinc-200 mb-3">
              Connect & Tools
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/connect" className="flex items-center gap-1.5 hover:text-red-400 transition-colors">
                  <MessageSquare className="h-3.5 w-3.5" />
                  Let&apos;s Connect & Discuss
                </Link>
              </li>
              <li>
                <Link href="/clock" className="flex items-center gap-1.5 hover:text-red-400 transition-colors">
                  <Clock className="h-3.5 w-3.5" />
                  Web Clock Tool
                </Link>
              </li>
              <li>
                <span className="flex items-center gap-1 text-xs text-zinc-400 mt-2">
                  <Cpu className="h-3.5 w-3.5" />
                  Hosted with 100% Free Vercel Infrastructure
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} RevPulse AutoTech. Built for car enthusiasts worldwide.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Powered by Next.js &amp; passionate gearheads <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
