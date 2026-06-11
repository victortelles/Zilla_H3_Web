"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaExclamationTriangle, FaSpinner } from "react-icons/fa";
import { ConfirmModalProps } from "@/types/ui/modal/ConfirmModal.types";
import Button from "@/components/ui/button/Button";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
  loadingText = "Removing...",
}: ConfirmModalProps) {
  // Listen for Escape key to close the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, isLoading]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={isLoading ? undefined : onClose}
            className="absolute inset-0 bg-black/80"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-2xl space-y-6 overflow-hidden z-10 text-left"
          >
            {/* Warning Icon & Header */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-destructive/10 text-destructive border border-destructive/20">
                <FaExclamationTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 flex-1">
                <h3 className="font-display font-bold text-lg text-foreground uppercase tracking-tight">
                  {title}
                </h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed">
                  {message}
                </p>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                size="md"
                onClick={onClose}
                disabled={isLoading}
                className="font-bold text-xs uppercase tracking-wider h-11 px-5"
              >
                {cancelText}
              </Button>
              <Button
                variant="destructive"
                size="md"
                onClick={onConfirm}
                disabled={isLoading}
                className="font-bold text-xs uppercase tracking-wider h-11 px-6 min-w-[100px] flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="w-3.5 h-3.5 animate-spin" /> {loadingText}
                  </>
                ) : (
                  confirmText
                )}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
