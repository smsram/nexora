"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  FileText,
  Star,
  Image as ImageIcon,
  Mail,
  Settings,
  LogOut,
} from "lucide-react";
import NexoraLogo from "@/components/global/NexoraLogo";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import NotificationHub from "@/components/admin/ui/NotificationHub";
import ConfirmModal from "@/components/admin/ui/ConfirmModal";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // If viewing the standalone login page, bypass layout shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    setMobileDrawerOpen(false);
    router.push("/admin/login");
  };

  return (
    <>
      {/* Logout Confirmation Modal for Mobile / Global Trigger */}
      <ConfirmModal
        isOpen={showLogoutModal}
        title="Confirm Sign Out"
        description="Are you sure you want to end your administrative session?"
        confirmText="Sign Out"
        cancelText="Cancel"
        variant="destructive"
        onConfirm={handleConfirmLogout}
        onCancel={() => setShowLogoutModal(false)}
      />

      <div className="min-h-screen bg-[#FAFBFD] dark:bg-[#000517] text-[#00144A] dark:text-white flex transition-colors duration-200">
        {/* Collapsible Desktop Sidebar */}
        <AdminSidebar
          collapsed={sidebarCollapsed}
        />

        {/* Mobile Sliding Drawer */}
        <AnimatePresence>
          {mobileDrawerOpen && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileDrawerOpen(false)}
                className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
              />

              {/* Drawer */}
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="relative w-72 max-w-[85vw] bg-white dark:bg-[#000B2B] text-[#00144A] dark:text-white p-6 flex flex-col justify-between z-10 h-full border-r border-slate-200 dark:border-slate-800 shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
                    <NexoraLogo showText={true} size="md" />
                    <button
                      onClick={() => setMobileDrawerOpen(false)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#00144A] dark:hover:text-white"
                      aria-label="Close navigation"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <nav className="mt-5 space-y-1">
                    <Link
                      href="/admin"
                      onClick={() => setMobileDrawerOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                        pathname === "/admin" || pathname === "/admin/dashboard"
                          ? "bg-[#00144A] text-white dark:bg-[#00144A]"
                          : "text-slate-600 dark:text-slate-400 hover:text-[#00144A] dark:hover:text-white"
                      }`}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>

                    <div className="pt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">
                      Public Site Pages
                    </div>

                    <Link
                      href="/admin/services"
                      onClick={() => setMobileDrawerOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#00144A] dark:hover:text-white"
                    >
                      <Briefcase className="w-4 h-4" />
                      <span>Services</span>
                    </Link>
                    <Link
                      href="/admin/testimonials"
                      onClick={() => setMobileDrawerOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#00144A] dark:hover:text-white"
                    >
                      <Star className="w-4 h-4" />
                      <span>Testimonials</span>
                    </Link>
                    <Link
                      href="/admin/portfolio"
                      onClick={() => setMobileDrawerOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#00144A] dark:hover:text-white"
                    >
                      <FolderKanban className="w-4 h-4" />
                      <span>Portfolio</span>
                    </Link>
                    <Link
                      href="/admin/gallery"
                      onClick={() => setMobileDrawerOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#00144A] dark:hover:text-white"
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span>Gallery</span>
                    </Link>
                    <Link
                      href="/admin/blogs"
                      onClick={() => setMobileDrawerOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#00144A] dark:hover:text-white"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Blogs</span>
                    </Link>
                    <Link
                      href="/admin/contact"
                      onClick={() => setMobileDrawerOpen(false)}
                      className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#00144A] dark:hover:text-white"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Contact</span>
                    </Link>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                      <Link
                        href="/admin/settings"
                        onClick={() => setMobileDrawerOpen(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#00144A] dark:hover:text-white"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                    </div>
                  </nav>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-bold border border-red-200 dark:border-red-900 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out Session</span>
                  </button>
                </div>
              </motion.aside>
            </div>
          )}
        </AnimatePresence>

        {/* Main Viewport */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar Header */}
          <AdminHeader
            sidebarCollapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            onOpenMobileDrawer={() => setMobileDrawerOpen(true)}
          />

          {/* Inner Page Viewport */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NotificationHub>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </NotificationHub>
  );
}
