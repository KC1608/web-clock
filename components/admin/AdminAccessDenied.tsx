"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AdminAccessDeniedProps {
  currentUser: User | null;
}

export default function AdminAccessDenied({ currentUser }: AdminAccessDeniedProps) {
  const [signingIn, setSigningIn] = useState(false);
  const supabase = createClient();

  const handleSignIn = async () => {
    try {
      setSigningIn(true);
      const redirectUrl = `${window.location.origin}/auth/callback?next=/admin`;
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: "offline",
            prompt: "select_account",
          },
        },
      });
    } catch (err) {
      console.error("Sign in failed:", err);
      setSigningIn(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full rounded-3xl border border-red-500/30 bg-zinc-900/80 p-8 text-center shadow-2xl shadow-red-950/40 relative overflow-hidden backdrop-blur-sm">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600" />

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-500 ring-8 ring-red-500/5 mb-6">
          <ShieldAlert className="h-8 w-8" />
        </div>

        <h1 className="text-2xl font-black text-white tracking-tight">
          Admin Access Required
        </h1>

        <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
          The database and content moderation portal is restricted to authorized platform administrators.
        </p>

        <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 text-xs">
          {currentUser ? (
            <div>
              <span className="text-zinc-500">Currently logged in as:</span>
              <p className="font-semibold text-zinc-200 mt-0.5 truncate">{currentUser.email}</p>
              <span className="inline-block mt-2 rounded bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-400 uppercase">
                Account Not In Admin Whitelist
              </span>
            </div>
          ) : (
            <div>
              <span className="text-zinc-500">Current status:</span>
              <p className="font-semibold text-zinc-300 mt-0.5">Not signed in</p>
            </div>
          )}
        </div>

        <div className="mt-8 space-y-3">
          <button
            type="button"
            onClick={handleSignIn}
            disabled={signingIn}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-950 hover:from-red-500 hover:to-amber-500 transition-all hover:scale-[1.02] disabled:opacity-60"
          >
            {signingIn ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Connecting with Google...
              </>
            ) : (
              <>
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#ffffff"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#ffffff"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#ffffff"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#ffffff"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Sign in with Admin Google Account
              </>
            )}
          </button>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-950/80 px-4 py-2.5 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
