import { SidebarItems } from "@/lib/types";
import { Package, PackageCheck, User } from "lucide-react";

export const sidebarItems: SidebarItems = [
    {
        href: "/admin/dashboard/products",
        title: "Products",
        Icon: Package
    },
    {
        href: "/admin/dashboard/orders",
        title: "Orders",
        Icon: PackageCheck
    },
    {
        href: "/admin/dashboard/users",
        title: "Users",
        Icon: User
    }
]