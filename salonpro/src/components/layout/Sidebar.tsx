"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, List, CalendarCheck, Image, User, Scissors, Sparkle, Phone, ShieldCheck, ChatCircleText } from "@phosphor-icons/react";
import { clsx } from "clsx";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: House },
    { name: "Services", href: "/services", icon: List },
    { name: "Book Now", href: "/book", icon: CalendarCheck },
    { name: "Gallery", href: "/gallery", icon: Image },
    { name: "AI Stylist", href: "/ai-suggestion", icon: Sparkle },
    { name: "Reviews", href: "/#reviews", icon: ChatCircleText },
    { name: "Contact", href: "/contact", icon: Phone },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed top-0 left-0 bg-black/60 backdrop-blur-xl border-r border-accent/10 z-40">
      {/* Logo */}
      <div className="p-6 pt-8">
        <a 
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/';
          }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center group-hover:shadow-gold transition-all duration-300">
            <Scissors size={20} className="text-accent" weight="bold" />
          </div>
          <div>
            <span className="text-xl font-serif font-bold gold-text tracking-wider">
              SalonPro
            </span>
            <p className="text-[10px] text-textSecondary tracking-widest uppercase">Premium Grooming</p>
          </div>
        </a>
      </div>

      {/* Gold divider */}
      <div className="mx-6 gold-divider opacity-30" />
      
      <nav className="flex-1 px-4 space-y-1 mt-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group",
                isActive 
                  ? "bg-accent/10 text-accent font-semibold shadow-gold border border-accent/20" 
                  : "text-textSecondary hover:text-foreground hover:bg-surface-light/50 border border-transparent"
              )}
            >
              <Icon size={20} weight={isActive ? "fill" : "regular"} className={clsx(
                "transition-all duration-300",
                isActive && "drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]"
              )} />
              <span className="text-sm">{item.name}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-accent/10">
        <div className="text-[10px] text-textSecondary/50 text-center tracking-wider uppercase">
          &copy; {new Date().getFullYear()} SalonPro<br />
          Luxury Grooming Experience
        </div>
      </div>
    </aside>
  );
}
