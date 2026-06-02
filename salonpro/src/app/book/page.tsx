"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { addDays, format } from "date-fns";
import { Scissors, Star, CalendarCheck, Check } from "@phosphor-icons/react";
import Link from "next/link";

const services = [
  { id: 1, name: "Classic Haircut", price: "₹499", duration: "30 min" },
  { id: 2, name: "Beard Trim", price: "₹299", duration: "20 min" },
  { id: 3, name: "Premium Spa", price: "₹999", duration: "60 min" },
  { id: 4, name: "Hair Color", price: "₹1299", duration: "60 min" },
];

const barbers = [
  { id: 1, name: "Raj", title: "Senior Barber", rating: 4.9 },
  { id: 2, name: "Amit", title: "Stylist", rating: 4.7 },
  { id: 3, name: "Vikram", title: "Specialist", rating: 4.8 },
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("Cash");

  const dates = Array.from({ length: 7 }).map((_, i) => addDays(new Date(), i));
  const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"];

  const handleConfirm = () => {
    setStep(5);
  };

  const selectedServiceData = services.find(s => s.id === selectedService);
  const selectedBarberData = barbers.find(b => b.id === selectedBarber);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-20 md:pb-8">
      {/* Header */}
      <div className="relative mb-10 text-center">
        <div className="absolute inset-0 -top-4 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="relative animate-fadeInUp">
          <p className="text-accent text-xs font-bold uppercase tracking-widest mb-3">Schedule Your Visit</p>
          <h1 className="text-4xl font-serif gold-text mb-4">Book Appointment</h1>
        </div>
      </div>

      {/* Step Indicator */}
      {step < 5 && (
        <div className="flex items-center justify-center gap-2 mb-10 animate-fadeIn">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                s === step ? "bg-accent text-primary shadow-gold scale-110" 
                : s < step ? "bg-accent/20 text-accent" 
                : "bg-surface text-textSecondary"
              }`}>
                {s < step ? <Check size={14} weight="bold" /> : s}
              </div>
              {s < 4 && <div className={`w-12 h-px transition-all duration-500 ${s < step ? "bg-accent" : "bg-surface"}`} />}
            </div>
          ))}
        </div>
      )}

      {step === 1 && (
        <div className="space-y-6 animate-fadeInUp">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Scissors size={24} className="text-accent" weight="duotone" /> Select Service
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 stagger-children">
            {services.map((s) => (
              <Card 
                key={s.id} 
                className={`p-5 cursor-pointer transition-all duration-300 animate-fadeInUp opacity-0 ${
                  selectedService === s.id ? 'border-accent bg-accent/5 shadow-gold' : 'hover:shadow-gold/50'
                }`}
                onClick={() => setSelectedService(s.id)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{s.name}</h3>
                  {selectedService === s.id && (
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center animate-scaleIn">
                      <Check size={12} weight="bold" className="text-primary" />
                    </div>
                  )}
                </div>
                <div className="flex justify-between text-sm text-textSecondary mt-3">
                  <span className="text-accent font-bold">{s.price}</span>
                  <span>{s.duration}</span>
                </div>
              </Card>
            ))}
          </div>
          <Button 
            className="w-full mt-6 shadow-gold hover:shadow-gold-lg transition-shadow" 
            disabled={!selectedService}
            onClick={() => setStep(2)}
          >
            Continue
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-fadeInUp">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Star size={24} className="text-accent" weight="duotone" /> Choose Barber
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 stagger-children">
            {barbers.map((b) => (
              <Card 
                key={b.id} 
                className={`p-5 cursor-pointer transition-all duration-300 animate-fadeInUp opacity-0 ${
                  selectedBarber === b.id ? 'border-accent bg-accent/5 shadow-gold' : 'hover:shadow-gold/50'
                }`}
                onClick={() => setSelectedBarber(b.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-serif text-xl transition-all duration-300 ${
                    selectedBarber === b.id 
                      ? "bg-accent text-primary shadow-gold"
                      : "bg-surface border border-accent/20 text-accent"
                  }`}>
                    {b.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{b.name}</h3>
                    <p className="text-xs text-textSecondary">{b.title}</p>
                    <p className="text-xs text-accent mt-1">⭐ {b.rating}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex gap-4 mt-6">
            <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
            <Button className="flex-1 shadow-gold" disabled={!selectedBarber} onClick={() => setStep(3)}>Continue</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 animate-fadeInUp">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <CalendarCheck size={24} className="text-accent" weight="duotone" /> Date & Time
          </h2>
          
          {/* Date strip */}
          <div className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar">
            {dates.map((d, i) => (
              <button
                key={i}
                onClick={() => setSelectedDate(d)}
                className={`flex-shrink-0 flex flex-col items-center p-3 rounded-xl border min-w-[80px] transition-all duration-300 ${
                  format(selectedDate, 'yyyy-MM-dd') === format(d, 'yyyy-MM-dd')
                    ? 'border-accent bg-accent/10 text-accent shadow-gold'
                    : 'border-surface bg-surface text-textSecondary hover:border-accent/30'
                }`}
              >
                <span className="text-[10px] uppercase tracking-wider">{format(d, 'EEE')}</span>
                <span className="text-xl font-bold mt-1">{format(d, 'd')}</span>
                <span className="text-[9px] mt-0.5">{format(d, 'MMM')}</span>
              </button>
            ))}
          </div>

          {/* Time slots */}
          <div className="grid grid-cols-4 gap-3 mt-6">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-3 rounded-xl border text-sm font-medium transition-all duration-300 ${
                  selectedTime === time
                    ? 'border-accent bg-accent text-primary shadow-gold'
                    : 'border-surface bg-surface text-foreground hover:border-accent/30'
                }`}
              >
                {time}
              </button>
            ))}
          </div>

          <div className="flex gap-4 mt-8">
            <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Back</Button>
            <Button className="flex-1 shadow-gold-lg" disabled={!selectedTime} onClick={() => setStep(4)}>Review & Pay</Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-8 animate-fadeInUp">
          <h2 className="text-2xl font-semibold">Review & Payment</h2>
          
          <div className="space-y-4">
            {/* Summary Item - Service */}
            <Card className="p-5 flex items-center justify-between border-accent/10 bg-accent/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <Scissors size={20} />
                </div>
                <div>
                  <p className="text-xs text-textSecondary uppercase tracking-widest font-bold">Service</p>
                  <p className="font-semibold">{selectedServiceData?.name}</p>
                </div>
              </div>
              <button onClick={() => setStep(1)} className="text-accent text-xs font-bold hover:underline">Edit</button>
            </Card>

            {/* Summary Item - Barber */}
            <Card className="p-5 flex items-center justify-between border-accent/10 bg-accent/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <Star size={20} />
                </div>
                <div>
                  <p className="text-xs text-textSecondary uppercase tracking-widest font-bold">Barber</p>
                  <p className="font-semibold">{selectedBarberData?.name}</p>
                </div>
              </div>
              <button onClick={() => setStep(2)} className="text-accent text-xs font-bold hover:underline">Edit</button>
            </Card>

            {/* Summary Item - Schedule */}
            <Card className="p-5 flex items-center justify-between border-accent/10 bg-accent/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <CalendarCheck size={20} />
                </div>
                <div>
                  <p className="text-xs text-textSecondary uppercase tracking-widest font-bold">Appointment</p>
                  <p className="font-semibold">{format(selectedDate, 'dd MMM')} at {selectedTime}</p>
                </div>
              </div>
              <button onClick={() => setStep(3)} className="text-accent text-xs font-bold hover:underline">Edit</button>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Method</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {["UPI", "Card", "Cash"].map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`p-4 rounded-xl border text-sm font-bold transition-all duration-300 flex flex-col items-center gap-2 ${
                    paymentMethod === method
                      ? "border-accent bg-accent/10 text-accent shadow-gold"
                      : "border-surface bg-surface text-textSecondary hover:border-accent/30"
                  }`}
                >
                  <span className="text-lg">{method === "UPI" ? "📱" : method === "Card" ? "💳" : "💵"}</span>
                  {method}
                </button>
              ))}
            </div>

            {/* UPI QR Code Section */}
            {paymentMethod === "UPI" && (
              <Card className="p-6 border-dashed border-accent/40 bg-accent/5 animate-fadeIn flex flex-col items-center text-center">
                <p className="text-sm font-semibold mb-4 text-accent">Scan with Google Pay or any UPI App</p>
                <div className="relative p-4 bg-white rounded-2xl shadow-xl mb-4 group overflow-hidden">
                  <div className="absolute inset-0 bg-accent/5 animate-pulse group-hover:hidden" />
                  {/* Generate QR code for UPI ID */}
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`upi://pay?pa=9790923083@okaxis&pn=SalonPro&am=${selectedServiceData?.price.replace('₹', '')}&cu=INR`)}`}
                    alt="Payment QR Code"
                    className="w-48 h-48 relative z-10"
                  />
                </div>
                <p className="text-[10px] text-textSecondary uppercase tracking-widest font-bold">UPI ID: 9790923083@okaxis</p>
                <div className="mt-4 p-2 px-4 rounded-full bg-success/10 text-success text-[10px] font-bold flex items-center gap-2">
                  <Check size={12} weight="bold" /> Waiting for payment confirmation...
                </div>
              </Card>
            )}
          </div>

          <Card className="p-6 bg-accent border-accent shadow-gold-lg text-primary">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-80">Final Total</p>
                <p className="text-3xl font-bold">{selectedServiceData?.price}</p>
              </div>
              <Button onClick={handleConfirm} className="bg-primary text-white border-primary hover:bg-black">
                Confirm & Pay
              </Button>
            </div>
          </Card>
          
          <p className="text-center text-[10px] text-textSecondary/60 uppercase tracking-widest">
            Secure checkout powered by SalonPro Pay
          </p>
        </div>
      )}

      {step === 5 && (
        <div className="text-center space-y-6 animate-scaleIn py-12">
          <div className="w-24 h-24 bg-success/10 text-success rounded-2xl flex items-center justify-center mx-auto mb-6 text-5xl shadow-[0_0_30px_rgba(46,204,113,0.2)]">
            ✓
          </div>
          <h2 className="text-3xl md:text-4xl font-serif gold-text">Booking Confirmed!</h2>
          <p className="text-textSecondary max-w-md mx-auto leading-relaxed">
            Your appointment has been successfully scheduled. We look forward to seeing you at SalonPro.
          </p>
          
          <Card className="p-5 max-w-sm mx-auto bg-accent/5 border-accent/20 text-left mt-6">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-textSecondary">Service</span><span className="font-semibold">{selectedServiceData?.name}</span></div>
              <div className="flex justify-between"><span className="text-textSecondary">Barber</span><span className="font-semibold">{selectedBarberData?.name}</span></div>
              <div className="flex justify-between"><span className="text-textSecondary">Date</span><span className="font-semibold">{format(selectedDate, 'dd MMM yyyy')}</span></div>
              <div className="flex justify-between"><span className="text-textSecondary">Time</span><span className="font-semibold">{selectedTime}</span></div>
              <div className="flex justify-between"><span className="text-textSecondary">Payment</span><span className="font-semibold">{paymentMethod}</span></div>
            </div>
          </Card>

          <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/profile">
              <Button variant="outline">View My Bookings</Button>
            </Link>
            <Button onClick={() => { setStep(1); setSelectedService(null); setSelectedBarber(null); setSelectedTime(null); }} className="shadow-gold">
              Book Another
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
