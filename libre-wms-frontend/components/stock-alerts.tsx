import { AlertTriangle, TrendingDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const alerts = [
  {
    id: 1,
    sku: "SKU-7723",
    name: "Premium Headphones",
    type: "low_stock",
    level: 5,
    threshold: 10,
    location: "A-12-B",
  },
  {
    id: 2,
    sku: "SKU-5521",
    name: "Wireless Keyboard",
    type: "low_stock",
    level: 3,
    threshold: 15,
    location: "B-05-C",
  },
  {
    id: 3,
    sku: "SKU-9982",
    name: "USB-C Cable 2m",
    type: "expiring",
    expiryDate: "2023-12-15",
    level: 42,
    location: "C-22-A",
  },
  {
    id: 4,
    sku: "SKU-3344",
    name: "Bluetooth Speaker",
    type: "low_stock",
    level: 2,
    threshold: 8,
    location: "A-08-D",
  },
]

export function StockAlerts() {
  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div key={alert.id} className="flex items-start space-x-4 p-3 rounded-md border">
          <div className="flex-shrink-0">
            {alert.type === "low_stock" ? (
              <TrendingDown className="h-5 w-5 text-red-500" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{alert.name}</p>
                <p className="text-sm text-muted-foreground">{alert.sku}</p>
              </div>
              <Badge variant={alert.type === "low_stock" ? "destructive" : "outline"}>
                {alert.type === "low_stock" ? "Low Stock" : "Expiring Soon"}
              </Badge>
            </div>

            {alert.type === "low_stock" && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>
                    Stock Level: {alert.level}/{alert.threshold}
                  </span>
                  <span className="text-red-500">{Math.round((alert.level / alert.threshold) * 100)}%</span>
                </div>
                <Progress value={(alert.level / alert.threshold) * 100} className="h-2" />
              </div>
            )}

            {alert.type === "expiring" && (
              <p className="text-sm mt-2">
                Expires on: <span className="font-medium">{alert.expiryDate}</span> • Quantity: {alert.level}
              </p>
            )}

            <p className="text-sm mt-2">
              Location: <span className="font-medium">{alert.location}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
