"use client";
import { WhatsappLogo } from "@phosphor-icons/react";
import { motion } from "framer-motion";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  groupLink?: string;
}

export function WhatsAppButton({ 
  phoneNumber = "919790923083", 
  message = "Hello SalonPro! I am interested in your grooming services. Could you please help me with more details?",
  groupLink 
}: WhatsAppButtonProps) {
  
  const handleClick = () => {
    if (groupLink) {
      window.open(groupLink, "_blank");
    } else {
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, shadow: "0 0 20px rgba(37, 211, 102, 0.4)" }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-20 right-6 md:bottom-8 md:right-8 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 border-2 border-white/20"
      aria-label="Contact on WhatsApp"
    >
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      <WhatsappLogo size={32} weight="fill" />
    </motion.button>
  );
}
