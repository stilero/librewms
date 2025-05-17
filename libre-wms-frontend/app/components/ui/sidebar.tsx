// Update the sidebar to include a link to the settings page
"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  MapPin,
  TruckIcon,
  ShoppingCart,
  MoveHorizontal,
  BarChart3,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  Boxes,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function AppSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Products & SKUs", href: "/products", icon: Package },
    { name: "Warehouse Locations", href: "/locations", icon: MapPin },
    { name: "Inbound Orders", href: "/inbound", icon: TruckIcon },
    { name: "Outbound Orders", href: "/outbound", icon: ShoppingCart },
    { name: "Inventory Movements", href: "/movements", icon: MoveHorizontal },
    { name: "Stock Tracking", href: "/stock", icon: Boxes },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Users", href: "/users", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <div
      className={cn(
        "relative flex flex-col h-screen bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-800">
        <div
          className={cn("flex items-center", collapsed ? "justify-center" : "justify-between")}
          style={{ width: "100%" }}
        >
          {!collapsed && (
            <Link href="/" className="flex items-center">
              <Boxes className="h-6 w-6 text-blue-600" />
              <span className="ml-2 text-lg font-semibold">LibreWH</span>
            </Link>
          )}
          {collapsed && (
            <Link href="/" className="flex items-center justify-center">
              <Boxes className="h-6 w-6 text-blue-600" />
            </Link>
          )}
          <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href || pathname?.startsWith(`${item.href}/`)
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                  collapsed ? "justify-center" : "",
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    pathname === item.href || pathname?.startsWith(`${item.href}/`)
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400",
                  )}
                />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className={cn("flex items-center", collapsed ? "justify-center" : "space-x-3")}>
          <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </div>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">Admin User</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@librewarehouse.org</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
