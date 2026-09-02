"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  FileText,
  Star,
  Image as ImageIcon,
  Settings,
  LogOut,
  ChevronDown,
  Globe,
  Home,
  Mail,
  User,
} from "lucide-react";
import NexoraLogo from "@/components/global/NexoraLogo";
import ConfirmModal from "@/components/admin/ui/ConfirmModal";

export interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const publicPagesList: NavItem[] = [
  { name: "Home", href: "/", icon: <Home className="w-4 h-4" /> },
  { name: "Services", href: "/admin/services", icon: <Briefcase className="w-4 h-4" /> },
  { name: "Testimonials", href: "/admin/testimonials", icon: <Star className="w-4 h-4" /> },
  { name: "Portfolio", href: "/admin/portfolio", icon: <FolderKanban className="w-4 h-4" /> },
  { name: "Gallery", href: "/admin/gallery", icon: <ImageIcon className="w-4 h-4" /> },
  { name: "Blogs", href: "/admin/blogs", icon: <FileText className="w-4 h-4" /> },
  { name: "Contact", href: "/admin/contact", icon: <Mail className="w-4 h-4" /> },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onMobileClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  collapsed,
  onMobileClose,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [publicPagesOpen, setPublicPagesOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profilePopoverOpen, setProfilePopoverOpen] = useState(false);
  const profilePopoverRef = useRef<HTMLDivElement>(null);

  // Close profile popover when clicking outside or pressing Escape
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (
        profilePopoverRef.current &&
        !profilePopoverRef.current.contains(e.target as Node)
      ) {
        setProfilePopoverOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setProfilePopoverOpen(false);
      }
    };

    if (profilePopoverOpen) {
      document.addEventListener("mousedown", handleDocumentClick);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [profilePopoverOpen]);

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    setProfilePopoverOpen(false);
    router.push("/admin/login");
  };

  const isLinkActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin" || pathname === "/admin/dashboard";
    }
    if (href === "/") {
      return false;
    }
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <>
      {/* Logout Confirmation Modal */}
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

      <aside
        className={`hidden lg:flex flex-col justify-between transition-all duration-300 ease-in-out bg-white dark:bg-[#000B2B] text-[#00144A] dark:text-slate-300 border-r border-slate-200 dark:border-slate-800 z-30 flex-shrink-0 h-screen sticky top-0 select-none ${
          collapsed ? "w-[72px] p-3" : "w-72 p-5"
        }`}
      >
        {/* Top Header Section: Clean Branding Logo with Single-Line Text */}
        <div>
          <div
            className={`flex items-center pb-5 border-b border-slate-100 dark:border-slate-800 ${
              collapsed ? "justify-center" : "justify-start px-2"
            }`}
          >
            {!collapsed ? (
              <Link
                href="/admin"
                className="inline-block overflow-hidden whitespace-nowrap"
                onClick={onMobileClose}
              >
                <NexoraLogo showText={true} size="md" />
              </Link>
            ) : (
              <Link
                href="/admin"
                className="inline-block"
                onClick={onMobileClose}
              >
                <NexoraLogo showText={false} size="sm" />
              </Link>
            )}
          </div>

          {/* Navigation List */}
          <nav className="mt-5 space-y-1.5">
            {/* 1. Independent Top Section: Dashboard */}
            <div className="relative group">
              <Link
                href="/admin"
                onClick={onMobileClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold font-jakarta transition-all duration-200 ${
                  isLinkActive("/admin")
                    ? "bg-[#00144A] text-white dark:bg-[#00144A] dark:text-white border border-slate-300 dark:border-[#00D2FF]/40 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-[#00144A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent"
                } ${collapsed ? "justify-center px-0" : ""}`}
              >
                <span
                  className={
                    isLinkActive("/admin")
                      ? "text-[#00D2FF]"
                      : "text-slate-500 dark:text-slate-400 group-hover:text-[#00144A] dark:group-hover:text-white"
                  }
                >
                  <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
                </span>
                {!collapsed && <span>Dashboard</span>}
              </Link>

              {/* Tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#00144A] text-white text-xs font-bold rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-lg border border-slate-700">
                  Dashboard
                </div>
              )}
            </div>

            {/* 2. Collapsible Accordion: Public Site Pages */}
            <div className="pt-2">
              {!collapsed ? (
                /* =================== EXPANDED SIDEBAR ACCORDION =================== */
                <div>
                  {/* Accordion Toggle Header */}
                  <button
                    onClick={() => setPublicPagesOpen(!publicPagesOpen)}
                    type="button"
                    className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-[#00144A] dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-[#0099BE] dark:text-[#00D2FF]" />
                      <span>Public Site Pages</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* Badge display logic: Hide when open, show when closed */}
                      {!publicPagesOpen && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#001133] text-slate-600 dark:text-[#00D2FF]">
                          {publicPagesList.length}
                        </span>
                      )}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          publicPagesOpen ? "rotate-0" : "-rotate-90"
                        }`}
                      />
                    </div>
                  </button>

                  {/* Accordion Sub-list */}
                  <AnimatePresence initial={false}>
                    {publicPagesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden space-y-1 pl-2 pt-1"
                      >
                        {publicPagesList.map((item) => {
                          const active = isLinkActive(item.href);
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={onMobileClose}
                              className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold font-jakarta transition-all ${
                                active
                                  ? "bg-[#00144A] text-white dark:bg-[#00144A] dark:text-white border border-slate-300 dark:border-[#00D2FF]/40 shadow-sm"
                                  : "text-slate-600 dark:text-slate-400 hover:text-[#00144A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span
                                  className={
                                    active
                                      ? "text-[#00D2FF]"
                                      : "text-slate-400 group-hover:text-[#00144A] dark:group-hover:text-white"
                                  }
                                >
                                  {item.icon}
                                </span>
                                <span>{item.name}</span>
                              </div>
                              {active && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
                              )}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* =================== COLLAPSED SIDEBAR RAIL =================== */
                <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
                  {!publicPagesOpen ? (
                    /* If accordion was CLOSED before collapse: render ONLY the single parent group icon */
                    <div className="relative group">
                      <button
                        type="button"
                        onClick={() => setPublicPagesOpen(true)}
                        className="w-full flex items-center justify-center p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-[#00144A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all cursor-pointer"
                        aria-label="Expand Public Site Pages"
                      >
                        <Globe className="w-4 h-4 text-[#0099BE] dark:text-[#00D2FF]" />
                      </button>

                      {/* Tooltip */}
                      <div className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#00144A] text-white text-xs font-bold rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-lg border border-slate-700">
                        Public Site Pages ({publicPagesList.length})
                      </div>
                    </div>
                  ) : (
                    /* If accordion was OPEN before collapse: render all 7 child route icons with tooltips */
                    publicPagesList.map((item) => {
                      const active = isLinkActive(item.href);
                      return (
                        <div key={item.href} className="relative group">
                          <Link
                            href={item.href}
                            onClick={onMobileClose}
                            className={`flex items-center justify-center p-2.5 rounded-xl transition-all ${
                              active
                                ? "bg-[#00144A] text-[#00D2FF] border border-slate-300 dark:border-[#00D2FF]/40 shadow-sm"
                                : "text-slate-500 dark:text-slate-400 hover:text-[#00144A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                            }`}
                          >
                            {item.icon}
                          </Link>

                          {/* Tooltip */}
                          <div className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#00144A] text-white text-xs font-bold rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-lg border border-slate-700">
                            {item.name}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* 3. Settings Navigation Link (Directly underneath Public Site Pages) */}
            <div className="pt-2">
              <div className="relative group">
                <Link
                  href="/admin/settings"
                  onClick={onMobileClose}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold font-jakarta transition-all ${
                    isLinkActive("/admin/settings")
                      ? "bg-[#00144A] text-white dark:bg-[#00144A] dark:text-white border border-slate-300 dark:border-[#00D2FF]/40 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-[#00144A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                  } ${collapsed ? "justify-center px-0" : ""}`}
                >
                  <span
                    className={
                      isLinkActive("/admin/settings")
                        ? "text-[#00D2FF]"
                        : "text-slate-500 dark:text-slate-400 group-hover:text-[#00144A] dark:group-hover:text-white"
                    }
                  >
                    <Settings className="w-4 h-4 flex-shrink-0" />
                  </span>
                  {!collapsed && <span>Settings</span>}
                </Link>

                {collapsed && (
                  <div className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#00144A] text-white text-xs font-bold rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-lg border border-slate-700">
                    Settings
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>

        {/* =================================================================== */}
        {/* Bottom Section: Profile & Logout */}
        {/* =================================================================== */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 relative" ref={profilePopoverRef}>
          {!collapsed ? (
            /* Expanded Mode: Full profile card with separate Logout button */
            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-xl bg-[#00144A] text-[#00D2FF] font-outfit font-black text-xs flex items-center justify-center border border-[#00D2FF]/40 flex-shrink-0">
                  MV
                </div>
                <div className="overflow-hidden">
                  <div className="font-outfit font-bold text-xs text-[#00144A] dark:text-white truncate">
                    Marcus Vance
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    marcus@nexora.io
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowLogoutModal(true)}
                type="button"
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
                title="Sign Out Session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Collapsed Mode: Single circular avatar with popover menu on click */
            <div className="flex justify-center">
              <button
                onClick={() => setProfilePopoverOpen(!profilePopoverOpen)}
                type="button"
                className="w-10 h-10 rounded-2xl bg-[#00144A] text-[#00D2FF] font-outfit font-black text-xs flex items-center justify-center border border-[#00D2FF]/40 hover:scale-105 active:scale-95 transition-transform cursor-pointer shadow-sm"
                aria-label="Administrator profile and session options"
                title="Marcus Vance (Admin Session)"
              >
                MV
              </button>

              {/* Compact Popover Menu anchored to collapsed avatar */}
              <AnimatePresence>
                {profilePopoverOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: 10, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-full ml-3 bottom-0 w-52 p-3 bg-white dark:bg-[#000F2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 text-[#00144A] dark:text-white space-y-2.5"
                  >
                    {/* User info */}
                    <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
                      <div className="w-8 h-8 rounded-xl bg-[#00144A] text-[#00D2FF] font-outfit font-black text-xs flex items-center justify-center border border-[#00D2FF]/40 flex-shrink-0">
                        MV
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-outfit font-bold text-xs truncate">
                          Marcus Vance
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          marcus@nexora.io
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-1">
                      <Link
                        href="/admin/settings"
                        onClick={() => setProfilePopoverOpen(false)}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#000517] hover:text-[#00144A] dark:hover:text-white transition-colors"
                      >
                        <Settings className="w-3.5 h-3.5" />
                        <span>Settings</span>
                      </Link>

                      <button
                        onClick={() => {
                          setProfilePopoverOpen(false);
                          setShowLogoutModal(true);
                        }}
                        type="button"
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
