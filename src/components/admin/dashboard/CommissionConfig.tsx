"use client";

import StatusBadge from "@/components/ui/statusBadge/StatusBadge";
import { CommissionStatus } from "@/types/ui/statusBadge/StatusBadge.types";

interface CommissionConfigProps {
  commissionStatus: CommissionStatus;
  isUpdatingStatus: boolean;
  onUpdateStatus: (status: CommissionStatus) => void;
}

export default function CommissionConfig({
  commissionStatus,
  isUpdatingStatus,
  onUpdateStatus,
}: CommissionConfigProps) {
  return (
    <div className="bg-card border border-border p-6 rounded-3xl shadow-sm text-left space-y-6">
      <div>
        <h2 className="font-display font-bold text-lg text-foreground uppercase tracking-tight">
          Commission Config
        </h2>
        <p className="font-body text-xs text-muted-foreground mt-1">
          Adjust the status indicator shown on the landing page in real-time.
        </p>
      </div>

      <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/40 border border-border/60">
        <span className="text-xs font-bold text-foreground">Current State:</span>
        <StatusBadge status={commissionStatus} />
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Select Status
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(["available", "busy", "closed"] as CommissionStatus[]).map((status) => (
            <button
              key={status}
              type="button"
              disabled={isUpdatingStatus}
              onClick={() => onUpdateStatus(status)}
              className={`h-9 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                commissionStatus === status
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-muted/40 border-border text-foreground hover:bg-muted/70"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
