export interface SessionUser {
  id: string;
  username: string;
  globalName?: string;
  avatar: string | null;
  createdAt?: number;
}
