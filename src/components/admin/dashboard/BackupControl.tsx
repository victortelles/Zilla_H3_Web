"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/button/Button";
import ConfirmModal from "@/components/ui/modal/ConfirmModal";
import { FaDownload, FaUpload, FaSpinner } from "react-icons/fa";

interface BackupControlProps {
  onImportSuccess?: () => void;
}

export default function BackupControl({ onImportSuccess }: BackupControlProps) {
  const { showToast } = useAuth();
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingBackupData, setPendingBackupData] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Export Handler
  const handleExport = async () => {
    setIsExporting(true);
    try {
      const res = await fetch("/api/admin/backup");
      if (!res.ok) {
        throw new Error("Failed to fetch backup data");
      }
      const data = await res.json();
      
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      const dateStr = new Date().toISOString().split("T")[0];
      link.download = `zilla_database_backup_${dateStr}.json`;
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast("Database backup exported successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast("Error exporting database backup.", "error");
    } finally {
      setIsExporting(false);
    }
  };

  // 2. Import Button Click
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  // 3. File Selection Handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);

        // Client-side quick check
        if (!parsed || typeof parsed !== "object") {
          showToast("Invalid file format. Must be a JSON object.", "error");
          return;
        }
        if (parsed.version !== 1 || !parsed.data) {
          showToast("Invalid backup structure or unsupported version.", "error");
          return;
        }

        setPendingBackupData(parsed);
        setIsConfirmOpen(true);
      } catch (err) {
        showToast("Failed to parse JSON file.", "error");
      }
    };
    reader.readAsText(file);
  };

  // 4. Confirm Import/Restore Action
  const handleConfirmImport = async () => {
    if (!pendingBackupData) return;

    setIsImporting(true);
    try {
      const res = await fetch("/api/admin/backup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pendingBackupData),
      });

      if (res.ok) {
        showToast("Database imported and restored successfully! Reloading...", "success");
        setIsConfirmOpen(false);
        setPendingBackupData(null);
        
        setTimeout(() => {
          if (onImportSuccess) {
            onImportSuccess();
          } else {
            window.location.reload();
          }
        }, 1500);
      } else {
        const errorData = await res.json();
        showToast(errorData.error || "Failed to restore backup.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Network error importing backup.", "error");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="bg-card border border-border p-6 rounded-3xl shadow-sm text-left space-y-6">
      <div>
        <h2 className="font-display font-bold text-lg text-foreground uppercase tracking-tight">
          Database Backup & Restore
        </h2>
        <p className="font-body text-xs text-muted-foreground mt-1">
          Export all portfolio data, config, tags, and species, or restore them from a backup.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Export Button */}
        <Button
          variant="outline"
          size="md"
          onClick={handleExport}
          disabled={isExporting || isImporting}
          className="flex items-center justify-center gap-2 h-11 text-xs font-bold uppercase tracking-wider"
        >
          {isExporting ? (
            <FaSpinner className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <FaDownload className="w-3.5 h-3.5" />
          )}
          Export
        </Button>

        {/* Import Button */}
        <Button
          variant="outline"
          size="md"
          onClick={handleImportClick}
          disabled={isExporting || isImporting}
          className="flex items-center justify-center gap-2 h-11 text-xs font-bold uppercase tracking-wider"
        >
          <FaUpload className="w-3.5 h-3.5" />
          Import
        </Button>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json"
          className="hidden"
        />
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setPendingBackupData(null);
        }}
        onConfirm={handleConfirmImport}
        title="Restore Database"
        message="Are you sure you want to restore this database backup? This action will overwrite all current configurations, projects, species, and tags. This process cannot be undone."
        confirmText="Restore"
        cancelText="Cancel"
        isLoading={isImporting}
        loadingText="Restoring..."
      />
    </div>
  );
}
