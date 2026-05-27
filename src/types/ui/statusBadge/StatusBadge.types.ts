export type CommissionStatus = "available" | "busy" | "closed";

export interface StatusBadgeProps {
  status: CommissionStatus;
  className?: string;
}
