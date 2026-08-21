import React from "react";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import FloatingWhatsApp from "@/components/global/FloatingWhatsApp";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#00144A]">
      {/* Top Glassmorphic Navigation */}
      <Navbar />

      {/* Main Public Content Area */}
      <main className="flex-1">{children}</main>

      {/* Global Footer */}
      <Footer />

      {/* Persistent Floating WhatsApp Widget */}
      <FloatingWhatsApp />
    </div>
  );
}
