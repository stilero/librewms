import { Badge } from "@/components/ui/badge"
import {
  Clock,
  UserCircle,
  Package,
  MapPin,
  TruckIcon,
  ShoppingCart,
  MoveHorizontal,
  Settings,
  Shield,
} from "lucide-react"

export function UserActivityLog() {
  const activities = [
    {
      id: 1,
      action: "User Login",
      description: "Logged in to the system",
      timestamp: "Today, 10:30 AM",
      category: "auth",
      icon: UserCircle,
    },
    {
      id: 2,
      action: "Product Update",
      description: "Updated product SKU-7723 (Premium Headphones)",
      timestamp: "Today, 10:45 AM",
      category: "products",
      icon: Package,
    },
    {
      id: 3,
      action: "User Creation",
      description: "Created new user account for Emily Wilson",
      timestamp: "Today, 11:15 AM",
      category: "users",
      icon: UserCircle,
    },
    {
      id: 4,
      action: "Inbound Order",
      description: "Processed inbound order INB-2023-042",
      timestamp: "Today, 11:30 AM",
      category: "inbound",
      icon: TruckIcon,
    },
    {
      id: 5,
      action: "Inventory Movement",
      description: "Transferred 24 units of SKU-7723 from A-12-B to B-05-C",
      timestamp: "Today, 12:15 PM",
      category: "movements",
      icon: MoveHorizontal,
    },
    {
      id: 6,
      action: "Role Update",
      description: "Modified permissions for Warehouse Operator role",
      timestamp: "Yesterday, 3:45 PM",
      category: "users",
      icon: Shield,
    },
    {
      id: 7,
      action: "Outbound Order",
      description: "Created outbound order OUT-2023-107 for Acme Corporation",
      timestamp: "Yesterday, 4:20 PM",
      category: "outbound",
      icon: ShoppingCart,
    },
    {
      id: 8,
      action: "System Settings",
      description: "Updated warehouse configuration settings",
      timestamp: "Yesterday, 5:10 PM",
      category: "settings",
      icon: Settings,
    },
    {
      id: 9,
      action: "Location Update",
      description: "Added new storage location D-05-C",
      timestamp: "2 days ago",
      category: "locations",
      icon: MapPin,
    },
    {
      id: 10,
      action: "User Login",
      description: "Logged in to the system",
      timestamp: "2 days ago",
      category: "auth",
      icon: UserCircle,
    },
  ]

  const getCategoryColor = (category) => {
    switch (category) {
      case "auth":
        return "blue"
      case "products":
        return "green"
      case "users":
        return "purple"
      case "inbound":
        return "amber"
      case "outbound":
        return "indigo"
      case "movements":
        return "red"
      case "locations":
        return "emerald"
      case "settings":
        return "gray"
      default:
        return "gray"
    }
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const color = getCategoryColor(activity.category)
        return (
          <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-md border">
            <div
              className={`flex-shrink-0 h-10 w-10 rounded-full bg-${color}-100 dark:bg-${color}-900/30 flex items-center justify-center`}
            >
              <activity.icon className={`h-5 w-5 text-${color}-600 dark:text-${color}-400`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
                <Badge
                  variant="outline"
                  className={`bg-${color}-50 text-${color}-700 border-${color}-200 dark:bg-${color}-900/20 dark:text-${color}-300 dark:border-${color}-800`}
                >
                  {activity.category}
                </Badge>
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <Clock className="h-3 w-3 mr-1" />
                <span>{activity.timestamp}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
