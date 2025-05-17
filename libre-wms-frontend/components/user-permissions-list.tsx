import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function UserPermissionsList() {
  const permissionGroups = [
    {
      name: "Products & SKUs",
      permissions: [
        { id: "products.view", name: "View Products", description: "View product catalog and details" },
        { id: "products.create", name: "Create Products", description: "Add new products to the catalog" },
        { id: "products.edit", name: "Edit Products", description: "Modify existing product information" },
        { id: "products.delete", name: "Delete Products", description: "Remove products from the catalog" },
      ],
    },
    {
      name: "Warehouse Locations",
      permissions: [
        { id: "locations.view", name: "View Locations", description: "View warehouse locations and zones" },
        { id: "locations.create", name: "Create Locations", description: "Add new locations to the warehouse" },
        { id: "locations.edit", name: "Edit Locations", description: "Modify existing location information" },
        { id: "locations.delete", name: "Delete Locations", description: "Remove locations from the warehouse" },
      ],
    },
    {
      name: "Inbound Orders",
      permissions: [
        { id: "inbound.view", name: "View Inbound Orders", description: "View incoming shipments and receipts" },
        { id: "inbound.create", name: "Create Inbound Orders", description: "Register new incoming shipments" },
        {
          id: "inbound.process",
          name: "Process Inbound Orders",
          description: "Receive and process incoming shipments",
        },
        { id: "inbound.edit", name: "Edit Inbound Orders", description: "Modify inbound order information" },
        { id: "inbound.delete", name: "Delete Inbound Orders", description: "Remove inbound orders from the system" },
      ],
    },
    {
      name: "Outbound Orders",
      permissions: [
        { id: "outbound.view", name: "View Outbound Orders", description: "View customer orders and shipments" },
        { id: "outbound.create", name: "Create Outbound Orders", description: "Create new customer orders" },
        {
          id: "outbound.process",
          name: "Process Outbound Orders",
          description: "Pick, pack, and ship customer orders",
        },
        { id: "outbound.edit", name: "Edit Outbound Orders", description: "Modify outbound order information" },
        {
          id: "outbound.delete",
          name: "Delete Outbound Orders",
          description: "Remove outbound orders from the system",
        },
      ],
    },
    {
      name: "Inventory Movements",
      permissions: [
        { id: "movements.view", name: "View Movements", description: "View inventory movements and transfers" },
        { id: "movements.create", name: "Create Movements", description: "Initiate inventory transfers" },
        { id: "movements.adjust", name: "Adjust Inventory", description: "Make inventory adjustments" },
        { id: "movements.delete", name: "Delete Movements", description: "Remove movement records from the system" },
      ],
    },
    {
      name: "Reports & Analytics",
      permissions: [
        { id: "reports.view", name: "View Reports", description: "Access standard reports and analytics" },
        { id: "reports.create", name: "Create Reports", description: "Generate custom reports" },
        { id: "reports.export", name: "Export Reports", description: "Export reports to various formats" },
      ],
    },
    {
      name: "User Management",
      permissions: [
        { id: "users.view", name: "View Users", description: "View user accounts and details" },
        { id: "users.create", name: "Create Users", description: "Add new user accounts" },
        { id: "users.edit", name: "Edit Users", description: "Modify user account information" },
        { id: "users.delete", name: "Delete Users", description: "Remove user accounts from the system" },
        { id: "roles.manage", name: "Manage Roles", description: "Create, edit, and delete roles" },
        { id: "permissions.manage", name: "Manage Permissions", description: "Configure system permissions" },
      ],
    },
    {
      name: "System Settings",
      permissions: [
        { id: "settings.view", name: "View Settings", description: "View system configuration" },
        { id: "settings.edit", name: "Edit Settings", description: "Modify system configuration" },
        { id: "settings.backup", name: "Backup & Restore", description: "Perform system backups and restores" },
        { id: "settings.logs", name: "View Logs", description: "Access system logs and audit trails" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Permission Configuration</h3>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Custom Permission
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Permission Group</TableHead>
              <TableHead>Permissions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissionGroups.map((group) => (
              <TableRow key={group.name}>
                <TableCell className="font-medium">{group.name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {group.permissions.map((permission) => (
                      <TooltipProvider key={permission.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center space-x-2 border rounded-md px-3 py-1.5 bg-background">
                              <Checkbox id={permission.id} />
                              <label
                                htmlFor={permission.id}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {permission.name}
                              </label>
                              <Info className="h-3.5 w-3.5 text-muted-foreground" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs">
                            <p>{permission.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
