"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Sparkle, UploadSimple, Scissors, Check, Star, Trophy } from "@phosphor-icons/react";
import Link from "next/link";

export default function AISuggestionPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(false);

  const handleUpload = () => {
    setAnalyzing(true);
    // Simulate AI API call
    setTimeout(() => {
      setAnalyzing(false);
      setResults(true);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-20 md:pb-8">
      {/* Header */}
      <div className="relative text-center mb-10">
        <div className="absolute inset-0 -top-4 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="relative animate-fadeInUp">
          <p className="text-accent text-xs font-bold uppercase tracking-widest mb-3">Personalized Styling</p>
          <h1 className="text-4xl md:text-5xl font-serif gold-text mb-4 flex items-center justify-center gap-3">
            <Sparkle weight="fill" /> AI Stylist
          </h1>
          <p className="text-textSecondary max-w-md mx-auto">Let our AI analyze your features to recommend the perfect look for your unique style.</p>
          <div className="gold-divider w-20 mx-auto mt-6 opacity-50" />
        </div>
      </div>

      {!analyzing && !results && (
        <Card 
          className="max-w-md mx-auto p-12 border-dashed border-2 border-accent/20 hover:border-accent/50 transition-all duration-500 text-center cursor-pointer group bg-accent/5 animate-fadeInUp shadow-gold/10" 
          onClick={handleUpload}
        >
          <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-accent group-hover:scale-110 group-hover:shadow-gold transition-all duration-500">
            <UploadSimple size={40} weight="duotone" />
          </div>
          <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">Upload Your Photo</h3>
          <p className="text-sm text-textSecondary leading-relaxed">Take a clear selfie showing your full face for the most accurate style analysis.</p>
          <input type="file" className="hidden" accept="image/*" />
          
          <div className="mt-8 flex items-center justify-center gap-4 text-[10px] text-textSecondary/60 uppercase tracking-widest">
            <span className="flex items-center gap-1"><Check size={12} weight="bold" /> Face Shape</span>
            <span className="flex items-center gap-1"><Check size={12} weight="bold" /> Hair Texture</span>
            <span className="flex items-center gap-1"><Check size={12} weight="bold" /> Skin Tone</span>
          </div>
        </Card>
      )}

      {analyzing && (
        <div className="max-w-md mx-auto text-center space-y-8 py-16 animate-fadeIn">
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 border-4 border-accent/10 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-4 border-2 border-accent/20 border-b-transparent rounded-full animate-spin-reverse" style={{ animationDuration: '3s' }}></div>
            <Sparkle size={48} weight="fill" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-accent animate-pulse" />
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold gold-text animate-pulse">Analyzing Features</h3>
            <p className="text-textSecondary text-sm max-w-[280px] mx-auto">Our AI is evaluating your facial structure to find the most flattering hairstyles...</p>
          </div>
          
          {/* Progress indicators */}
          <div className="flex flex-col gap-2 max-w-xs mx-auto">
            <div className="h-1 w-full bg-surface rounded-full overflow-hidden">
              <div className="h-full bg-accent animate-shimmer w-full"></div>
            </div>
          </div>
        </div>
      )}

      {results && (
        <div className="animate-fadeInUp">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">Your Perfect Matches</h2>
            <Button variant="ghost" size="sm" onClick={() => setResults(false)} className="text-xs">Try Another Photo</Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 stagger-children">
            {[
              { id: 1, name: "Textured Crop", match: "98%", img: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=400&auto=format&fit=crop", desc: "Highlights your jawline and bone structure." },
              { id: 2, name: "Classic Pompadour", match: "92%", img: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=400&auto=format&fit=crop", desc: "Adds volume and length to your face shape." },
              { id: 3, name: "Modern Fade", match: "85%", img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=400&auto=format&fit=crop", desc: "Clean lines for a professional, sharp look." },
            ].map((style) => (
              <Card key={style.id} className="overflow-hidden group hover:shadow-gold-lg transition-all duration-500 animate-fadeInUp opacity-0">
                <div className="relative h-56 overflow-hidden">
                  <Image 
                    src={style.img} 
                    alt={style.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute top-3 right-3 z-10">
                    <span className="text-[10px] font-bold text-success bg-success/20 border border-success/30 px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1 shadow-lg">
                      <Star size={10} weight="fill" /> {style.match} Match
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                </div>
                <div className="p-5 relative">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">{style.name}</h3>
                  <p className="text-xs text-textSecondary mb-5 leading-relaxed">{style.desc}</p>
                  <Link href="/book">
                    <Button className="w-full group-hover:shadow-gold transition-all duration-300 gap-2">
                      <Scissors size={18} /> Book This Look
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 grid md:grid-cols-2 gap-6 animate-fadeIn">
            <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <Star size={24} weight="duotone" />
              </div>
              <div>
                <p className="font-semibold">Standard Match</p>
                <p className="text-xs text-textSecondary">Chosen for your oval face shape.</p>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-gradient-to-r from-accent/20 to-accent/5 border border-accent/40 flex items-center justify-between group cursor-pointer hover:shadow-gold-lg transition-all duration-500">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary shadow-gold">
                  <Trophy size={24} weight="fill" />
                </div>
                <div>
                  <p className="font-bold text-accent">AI Stylist PRO</p>
                  <p className="text-[10px] text-textSecondary uppercase tracking-widest">3D Modeling • 50+ Styles</p>
                </div>
              </div>
              <Button size="sm" className="bg-accent text-primary text-[10px] h-8">Upgrade</Button>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Link href="/services">
              <Button variant="outline" size="sm">Explore All Styles</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
