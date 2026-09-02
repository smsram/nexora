"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronRight,
  ExternalLink,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Bell,
} from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { useToast } from "@/components/admin/ui/NotificationHub";

const breadcrumbNameMap: Record<string, string> = {
  "/admin/services": "Services",
  "/admin/portfolio": "Portfolio",
  "/admin/blogs": "Blogs",
  "/admin/testimonials": "Testimonials",
  "/admin/gallery": "Gallery",
  "/admin/contact": "Contact",
  "/admin/settings": "Settings",
};

interface AdminHeaderProps {
  sidebarCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenMobileDrawer: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  sidebarCollapsed,
  onToggleCollapse,
  onOpenMobileDrawer,
}) => {
  const pathname = usePathname();
  const { openDrawer, unreadCount } = useToast();

  const isDashboard = pathname === "/admin" || pathname === "/admin/dashboard";
  const pageTitle = breadcrumbNameMap[pathname] || (pathname.startsWith("/admin/") ? pathname.replace("/admin/", "").replace("-", " ") : "");

  return (
    <header className="sticky top-0 z-20 bg-white/90 dark:bg-[#000B2B]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between transition-colors duration-200">
      
      {/* Left: Mobile Hamburger + Desktop Sidebar Collapse Toggle + Clickable Breadcrumbs */}
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={onOpenMobileDrawer}
          type="button"
          className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-[#001133] text-[#00144A] dark:text-white hover:bg-slate-200 dark:hover:bg-[#001c4d] transition-colors cursor-pointer"
          aria-label="Toggle navigation"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Desktop Sidebar Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          type="button"
          className="hidden lg:flex p-2 rounded-xl bg-slate-100 dark:bg-[#001133] hover:bg-slate-200 dark:hover:bg-[#001c4d] text-slate-600 dark:text-slate-300 hover:text-[#00144A] dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer shadow-sm"
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            <PanelLeftOpen className="w-4 h-4 text-[#0099BE] dark:text-[#00D2FF]" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </button>

        {/* Breadcrumb Trail: Strictly hidden on main dashboard view */}
        {!isDashboard && pageTitle && (
          <nav className="flex items-center gap-2 text-xs font-jakarta ml-1">
            <Link
              href="/admin"
              className="text-slate-500 hover:text-[#00144A] dark:text-slate-400 dark:hover:text-white transition-colors font-medium"
            >
              Admin
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-[#00144A] dark:text-white capitalize">
              {pageTitle}
            </span>
          </nav>
        )}
      </div>

      {/* Right: Live Site Link + Notification Bell + Theme Toggle */}
      <div className="flex items-center gap-3">
        {/* Public Live Site Link */}
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-[#001133] hover:bg-slate-200 dark:hover:bg-[#001c4d] text-xs font-bold text-[#00144A] dark:text-white border border-slate-200 dark:border-slate-800 transition-colors shadow-sm"
          title="Open Public Production View"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#0099BE] dark:text-[#00D2FF]" />
        </Link>

        {/* Header Notification Bell */}
        <button
          onClick={openDrawer}
          type="button"
          className="relative p-2 rounded-xl bg-slate-100 dark:bg-[#001133] hover:bg-slate-200 dark:hover:bg-[#001c4d] text-slate-600 dark:text-slate-300 hover:text-[#00144A] dark:hover:text-white border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer shadow-sm"
          aria-label="Open notifications"
          title="Activity Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white dark:border-[#000B2B] shadow-sm">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Theme Switcher Toggle */}
        <ThemeToggle />
      </div>

    </header>
  );
};

export default AdminHeader;
