"use client";

import Link from "next/link";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Scissors, Eyeglasses, Sparkle, Clock, Star, Trophy } from "@phosphor-icons/react/dist/ssr";

export default function ServicesPage() {
  const categories = [
    {
      name: "Haircuts & Styling",
      icon: Scissors,
      services: [
        { id: 1, name: "Classic Haircut", duration: "30 min", price: "₹499", desc: "Precision cut tailored to your face shape.", popular: true },
        { id: 2, name: "Restyle Haircut", duration: "45 min", price: "₹699", desc: "Complete transformation and restyling." },
        { id: 3, name: "Hair Color", duration: "60 min", price: "₹1299", desc: "Premium ammonia-free hair coloring." },
        { id: 8, name: "Executive Pro Cut", duration: "60 min", price: "₹1499", desc: "Premium haircut + head massage + style consultation.", pro: true },
      ]
    },
    {
      name: "Beard Grooming",
      icon: Eyeglasses,
      services: [
        { id: 4, name: "Beard Trim", duration: "20 min", price: "₹299", desc: "Shaping and trimming for a neat look." },
        { id: 5, name: "Hot Towel Shave", duration: "30 min", price: "₹399", desc: "Traditional straight razor shave with hot towel.", popular: true },
        { id: 9, name: "Royal Beard Pro", duration: "45 min", price: "₹799", desc: "Deep conditioning + shape + outline + oil treatment.", pro: true },
      ]
    },
    {
      name: "Spa & Facial",
      icon: Sparkle,
      services: [
        { id: 6, name: "Charcoal Facial", duration: "45 min", price: "₹899", desc: "Deep cleansing facial for clear skin." },
        { id: 7, name: "Head Massage", duration: "30 min", price: "₹499", desc: "Relaxing oil massage to relieve stress." },
        { id: 10, name: "Elite Spa Pro", duration: "90 min", price: "₹2499", desc: "Full facial + head massage + skin consultation.", pro: true },
      ]
    }
  ];

  const [activeFilter, setActiveFilter] = useState<string>("All");
  const filterOptions = ["All", ...categories.map(c => c.name)];

  const filteredCategories = activeFilter === "All" 
    ? categories 
    : categories.filter(c => c.name === activeFilter);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-20 md:pb-8">
      {/* Page Header */}
      <div className="relative mb-10 text-center">
        <div className="absolute inset-0 -top-4 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="relative animate-fadeInUp">
          <p className="text-accent text-xs font-bold uppercase tracking-widest mb-3">Premium Grooming</p>
          <h1 className="text-4xl md:text-5xl font-serif gold-text mb-4">Our Services</h1>
          <p className="text-textSecondary max-w-md mx-auto">Tailored experiences crafted by master barbers for the modern gentleman.</p>
          <div className="gold-divider w-20 mx-auto mt-6 opacity-50" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12 animate-fadeInUp" style={{animationDelay: "0.1s"}}>
        {filterOptions.map(option => (
          <button
            key={option}
            onClick={() => setActiveFilter(option)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === option 
                ? "bg-accent text-primary shadow-gold border-transparent" 
                : "bg-surface border border-white/10 text-textSecondary hover:text-accent hover:border-accent/50"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="space-y-14">
        {filteredCategories.map((cat, catIdx) => {
          const CatIcon = cat.icon;
          return (
            <section key={cat.name} className="animate-fadeInUp" style={{animationDelay: `${(catIdx * 0.1) + 0.2}s`}}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <CatIcon size={18} weight="duotone" />
                </div>
                <h2 className="text-2xl font-semibold">{cat.name}</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 stagger-children">
                {cat.services.map((service) => (
                  <Card key={service.id} className="p-5 flex flex-col justify-between group hover:shadow-gold transition-all duration-500 relative overflow-hidden animate-fadeInUp opacity-0" style={{animationFillMode: 'forwards'}}>
                    {/* Popular badge */}
                    {'popular' in service && service.popular && (
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-bold text-accent bg-accent/10 border border-accent/20 px-2 py-1 rounded-full flex items-center gap-1">
                          <Star size={10} weight="fill" /> Popular
                        </span>
                      </div>
                    )}
                    {/* Pro badge */}
                    {'pro' in service && service.pro && (
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-bold text-white bg-gradient-to-r from-accent-dark to-accent border border-accent/30 px-3 py-1 rounded-full flex items-center gap-1 shadow-gold-sm animate-pulse">
                          <Trophy size={10} weight="fill" /> PRO
                        </span>
                      </div>
                    )}
                    <div>
                      <div className="flex justify-between items-start mb-2 pr-20">
                        <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">{service.name}</h3>
                      </div>
                      <p className="text-sm text-textSecondary mb-4 leading-relaxed">{service.desc}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2 pt-3 border-t border-surface/50">
                      <div className="flex items-center gap-4">
                        <span className="text-accent font-bold text-lg">{service.price}</span>
                        <span className="text-xs text-textSecondary flex items-center gap-1">
                          <Clock size={12} /> {service.duration}
                        </span>
                      </div>
                      <Link href={`/book?service=${service.id}`}>
                        <Button variant="outline" size="sm" className="group-hover:bg-accent group-hover:text-primary transition-all">Book Now</Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
