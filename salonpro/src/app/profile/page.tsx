"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { CalendarCheck, Gift, Clock, Scissors, Star, SignOut } from "@phosphor-icons/react";

interface UserProfile {
  email: string;
  name: string;
  initials: string;
  memberSince: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      if (isSupabaseConfigured && supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser({
            email: session.user.email || "",
            name: session.user.user_metadata?.full_name || "Guest",
            initials: (session.user.user_metadata?.full_name || "G").charAt(0).toUpperCase(),
            memberSince: new Date(session.user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          });
        } else {
          // Demo mode
          setUser({
            email: "guest@salonpro.com",
            name: "Guest User",
            initials: "G",
            memberSince: "May 2026",
          });
        }
      } else {
        // Supabase not configured — show demo profile
        setUser({
          email: "guest@salonpro.com",
          name: "Guest User",
          initials: "G",
          memberSince: "May 2026",
        });
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    router.push("/login");
  };

  const recentBookings = [
    { id: 1, service: "Classic Haircut", barber: "Raj", date: "2026-05-01", time: "10:00 AM", status: "completed", price: "₹499" },
    { id: 2, service: "Premium Spa", barber: "Amit", date: "2026-04-20", time: "02:00 PM", status: "completed", price: "₹999" },
    { id: 3, service: "Beard Trim", barber: "Vikram", date: "2026-04-10", time: "11:30 AM", status: "completed", price: "₹299" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-textSecondary text-sm">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-20 md:pb-8 space-y-8">
      {/* Hero header with background */}
      <div className="relative rounded-2xl overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/salon-tools.png" 
            alt="Barber Tools" 
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70" />
        </div>
        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 animate-fadeInUp">
          {/* Avatar */}
          <div className="relative">
            <div className="w-28 h-28 rounded-2xl bg-surface border-2 border-accent/30 flex items-center justify-center text-4xl font-serif text-accent shadow-gold animate-goldPulse">
              {user?.initials}
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-background flex items-center justify-center">
              <span className="text-[8px] text-white">✓</span>
            </div>
          </div>
          
          {/* User info */}
          <div className="text-center md:text-left flex-1 space-y-2">
            <h1 className="text-3xl md:text-4xl font-serif gold-text">{user?.name}</h1>
            <p className="text-textSecondary text-sm">{user?.email}</p>
            <div className="flex items-center gap-4 justify-center md:justify-start pt-1">
              <span className="text-xs text-textSecondary/60 flex items-center gap-1">
                <Star size={12} weight="fill" className="text-accent" /> Gold Member
              </span>
              <span className="text-xs text-textSecondary/60">Since {user?.memberSince}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
              <SignOut size={16} /> Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 stagger-children">
        <Card className="p-5 text-center animate-fadeInUp opacity-0 hover:shadow-gold transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
            <CalendarCheck size={20} className="text-accent" weight="duotone" />
          </div>
          <p className="text-2xl font-bold text-accent">12</p>
          <p className="text-[11px] text-textSecondary mt-1">Total Visits</p>
        </Card>
        <Card className="p-5 text-center animate-fadeInUp opacity-0 hover:shadow-gold transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
            <Gift size={20} className="text-accent" weight="duotone" />
          </div>
          <p className="text-2xl font-bold text-accent">450</p>
          <p className="text-[11px] text-textSecondary mt-1">Gold Points</p>
        </Card>
        <Card className="p-5 text-center animate-fadeInUp opacity-0 hover:shadow-gold transition-all duration-300">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
            <Clock size={20} className="text-accent" weight="duotone" />
          </div>
          <p className="text-2xl font-bold text-accent">8h</p>
          <p className="text-[11px] text-textSecondary mt-1">Total Hours</p>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/book">
          <Card className="p-5 flex items-center gap-4 group hover:shadow-gold cursor-pointer transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-all">
              <Scissors size={20} weight="duotone" />
            </div>
            <div>
              <p className="font-semibold text-sm">Book Now</p>
              <p className="text-[11px] text-textSecondary">Schedule a visit</p>
            </div>
          </Card>
        </Link>
        <Link href="/loyalty">
          <Card className="p-5 flex items-center gap-4 group hover:shadow-gold cursor-pointer transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-all">
              <Gift size={20} weight="duotone" />
            </div>
            <div>
              <p className="font-semibold text-sm">Rewards</p>
              <p className="text-[11px] text-textSecondary">View your points</p>
            </div>
          </Card>
        </Link>
      </div>

      {/* Recent Bookings */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">Recent Bookings</h2>
          <span className="text-accent text-xs font-medium cursor-pointer hover:underline">View All</span>
        </div>
        <div className="space-y-3 stagger-children">
          {recentBookings.map((booking) => (
            <Card key={booking.id} className="p-4 flex items-center justify-between group hover:shadow-gold transition-all duration-300 animate-fadeInUp opacity-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface-light flex items-center justify-center text-accent">
                  <Scissors size={18} weight="duotone" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{booking.service}</p>
                  <p className="text-[11px] text-textSecondary">{booking.date} • {booking.time} • {booking.barber}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-accent font-bold text-sm">{booking.price}</p>
                <span className="text-success text-[10px] font-semibold bg-success/10 px-2 py-0.5 rounded-full">
                  {booking.status === "completed" ? "✓ Done" : booking.status}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
