"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from "react-icons/fa";
import { NotificationProps } from "@/types/ui/notification/Notification.types";

export default function Notification({ id, message, type, duration = 4000, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const typeConfig = {
    success: {
      icon: <FaCheckCircle className="w-5 h-5 text-success" />,
      border: "border-success/30",
      accent: "bg-success",
      shadow: "shadow-success/10",
    },
    error: {
      icon: <FaExclamationCircle className="w-5 h-5 text-destructive" />,
      border: "border-destructive/30",
      accent: "bg-destructive",
      shadow: "shadow-destructive/10",
    },
    info: {
      icon: <FaInfoCircle className="w-5 h-5 text-primary" />,
      border: "border-primary/30",
      accent: "bg-primary",
      shadow: "shadow-primary/10",
    },
  };

  const config = typeConfig[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex items-center gap-3 w-80 max-w-sm p-4 rounded-xl border ${config.border} bg-card text-card-foreground shadow-lg ${config.shadow} relative overflow-hidden pointer-events-auto`}
    >
      {/* Decorative side border */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${config.accent}`} />
      
      {/* Icon */}
      <div className="flex-shrink-0 ml-1">{config.icon}</div>
      
      {/* Message */}
      <div className="flex-1 text-xs font-body leading-normal pr-4 select-none font-medium text-left">
        {message}
      </div>

      {/* Close button */}
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 p-1 text-muted-foreground hover:text-foreground rounded-lg transition-colors cursor-pointer"
        aria-label="Close notification"
      >
        <FaTimes className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}
