"use client";

import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PaginationProps } from "@/types/ui/pagination/Pagination.types";

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-12 py-2 select-none">
      {/* Prev Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="w-10 h-10 inline-flex items-center justify-center rounded-xl border border-border bg-card text-foreground hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        aria-label="Previous Page"
      >
        <FaChevronLeft className="w-3.5 h-3.5" />
      </motion.button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5">
        {pageNumbers.map((page) => {
          const isActive = page === currentPage;
          return (
            <motion.button
              key={page}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 inline-flex items-center justify-center rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-primary"
              }`}
              aria-label={`Page ${page}`}
              aria-current={isActive ? "page" : undefined}
            >
              {page}
            </motion.button>
          );
        })}
      </div>

      {/* Next Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="w-10 h-10 inline-flex items-center justify-center rounded-xl border border-border bg-card text-foreground hover:border-primary/40 hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        aria-label="Next Page"
      >
        <FaChevronRight className="w-3.5 h-3.5" />
      </motion.button>
    </div>
  );
}
