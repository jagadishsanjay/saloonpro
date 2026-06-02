"use client";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CalendarCheck, CurrencyDollar, ChartBar, Check, Clock } from "@phosphor-icons/react";

export default function BarberDashboard() {
  const appointments = [
    { id: 1, time: "10:00 AM", customer: "John Doe", service: "Classic Haircut", price: "₹499", status: "completed" },
    { id: 2, time: "11:30 AM", customer: "Michael Smith", service: "Beard Trim", price: "₹299", status: "pending" },
    { id: 3, time: "02:00 PM", customer: "David Wilson", service: "Premium Spa", price: "₹999", status: "pending" },
    { id: 4, time: "04:00 PM", customer: "James Brown", service: "Hair Color", price: "₹1299", status: "pending" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-20 md:pb-8">
      {/* Header with background */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        <div className="absolute inset-0">
          <Image 
            src="/images/salon-hero.png" 
            alt="Dashboard Header" 
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70" />
        </div>
        <div className="relative z-10 p-8 md:p-10 animate-fadeInUp">
          <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">Dashboard</p>
          <h1 className="text-3xl md:text-4xl font-serif gold-text mb-1">Hello, Raj! 👋</h1>
          <p className="text-textSecondary text-sm">Here&apos;s your schedule for today.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-5 mb-10 stagger-children">
        <Card className="p-6 group hover:shadow-gold transition-all duration-300 animate-fadeInUp opacity-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-all">
              <CurrencyDollar size={24} weight="duotone" />
            </div>
            <div>
              <h3 className="text-textSecondary text-xs mb-1 uppercase tracking-wider">Today&apos;s Earnings</h3>
              <p className="text-3xl font-bold gold-text">₹1,498</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 group hover:shadow-gold transition-all duration-300 animate-fadeInUp opacity-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-all">
              <CalendarCheck size={24} weight="duotone" />
            </div>
            <div>
              <h3 className="text-textSecondary text-xs mb-1 uppercase tracking-wider">Appointments</h3>
              <p className="text-3xl font-bold">{appointments.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6 group hover:shadow-gold transition-all duration-300 animate-fadeInUp opacity-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center text-success group-hover:bg-success/20 transition-all">
              <ChartBar size={24} weight="duotone" />
            </div>
            <div>
              <h3 className="text-textSecondary text-xs mb-1 uppercase tracking-wider">Completion</h3>
              <p className="text-3xl font-bold text-success">25%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Schedule */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Clock size={20} className="text-accent" weight="duotone" /> Today&apos;s Schedule
        </h2>
        <span className="text-accent text-xs font-medium bg-accent/10 px-3 py-1 rounded-full">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </span>
      </div>
      
      <div className="space-y-4 stagger-children">
        {appointments.map((apt) => (
          <Card key={apt.id} className="p-5 flex items-center justify-between group hover:shadow-gold transition-all duration-300 animate-fadeInUp opacity-0">
            <div className="flex items-center gap-5">
              {/* Time badge */}
              <div className="text-center min-w-[70px]">
                <p className="text-lg font-bold text-accent">{apt.time.split(' ')[0]}</p>
                <p className="text-[10px] text-textSecondary uppercase">{apt.time.split(' ')[1]}</p>
              </div>
              {/* Divider */}
              <div className="w-px h-10 bg-surface" />
              {/* Details */}
              <div>
                <p className="font-semibold">{apt.customer}</p>
                <p className="text-sm text-textSecondary">{apt.service} • <span className="text-accent">{apt.price}</span></p>
              </div>
            </div>
            <div>
              {apt.status === "completed" ? (
                <span className="text-success text-xs font-semibold bg-success/10 px-4 py-2 rounded-full flex items-center gap-1">
                  <Check size={12} weight="bold" /> Completed
                </span>
              ) : (
                <Button size="sm" className="shadow-gold hover:shadow-gold-lg transition-shadow">Mark Done</Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
