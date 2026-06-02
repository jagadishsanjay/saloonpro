"use client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Phone, Envelope, MapPin, GoogleLogo, Clock, InstagramLogo, FacebookLogo } from "@phosphor-icons/react";
import Image from "next/image";

export default function ContactPage() {
  const phone = "9790923083";
  const email = "jagadishsanjay74@gmail.com";
  const location = "Manivakkam, Chennai";
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Manivakkam+Chennai";

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-20 md:pb-8">
      {/* Header */}
      <div className="relative text-center mb-12">
        <div className="absolute inset-0 -top-4 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="relative animate-fadeInUp">
          <p className="text-accent text-xs font-bold uppercase tracking-widest mb-3">Get In Touch</p>
          <h1 className="text-4xl md:text-5xl font-serif gold-text mb-4">Contact Us</h1>
          <p className="text-textSecondary max-w-md mx-auto">We&apos;re here to provide you with the ultimate grooming experience.</p>
          <div className="gold-divider w-20 mx-auto mt-6 opacity-50" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 animate-fadeInUp">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <Card className="p-6 flex items-center gap-5 group hover:shadow-gold transition-all duration-500">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-all">
              <Phone size={24} weight="duotone" />
            </div>
            <div>
              <p className="text-xs text-textSecondary uppercase tracking-widest mb-1">Phone</p>
              <a href={`tel:${phone}`} className="text-lg font-semibold hover:text-accent transition-colors">+91 {phone}</a>
            </div>
          </Card>

          <Card className="p-6 flex items-center gap-5 group hover:shadow-gold transition-all duration-500">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-all">
              <Envelope size={24} weight="duotone" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs text-textSecondary uppercase tracking-widest mb-1">Email</p>
              <a href={`mailto:${email}`} className="text-lg font-semibold hover:text-accent transition-colors truncate block">{email}</a>
            </div>
          </Card>

          <Card className="p-6 flex items-center gap-5 group hover:shadow-gold transition-all duration-500">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-all">
              <MapPin size={24} weight="duotone" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-textSecondary uppercase tracking-widest mb-1">Location</p>
              <p className="text-lg font-semibold mb-3">{location}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => window.open(googleMapsUrl, '_blank')}
              >
                <GoogleLogo size={16} /> Open in Maps
              </Button>
            </div>
          </Card>

          <Card className="p-6 flex items-center gap-5 group">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
              <Clock size={24} weight="duotone" />
            </div>
            <div>
              <p className="text-xs text-textSecondary uppercase tracking-widest mb-1">Opening Hours</p>
              <p className="text-sm font-semibold">Mon - Sun: 10:00 AM - 08:00 PM</p>
            </div>
          </Card>
        </div>

        {/* Quick Message Form */}
        <Card className="p-8 border-accent/20 bg-gradient-to-br from-surface to-accent/5">
          <h2 className="text-2xl font-serif gold-text mb-6">Send a Message</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-xs text-textSecondary uppercase tracking-widest">Name</label>
              <input type="text" className="w-full bg-black/30 border border-accent/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent/50 transition-all" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-textSecondary uppercase tracking-widest">Email</label>
              <input type="email" className="w-full bg-black/30 border border-accent/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent/50 transition-all" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-textSecondary uppercase tracking-widest">Message</label>
              <textarea rows={4} className="w-full bg-black/30 border border-accent/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent/50 transition-all resize-none" placeholder="How can we help?"></textarea>
            </div>
            <Button className="w-full shadow-gold hover:shadow-gold-lg mt-4">Send Message</Button>
          </form>

          <div className="mt-8 pt-8 border-t border-accent/10 flex justify-center gap-6">
            <a href="#" className="text-textSecondary hover:text-accent transition-colors"><InstagramLogo size={24} /></a>
            <a href="#" className="text-textSecondary hover:text-accent transition-colors"><FacebookLogo size={24} /></a>
          </div>
        </Card>
      </div>

      {/* Map Preview Placeholder */}
      <div className="mt-12 rounded-3xl overflow-hidden h-64 relative group border border-accent/20 animate-fadeInUp shadow-gold/10">
        <Image 
          src="/images/salon-hero.png" 
          alt="Location Map Preview" 
          fill
          className="object-cover opacity-30 grayscale group-hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Button 
            variant="primary" 
            className="shadow-gold-lg px-8"
            onClick={() => window.open(googleMapsUrl, '_blank')}
          >
            <MapPin size={20} className="mr-2" /> View Manivakkam on Google Maps
          </Button>
        </div>
      </div>
    </div>
  );
}
