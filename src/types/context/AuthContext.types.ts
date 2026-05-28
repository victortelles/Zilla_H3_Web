import { NotificationType } from "@/types/ui/notification/Notification.types";

export interface User {
  id: string;
  username: string;
  globalName: string;
  avatarUrl: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  authenticated: boolean;
  checkSession: () => Promise<void>;
  logout: () => void;
  showToast: (message: string, type: NotificationType) => void;
}

export interface ToastItem {
  id: string;
  message: string;
  type: NotificationType;
}
