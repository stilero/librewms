import { Clock } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "inbound",
    description: "Received order #INB-2023-042",
    timestamp: "10 minutes ago",
    user: "John Doe",
  },
  {
    id: 2,
    type: "outbound",
    description: "Shipped order #OUT-2023-107",
    timestamp: "25 minutes ago",
    user: "Sarah Johnson",
  },
  {
    id: 3,
    type: "movement",
    description: "Moved 24 units from A-12 to B-05",
    timestamp: "1 hour ago",
    user: "Mike Chen",
  },
  {
    id: 4,
    type: "product",
    description: "Added new product SKU-8842",
    timestamp: "2 hours ago",
    user: "Emily Wilson",
  },
  {
    id: 5,
    type: "adjustment",
    description: "Adjusted stock for SKU-7723 (+5)",
    timestamp: "3 hours ago",
    user: "Robert Taylor",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-4 pb-4 border-b last:border-0">
          <div className="flex-shrink-0 mt-0.5">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{activity.description}</p>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Clock className="h-3 w-3 mr-1" />
              <span>{activity.timestamp}</span>
              <span className="mx-1">•</span>
              <span>{activity.user}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
