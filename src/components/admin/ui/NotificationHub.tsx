"use client";

import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  X,
  Clock,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";

export type ToastType = "success" | "warning" | "error" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  timestamp: Date;
}

export interface ActivityNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "system" | "update" | "lead" | "sla";
  read: boolean;
}

interface ToastContextType {
  toasts: ToastItem[];
  showToast: (type: ToastType, title: string, message?: string) => void;
  dismissToast: (id: string) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  unreadCount: number;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a NotificationProvider");
  }
  return {
    success: (title: string, message?: string) => context.showToast("success", title, message),
    warning: (title: string, message?: string) => context.showToast("warning", title, message),
    error: (title: string, message?: string) => context.showToast("error", title, message),
    info: (title: string, message?: string) => context.showToast("info", title, message),
    openDrawer: context.openDrawer,
    closeDrawer: context.closeDrawer,
    unreadCount: context.unreadCount,
  };
};

const defaultActivities: ActivityNotification[] = [
  {
    id: "act-1",
    title: "Capabilities Synced",
    message: "All 6 production service modules synced with edge endpoints.",
    time: "10m ago",
    type: "update",
    read: false,
  },
  {
    id: "act-2",
    title: "Lighthouse Performance Check",
    message: "Global TTFB verified under 50ms across all region nodes.",
    time: "1h ago",
    type: "sla",
    read: false,
  },
  {
    id: "act-3",
    title: "Inbound Discovery Form",
    message: "Enterprise discovery inquiry received from healthcare partner.",
    time: "3h ago",
    type: "lead",
    read: true,
  },
  {
    id: "act-4",
    title: "Security Shield",
    message: "TLS 1.3 edge certificate auto-renewed successfully.",
    time: "1d ago",
    type: "system",
    read: true,
  },
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState<ActivityNotification[]>(defaultActivities);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const showToast = (type: ToastType, title: string, message?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newToast: ToastItem = {
      id,
      type,
      title,
      message,
      timestamp: new Date(),
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getActivityIcon = (type: ActivityNotification["type"]) => {
    switch (type) {
      case "sla":
        return <Zap className="w-4 h-4 text-[#00D2FF]" />;
      case "lead":
        return <Sparkles className="w-4 h-4 text-emerald-400" />;
      case "system":
        return <ShieldCheck className="w-4 h-4 text-indigo-400" />;
      default:
        return <Info className="w-4 h-4 text-[#0099BE] dark:text-[#00D2FF]" />;
    }
  };

  const getToastIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-[#0099BE] dark:text-[#00D2FF]" />;
    }
  };

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        dismissToast,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
        unreadCount,
      }}
    >
      {children}

      {/* Slide-over Activity Notifications Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Sliding Drawer Container */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-full max-w-sm sm:max-w-md bg-white dark:bg-[#000F2E] text-[#00144A] dark:text-white border-l border-slate-200 dark:border-slate-800 shadow-2xl h-full flex flex-col justify-between z-10"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 flex items-center justify-center text-[#0099BE] dark:text-[#00D2FF]">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-outfit font-bold text-base text-[#00144A] dark:text-white">
                      Activity Hub
                    </h3>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {unreadCount} new notifications
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      type="button"
                      className="text-xs text-[#0099BE] dark:text-[#00D2FF] hover:underline font-semibold cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                  <button
                    onClick={() => setDrawerOpen(false)}
                    type="button"
                    className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Drawer Activity List */}
              <div className="p-6 space-y-3 flex-1 overflow-y-auto">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      item.read
                        ? "bg-slate-50/60 dark:bg-[#000517]/60 border-slate-100 dark:border-slate-800/80 opacity-80"
                        : "bg-slate-50 dark:bg-[#000517] border border-slate-200 dark:border-slate-800 shadow-sm"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-white dark:bg-[#000F2E] border border-slate-200 dark:border-slate-800 shadow-sm mt-0.5">
                        {getActivityIcon(item.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-outfit font-bold text-xs sm:text-sm text-[#00144A] dark:text-white truncate">
                            {item.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.time}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          {item.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Drawer Footer */}
              <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#000517]">
                <button
                  onClick={() => setDrawerOpen(false)}
                  type="button"
                  className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-[#000F2E] transition-colors cursor-pointer"
                >
                  Close Panel
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Toast Notification Stack (Bottom-Left / Bottom-Right) */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto p-4 rounded-2xl bg-white dark:bg-[#000F2E] border border-slate-200 dark:border-slate-800 text-[#00144A] dark:text-white shadow-2xl flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getToastIcon(toast.type)}</div>
                <div>
                  <div className="font-outfit font-bold text-xs sm:text-sm">
                    {toast.title}
                  </div>
                  {toast.message && (
                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {toast.message}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => dismissToast(toast.id)}
                type="button"
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Dismiss toast"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const NotificationHub = NotificationProvider;
export default NotificationHub;
