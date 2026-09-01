import React from "react";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import FloatingWhatsApp from "@/components/global/FloatingWhatsApp";
import GlobalLeadModal from "@/components/global/GlobalLeadModal";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#000517] text-[#00144A] dark:text-white transition-colors duration-200">
      {/* Top Glassmorphic Navigation */}
      <Navbar />

      {/* Main Public Content Area */}
      <main className="flex-1">{children}</main>

      {/* Global Footer */}
      <Footer />

      {/* Persistent Floating WhatsApp Widget */}
      <FloatingWhatsApp />

      {/* Persistent Global Lead Capture Modal (10s initial / 30s recurring on dismiss) */}
      <GlobalLeadModal />
    </div>
  );
}
