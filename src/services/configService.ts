import { CommissionStatus } from "@/types/ui/statusBadge/StatusBadge.types";

/**
 * Service to manage website configuration, status values, and integration settings.
 */
export const configService = {
  /**
   * Get the current status of avatar commissions.
   * Can be configured dynamically or pulled from environment variables.
   */
  getCommissionStatus: (): CommissionStatus => {
    // Default to 'available' as standard initial state.
    // Can map to process.env.NEXT_PUBLIC_COMMISSION_STATUS if needed.
    const envStatus = process.env.NEXT_PUBLIC_COMMISSION_STATUS;
    if (envStatus === "busy" || envStatus === "closed" || envStatus === "available") {
      return envStatus as CommissionStatus;
    }
    return "available";
  },

  /**
   * Discord white-listed usernames for Admin Panel access.
   */
  getDiscordWhitelist: (): string[] => {
    const whitelistStr = process.env.NEXT_PUBLIC_DISCORD_WHITELIST || "";
    return whitelistStr
      .split(",")
      .map((username) => username.trim())
      .filter((username) => username.length > 0);
  },

  /**
   * Contact details
   */
  getContactTelegram: (): string => {
    return process.env.NEXT_PUBLIC_TELEGRAM_URL || "";
  },

  getContactDiscord: (): string => {
    return process.env.NEXT_PUBLIC_DISCORD_URL || "";
  },

  getVRChatProfile: (): string => {
    return process.env.NEXT_PUBLIC_VRCHAT_URL || "";
  },

  getTwitterProfile: (): string => {
    return process.env.NEXT_PUBLIC_TWITTER_URL || "";
  }
};
