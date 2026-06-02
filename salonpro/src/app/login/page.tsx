"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { Scissors, GoogleLogo } from "@phosphor-icons/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured || !supabase) {
      // Demo mode — just redirect
      router.push("/profile");
      return;
    }
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/profile");
      router.refresh();
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setError("Supabase not configured. Please add your project credentials to .env.local");
      return;
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) setError(error.message);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 relative">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fadeInUp">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-5 shadow-gold">
            <Scissors size={28} className="text-accent" weight="bold" />
          </div>
          <h1 className="text-4xl font-serif gold-text mb-2">Welcome Back</h1>
          <p className="text-textSecondary text-sm">Sign in to book appointments and track loyalty rewards.</p>
        </div>

        <Card className="p-7 md:p-9 shadow-gold-lg border-accent/10">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-3 bg-error/10 border border-error/30 rounded-lg text-error text-sm text-center animate-scaleIn">
                {error}
              </div>
            )}

            {!isSupabaseConfigured && (
              <div className="p-3 bg-accent/5 border border-accent/20 rounded-lg text-accent text-xs text-center">
                🎭 Demo Mode — Any credentials will work
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="text-xs text-textSecondary font-medium uppercase tracking-wider mb-2 block">Email</label>
                <Input 
                  type="email" 
                  placeholder="you@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div>
                <label className="text-xs text-textSecondary font-medium uppercase tracking-wider mb-2 block">Password</label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            <Button type="submit" className="w-full shadow-gold hover:shadow-gold-lg transition-shadow" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-7 flex items-center justify-center space-x-4">
            <div className="flex-1 gold-divider opacity-20" />
            <span className="text-textSecondary text-xs uppercase tracking-wider">or</span>
            <div className="flex-1 gold-divider opacity-20" />
          </div>

          <div className="mt-6">
            <Button variant="outline" className="w-full gap-2" onClick={handleGoogleLogin}>
              <GoogleLogo size={18} weight="bold" />
              Continue with Google
            </Button>
          </div>

          <p className="mt-7 text-center text-sm text-textSecondary">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-accent hover:underline font-semibold underline-offset-2">
              Create Account
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
