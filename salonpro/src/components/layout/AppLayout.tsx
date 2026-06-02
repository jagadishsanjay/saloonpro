import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { Sidebar } from "./Sidebar";
import { WhatsAppButton } from "../ui/WhatsAppButton";

interface LayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background page-pattern">
      <Sidebar />
      <main className="md:ml-64 pb-16 md:pb-0 min-h-screen relative z-10">
        {children}
      </main>
      <WhatsAppButton />
      <BottomNav />
    </div>
  );
}
