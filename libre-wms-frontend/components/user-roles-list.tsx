import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash, Users, Shield, Package, TruckIcon, ShoppingCart, BarChart3, Settings } from "lucide-react"

export function UserRolesList() {
  const roles = [
    {
      id: 1,
      name: "Administrator",
      description: "Full access to all system features and settings",
      userCount: 2,
      color: "blue",
      permissions: [{ name: "All Permissions", icon: Shield }],
    },
    {
      id: 2,
      name: "Warehouse Manager",
      description: "Manage warehouse operations, inventory, and staff",
      userCount: 3,
      color: "purple",
      permissions: [
        { name: "Manage Products", icon: Package },
        { name: "Manage Locations", icon: Shield },
        { name: "Manage Inbound", icon: TruckIcon },
        { name: "Manage Outbound", icon: ShoppingCart },
        { name: "Manage Movements", icon: Shield },
        { name: "View Reports", icon: BarChart3 },
        { name: "Manage Users", icon: Users },
      ],
    },
    {
      id: 3,
      name: "Warehouse Operator",
      description: "Handle day-to-day warehouse operations",
      userCount: 5,
      color: "green",
      permissions: [
        { name: "View Products", icon: Package },
        { name: "View Locations", icon: Shield },
        { name: "Process Inbound", icon: TruckIcon },
        { name: "Process Outbound", icon: ShoppingCart },
        { name: "Record Movements", icon: Shield },
      ],
    },
    {
      id: 4,
      name: "Viewer",
      description: "Read-only access to warehouse data",
      userCount: 2,
      color: "amber",
      permissions: [
        { name: "View Products", icon: Package },
        { name: "View Locations", icon: Shield },
        { name: "View Inbound", icon: TruckIcon },
        { name: "View Outbound", icon: ShoppingCart },
        { name: "View Movements", icon: Shield },
        { name: "View Reports", icon: BarChart3 },
      ],
    },
    {
      id: 5,
      name: "System Auditor",
      description: "Audit system activities and generate reports",
      userCount: 1,
      color: "indigo",
      permissions: [
        { name: "View Products", icon: Package },
        { name: "View Locations", icon: Shield },
        { name: "View Inbound", icon: TruckIcon },
        { name: "View Outbound", icon: ShoppingCart },
        { name: "View Movements", icon: Shield },
        { name: "View Reports", icon: BarChart3 },
        { name: "View Users", icon: Users },
        { name: "View Settings", icon: Settings },
      ],
    },
    {
      id: 6,
      name: "Custom Role",
      description: "Custom permissions for specific needs",
      userCount: 0,
      color: "gray",
      permissions: [{ name: "Custom Permissions", icon: Shield }],
    },
  ]

  return (
    <>
      {roles.map((role) => (
        <Card key={role.id} className={`border-${role.color}-100 dark:border-${role.color}-900/30`}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <Shield className={`mr-2 h-5 w-5 text-${role.color}-600 dark:text-${role.color}-400`} />
                {role.name}
              </CardTitle>
              <Badge variant="outline">{role.userCount} users</Badge>
            </div>
            <CardDescription>{role.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Permissions:</h4>
              <div className="flex flex-wrap gap-1.5">
                {role.permissions.map((permission, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center">
                    <permission.icon className="mr-1 h-3 w-3" />
                    {permission.name}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <Button variant="ghost" size="sm">
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
            {role.id !== 1 && (
              <Button variant="ghost" size="sm" className="text-red-600">
                <Trash className="mr-2 h-4 w-4" /> Delete
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </>
  )
}
