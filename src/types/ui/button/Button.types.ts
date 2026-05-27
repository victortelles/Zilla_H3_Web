import { ReactNode, ComponentProps } from "react";
import { motion } from "framer-motion";

export type ButtonVariant = "primary" | "secondary" | "accent" | "outline" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<ComponentProps<typeof motion.button>, "variant"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}
