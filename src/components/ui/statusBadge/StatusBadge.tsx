"use client";

import { StatusBadgeProps } from "@/types/ui/statusBadge/StatusBadge.types";

export default function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const configs = {
    available: {
      text: "Commissions: Open",
      bgClass: "bg-emerald-500/10 dark:bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
      dotClass: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse",
    },
    busy: {
      text: "Commissions: Busy",
      bgClass: "bg-amber-500/10 dark:bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400",
      dotClass: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)] animate-pulse",
    },
    closed: {
      text: "Commissions: Closed",
      bgClass: "bg-rose-500/10 dark:bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400",
      dotClass: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]",
    },
  };

  const currentConfig = configs[status] || configs.available;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-body font-semibold tracking-wide transition-all duration-300 ${currentConfig.bgClass} ${className}`}
    >
      <span className={`h-2 w-2 rounded-full ${currentConfig.dotClass}`} />
      <span>{currentConfig.text}</span>
    </div>
  );
}
