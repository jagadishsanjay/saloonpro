"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { Scissors } from "@phosphor-icons/react";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured || !supabase) {
      // Demo mode
      setSuccess(true);
      setLoading(false);
      return;
    }
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[85vh] px-4">
        <Card className="w-full max-w-md p-10 text-center space-y-5 shadow-gold-lg border-accent/10 animate-scaleIn">
          <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto text-success text-2xl">
            ✓
          </div>
          <h2 className="text-2xl text-success font-serif">Account Created!</h2>
          <p className="text-textSecondary text-sm">
            {isSupabaseConfigured 
              ? "Please check your email to verify your account before logging in."
              : "Demo mode — you can now log in to explore the app."
            }
          </p>
          <Link href="/login">
            <Button className="mt-4 shadow-gold">Go to Login</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 relative">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-56 h-56 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/3 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fadeInUp">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-5 shadow-gold">
            <Scissors size={28} className="text-accent" weight="bold" />
          </div>
          <h1 className="text-4xl font-serif gold-text mb-2">Create Account</h1>
          <p className="text-textSecondary text-sm">Join SalonPro for premium grooming services.</p>
        </div>

        <Card className="p-7 md:p-9 shadow-gold-lg border-accent/10">
          <form onSubmit={handleSignup} className="space-y-6">
            {error && (
              <div className="p-3 bg-error/10 border border-error/30 rounded-lg text-error text-sm text-center animate-scaleIn">
                {error}
              </div>
            )}

            {!isSupabaseConfigured && (
              <div className="p-3 bg-accent/5 border border-accent/20 rounded-lg text-accent text-xs text-center">
                🎭 Demo Mode — Registration is simulated
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="text-xs text-textSecondary font-medium uppercase tracking-wider mb-2 block">Full Name</label>
                <Input 
                  type="text" 
                  placeholder="Enter your full name" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required 
                />
              </div>
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
                  placeholder="Min 6 characters" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  minLength={6}
                />
              </div>
            </div>

            <Button type="submit" className="w-full shadow-gold hover:shadow-gold-lg transition-shadow" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-7 text-center text-sm text-textSecondary">
            Already have an account?{" "}
            <Link href="/login" className="text-accent hover:underline font-semibold underline-offset-2">
              Sign In
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
