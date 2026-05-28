export type NotificationType = "success" | "error" | "info";

export interface NotificationProps {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
  onClose: (id: string) => void;
}
