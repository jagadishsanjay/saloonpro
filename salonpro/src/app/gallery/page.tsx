"use client";
import { useState } from "react";
import Image from "next/image";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { WhatsappLogo } from "@phosphor-icons/react";

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<{src: string, label: string} | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const images = [
    { src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop", label: "Classic Cut", category: "Haircut" },
    { src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop", label: "Beard Styling", category: "Beard" },
    { src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop", label: "Modern Fade", category: "Haircut" },
    { src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop", label: "Textured Crop", category: "Haircut" },
    { src: "https://images.unsplash.com/photo-1582095133179-bfd08e2f1084?q=80&w=800&auto=format&fit=crop", label: "Premium Spa", category: "Spa" },
    { src: "https://images.unsplash.com/photo-1593702288056-bbdf5cb06385?q=80&w=800&auto=format&fit=crop", label: "Hot Shave", category: "Beard" },
    { src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop", label: "Pompadour", category: "Haircut" },
    { src: "https://images.unsplash.com/photo-1532710093739-9470ac1d4e5b?q=80&w=800&auto=format&fit=crop", label: "Skin Fade", category: "Haircut" },
    { src: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=800&auto=format&fit=crop", label: "Facial Treatment", category: "Spa" },
    { src: "https://images.unsplash.com/photo-1512496015851-a1cbfc3a2a0ff?q=80&w=800&auto=format&fit=crop", label: "Beard Trim & Shape", category: "Beard" },
    { src: "https://images.unsplash.com/photo-1593980315359-33512217c9b3?q=80&w=800&auto=format&fit=crop", label: "Buzz Cut", category: "Haircut" },
    { src: "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?q=80&w=800&auto=format&fit=crop", label: "Scalp Massage", category: "Spa" },
    { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop", label: "Gentleman's Cut", category: "Haircut" },
    { src: "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?q=80&w=800&auto=format&fit=crop", label: "Viking Beard", category: "Beard" },
    { src: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=800&auto=format&fit=crop", label: "Luxury Styling", category: "Haircut" },
    { src: "https://images.unsplash.com/photo-1493106819501-66d381c466f1?q=80&w=800&auto=format&fit=crop", label: "Sharp Fade", category: "Haircut" },
    { src: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop", label: "Executive Look", category: "Haircut" },
    { src: "https://images.unsplash.com/photo-1513258496099-48168024adb0?q=80&w=800&auto=format&fit=crop", label: "Beard Oil Therapy", category: "Beard" },
  ];

  const filters = ["All", "Haircut", "Beard", "Spa"];
  
  const filteredImages = activeFilter === "All" 
    ? images 
    : images.filter(img => img.category === activeFilter);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pb-20 md:pb-8">
      {/* Header */}
      <div className="relative mb-10 text-center">
        <div className="absolute inset-0 -top-4 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="relative animate-fadeInUp">
          <p className="text-accent text-xs font-bold uppercase tracking-widest mb-3">Our Work</p>
          <h1 className="text-4xl md:text-5xl font-serif gold-text mb-4">Gallery</h1>
          <p className="text-textSecondary max-w-md mx-auto">Discover the artistry and craftsmanship of our master barbers.</p>
          <div className="gold-divider w-20 mx-auto mt-6 opacity-50" />
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex justify-center gap-3 mb-10 animate-fadeIn">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
              activeFilter === filter
                ? "bg-accent text-primary border-accent shadow-gold"
                : "bg-transparent text-textSecondary border-surface hover:border-accent/50 hover:text-foreground"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-5 space-y-5 stagger-children">
        {filteredImages.map((img, idx) => (
          <div 
            key={`${img.src}-${idx}`} 
            className="relative break-inside-avoid overflow-hidden rounded-xl cursor-pointer group animate-fadeInUp opacity-0"
            style={{animationFillMode: 'forwards', animationDelay: `${idx * 0.05}s`}}
            onClick={() => setSelectedImage(img)}
          >
            <div className="relative w-full aspect-[4/5]">
              <Image 
                src={img.src} 
                alt={img.label}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end pb-6">
              <span className="text-accent text-sm font-semibold mb-2">{img.label}</span>
              <span className="text-white/80 border border-white/30 px-5 py-2 rounded-full text-xs backdrop-blur-sm hover:bg-white/10 transition-colors">
                View Full
              </span>
            </div>
            {/* Gold corner accent */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/0 group-hover:border-accent/50 transition-all duration-500 rounded-tl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent/0 group-hover:border-accent/50 transition-all duration-500 rounded-br-xl" />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)}>
        {selectedImage && (
          <div className="flex flex-col gap-4">
            <div className="relative w-full max-w-lg aspect-[3/4] mx-auto rounded-lg overflow-hidden">
              <Image 
                src={selectedImage.src} 
                alt={selectedImage.label} 
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-serif gold-text text-center">{selectedImage.label}</h3>
              <a 
                href={`https://wa.me/919790923083?text=${encodeURIComponent(`Hello SalonPro! I am interested in this style: ${selectedImage.label}. Could you please help me with more details?`)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full bg-[#25D366] hover:bg-[#25D366]/90 border-none flex items-center justify-center gap-2">
                  <WhatsappLogo size={20} weight="fill" />
                  Inquiry on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
