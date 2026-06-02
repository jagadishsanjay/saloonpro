"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, CalendarCheck, User, ShieldCheck, ChatCircleText } from "@phosphor-icons/react";
import { clsx } from "clsx";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: House },
    { name: "Reviews", href: "/#reviews", icon: ChatCircleText },
    { name: "Book", href: "/book", icon: CalendarCheck },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-t border-accent/10 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300",
                isActive 
                  ? "text-accent scale-110" 
                  : "text-textSecondary hover:text-foreground"
              )}
            >
              <div className={clsx(
                "transition-all duration-300",
                isActive && "drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]"
              )}>
                <Icon size={22} weight={isActive ? "fill" : "regular"} />
              </div>
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
