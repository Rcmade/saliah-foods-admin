
// import type { Icon } from "lucide-react"

import { LucideIcon } from "lucide-react";

// import { Icons } from "@/components/icons"
export type NotificationType =
  | "WELCOME"
  | "CHANGE_OF_STOCK"
  | "LOWEST_PRICE"
  | "THRESHOLD_MET";

export type EmailContent = {
  subject: string;
  body: string;
};



export type SidebarItem = {
  href: string;
  title: string;
  Icon:LucideIcon
}
export type SidebarItems = SidebarItem[];