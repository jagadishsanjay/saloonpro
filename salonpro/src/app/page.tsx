"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Sparkle, Scissors, UserFocus, Gift, Star, Clock, MapPin, Envelope, Phone, ChatCircleText, Quotes, WhatsappLogo } from "@phosphor-icons/react";

export default function Home() {
  const [newReview, setNewReview] = useState({ name: "", text: "", rating: 5 });
  const [reviews, setReviews] = useState([
    { name: "Arjun Reddy", rating: 5, text: "The best haircut I've ever had. The AI stylist recommended a fade that perfectly suits my face shape!", date: "2 days ago" },
    { name: "Sanjay Kumar", rating: 5, text: "Premium experience from start to finish. The booking process was so smooth, and the salon looks amazing.", date: "1 week ago" },
    { name: "Vikram Seth", rating: 4, text: "Great service and friendly staff. Highly recommend the beard grooming and spa package.", date: "3 days ago" },
  ]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.text) return;

    const reviewToAdd = {
      ...newReview,
      date: "Just now"
    };

    setReviews([reviewToAdd, ...reviews]);
    setNewReview({ name: "", text: "", rating: 5 });
    // Alert or small toast could go here
  };

  return (
    <div className="flex flex-col gap-0 pb-8">
      {/* Hero Section with Salon Background */}
      <section className="relative w-full min-h-[85vh] md:min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/images/salon-hero.png" 
            alt="Luxury Salon Interior" 
            fill
            priority
            className="object-cover"
          />
        </div>
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
        
        {/* Floating gold particles effect */}
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-accent/30 animate-float" style={{animationDelay: '0s'}} />
        <div className="absolute top-40 right-20 w-1.5 h-1.5 rounded-full bg-accent/20 animate-float" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-40 left-1/4 w-1 h-1 rounded-full bg-accent/40 animate-float" style={{animationDelay: '2s'}} />
        
        <div className="relative z-10 max-w-3xl space-y-8 mt-16 md:mt-0 animate-fadeInUp">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-5 py-2 mx-auto backdrop-blur-sm">
            <Star size={14} weight="fill" className="text-accent" />
            <span className="text-xs font-semibold text-accent tracking-widest uppercase">Premium Grooming Experience</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight text-white drop-shadow-lg leading-tight">
            Master Your{" "}
            <span className="gold-text italic">Style</span>
          </h1>
          <p className="text-base md:text-xl text-textSecondary max-w-xl mx-auto leading-relaxed">
            Experience luxury grooming with AI-powered style recommendations, seamless booking, and a rewards program crafted for the modern gentleman.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/book">
              <Button size="lg" className="w-full sm:w-auto shadow-gold-lg hover:shadow-gold-xl transition-shadow duration-300">
                Book Appointment
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Services
              </Button>
            </Link>
            <a href={`https://wa.me/919790923083?text=${encodeURIComponent("Hello SalonPro! I am interested in your grooming services. Could you please help me with more details?")}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 flex items-center justify-center gap-2">
                <WhatsappLogo size={20} weight="fill" />
                WhatsApp
              </Button>
            </a>
          </div>
          
          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-8 pt-4 text-textSecondary/60">
            <div className="flex items-center gap-2 text-xs">
              <Star size={12} weight="fill" className="text-accent" />
              <span>4.9 Rating</span>
            </div>
            <div className="w-px h-4 bg-textSecondary/20" />
            <div className="flex items-center gap-2 text-xs">
              <Clock size={12} className="text-accent" />
              <span>10AM - 8PM</span>
            </div>
            <div className="w-px h-4 bg-textSecondary/20" />
            <div className="flex items-center gap-2 text-xs">
              <MapPin size={12} className="text-accent" />
              <span>Premium Location</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fadeIn" style={{animationDelay: '1.5s'}}>
          <span className="text-textSecondary/40 text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-accent/50 to-transparent" />
        </div>
      </section>

      {/* Signature Services */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto w-full py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-accent text-xs font-bold uppercase tracking-widest mb-2">What We Offer</p>
            <h2 className="text-3xl md:text-4xl">Signature Services</h2>
          </div>
          <Link href="/services" className="text-accent text-sm hover:underline underline-offset-4 transition-all">View All →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 stagger-children">
          {[
            { name: "Haircut & Styling", icon: Scissors, price: "From ₹499", desc: "Precision cuts tailored to your face shape" },
            { name: "Beard Grooming", icon: UserFocus, price: "From ₹299", desc: "Expert shaping and hot towel shaves" },
            { name: "Premium Spa", icon: Sparkle, price: "From ₹999", desc: "Rejuvenating facials and head massages" },
          ].map((service) => {
            const Icon = service.icon;
            return (
              <Link href="/services" key={service.name}>
                <Card className="p-8 flex flex-col items-center justify-center gap-5 group cursor-pointer animate-fadeInUp opacity-0 hover:shadow-gold transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer" />
                  <div className="relative z-10 flex flex-col items-center gap-5">
                    <div className="h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 group-hover:shadow-gold transition-all duration-500 rotate-3 group-hover:rotate-0">
                      <Icon size={32} weight="duotone" />
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
                      <p className="text-xs text-textSecondary mb-3">{service.desc}</p>
                      <p className="text-accent font-bold text-sm">{service.price}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Salon Tools Image Divider */}
      <section className="relative w-full h-48 md:h-64 overflow-hidden">
        <Image 
          src="/images/salon-tools.png" 
          alt="Barber Tools" 
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-background" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="gold-divider w-32" />
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="px-4 md:px-8 max-w-7xl mx-auto w-full py-20">
        <div className="text-center mb-16">
          <p className="text-accent text-xs font-bold uppercase tracking-widest mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-serif gold-text mb-4">Customer Stories</h2>
          <div className="gold-divider w-20 mx-auto opacity-50" />
        </div>

        <div className="grid lg:grid-cols-3 gap-10 items-start">
          {/* Testimonials List */}
          <div className="lg:col-span-2 space-y-8 stagger-children">
            {reviews.map((review, idx) => (
              <Card key={idx} className="p-8 group hover:shadow-gold transition-all duration-500 animate-fadeInUp opacity-0 relative">
                <Quotes size={48} weight="fill" className="absolute -top-4 -left-4 text-accent/10 group-hover:text-accent/20 transition-colors" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} weight="fill" className={i < review.rating ? "text-accent" : "text-textSecondary/20"} />
                  ))}
                </div>
                <p className="text-base text-textSecondary italic leading-relaxed mb-6">&quot;{review.text}&quot;</p>
                <div className="flex items-center justify-between border-t border-accent/5 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent text-sm font-bold border border-accent/20">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{review.name}</p>
                      <p className="text-[10px] text-textSecondary/60 uppercase tracking-widest">{review.date}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Feedback Form Card - Directly Visible */}
          <div className="lg:sticky lg:top-24">
            <Card className="p-8 border-accent/30 bg-accent/5 hover:border-accent/50 transition-all duration-500 animate-fadeInRight">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-accent/10 rounded-lg text-accent">
                  <ChatCircleText size={24} weight="duotone" />
                </div>
                <h3 className="text-xl font-serif gold-text">Leave a Review</h3>
              </div>
              
              <form onSubmit={handleSubmitReview} className="space-y-5">
                <div className="flex justify-center gap-2 p-3 bg-black/20 rounded-xl border border-accent/5 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className={`transition-all hover:scale-110 ${newReview.rating >= star ? 'text-accent' : 'text-textSecondary/20'}`}
                    >
                      <Star size={28} weight={newReview.rating >= star ? "fill" : "duotone"} />
                    </button>
                  ))}
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] text-textSecondary uppercase tracking-widest ml-1">Your Name</label>
                  <input 
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full bg-black/40 border border-accent/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent/40 focus:bg-black/60 transition-all text-sm" 
                    placeholder="e.g. John Doe" 
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] text-textSecondary uppercase tracking-widest ml-1">Your Experience</label>
                  <textarea 
                    rows={4} 
                    required
                    value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                    className="w-full bg-black/40 border border-accent/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent/40 focus:bg-black/60 transition-all resize-none text-sm" 
                    placeholder="How was your service?"
                  ></textarea>
                </div>
                
                <Button type="submit" className="w-full shadow-gold hover:shadow-gold-lg mt-2">
                  Post Review
                </Button>
                
                <p className="text-[10px] text-center text-textSecondary/40 italic">
                  Your feedback helps us maintain our luxury standards.
                </p>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Style Teaser */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto w-full py-16">
        <Card className="p-0 border-accent/20 bg-gradient-to-br from-surface via-surface to-accent/5 relative overflow-hidden group hover:shadow-gold-lg transition-all duration-500">
          <div className="absolute -right-20 -top-20 text-accent/5 group-hover:text-accent/10 transition-colors duration-700">
            <Sparkle size={240} weight="fill" />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          <div className="p-8 md:p-12 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-lg">
              <div className="inline-flex items-center gap-2 mb-4 text-accent bg-accent/10 rounded-full px-4 py-1.5">
                <Sparkle weight="fill" size={14} />
                <span className="text-[11px] font-bold uppercase tracking-wider">AI-Powered</span>
              </div>
              <h2 className="text-3xl md:text-4xl mb-3">Not sure what suits you?</h2>
              <p className="text-textSecondary text-sm md:text-base leading-relaxed">
                Upload a photo and let our AI analyze your face shape, skin tone, and features to recommend the perfect hairstyle — personalized just for you.
              </p>
            </div>
            <Link href="/ai-suggestion">
              <Button variant="primary" size="lg" className="shadow-gold hover:shadow-gold-lg whitespace-nowrap">
                ✨ Try AI Styling
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Loyalty Banner */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto w-full pb-16">
        <Link href="/loyalty">
          <Card className="p-5 flex items-center gap-5 hover:shadow-gold group transition-all duration-500 animate-borderGlow">
            <div className="h-14 w-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-all duration-300">
              <Gift size={28} weight="duotone" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base">Loyalty Rewards Program</h3>
              <p className="text-xs text-textSecondary mt-0.5">Earn gold points on every visit • Unlock premium rewards</p>
            </div>
            <div className="text-accent font-semibold text-sm flex items-center gap-1">
              Join Now
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </div>
          </Card>
        </Link>
      </section>

      {/* Contact CTA Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto w-full pb-16">
        <div className="grid md:grid-cols-2 gap-6 stagger-children">
          <Card className="p-8 border-accent/10 bg-accent/5 hover:shadow-gold transition-all duration-500 animate-fadeInUp">
            <h2 className="text-2xl font-serif gold-text mb-4">Visit Our Studio</h2>
            <p className="text-sm text-textSecondary mb-6">Experience the finest grooming services in Manivakkam. Our master barbers are ready to redefine your style.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-accent" />
                <span className="text-sm">Manivakkam, Chennai</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-accent" />
                <span className="text-sm">10:00 AM - 08:00 PM</span>
              </div>
            </div>
            <Link href="/contact" className="mt-8 block">
              <Button variant="outline" className="w-full">Get Directions</Button>
            </Link>
          </Card>

          <Card className="p-8 border-accent/10 bg-surface/40 hover:shadow-gold transition-all duration-500 animate-fadeInUp">
            <h2 className="text-2xl font-serif gold-text mb-4">Contact Directly</h2>
            <p className="text-sm text-textSecondary mb-6">Have questions? Reach out to us via phone or email. We&apos;re happy to help you with your grooming needs.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-accent" />
                <span className="text-sm">+91 9790923083</span>
              </div>
              <div className="flex items-center gap-3">
                <Envelope size={18} className="text-accent" />
                <span className="text-sm">jagadishsanjay74@gmail.com</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a href="tel:9790923083" className="flex-1">
                <Button variant="primary" className="w-full shadow-gold">Call Now</Button>
              </a>
              <a href={`https://wa.me/919790923083?text=${encodeURIComponent("Hello SalonPro! I am interested in your grooming services. Could you please help me with more details?")}`} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10">WhatsApp</Button>
              </a>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
