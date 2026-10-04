"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import { LogOut, ShieldCheck, Loader2 } from "lucide-react";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignInWithGoogle = async () => {
    try {
      setSigningIn(true);
      const redirectUrl = `${window.location.origin}/auth/callback?next=${encodeURIComponent(
        window.location.pathname
      )}`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        alert("Google sign-in error: " + error.message);
        setSigningIn(false);
      }
    } catch (err: unknown) {
      console.error("Sign in failed:", err);
      setSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
    } catch (err) {
      console.error("Sign out error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-400">
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      </div>
    );
  }

  if (user) {
    const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture;
    const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User";

    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 rounded-lg bg-zinc-900 border border-zinc-800 px-2.5 py-1 text-xs">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt={displayName}
              className="h-5 w-5 rounded-full object-cover ring-1 ring-emerald-500/50"
            />
          ) : (
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="font-semibold text-zinc-200 max-w-[100px] sm:max-w-[130px] truncate">
            {displayName}
          </span>
          <span
            title="Verified Google Account (Bot Protected)"
            className="flex items-center text-emerald-400"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
          </span>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          title="Sign out"
          className="rounded-lg border border-zinc-800 bg-zinc-900 p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="sr-only">Sign out</span>
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleSignInWithGoogle}
      disabled={signingIn}
      className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/90 px-3.5 py-1.5 text-xs font-semibold text-zinc-200 shadow-sm hover:bg-zinc-800 hover:text-white hover:border-zinc-500 transition-all disabled:opacity-60"
    >
      {signingIn ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          {/* Official Google G Logo SVG */}
          <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Sign in with Google
        </>
      )}
    </button>
  );
}
