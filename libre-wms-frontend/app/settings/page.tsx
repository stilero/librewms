import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
  Settings,
  Warehouse,
  Tag,
  Bell,
  Users,
  Plug,
  Database,
  FileText,
  Ruler,
  Palette,
  Globe,
  Shield,
  HardDrive,
  Clock,
  Truck,
  Package,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { GeneralSettingsForm } from "@/components/settings/general-settings-form"
import { WarehouseSettingsForm } from "@/components/settings/warehouse-settings-form"
import { NotificationSettingsForm } from "@/components/settings/notification-settings-form"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your system settings and preferences for LibreWarehouse.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-3 lg:grid-cols-6 h-auto">
          <TabsTrigger value="general" className="flex flex-col py-2 h-auto">
            <Settings className="h-4 w-4 mb-1" />
            <span className="text-xs">General</span>
          </TabsTrigger>
          <TabsTrigger value="warehouse" className="flex flex-col py-2 h-auto">
            <Warehouse className="h-4 w-4 mb-1" />
            <span className="text-xs">Warehouse</span>
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex flex-col py-2 h-auto">
            <Package className="h-4 w-4 mb-1" />
            <span className="text-xs">Inventory</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex flex-col py-2 h-auto">
            <Bell className="h-4 w-4 mb-1" />
            <span className="text-xs">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex flex-col py-2 h-auto">
            <Plug className="h-4 w-4 mb-1" />
            <span className="text-xs">Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex flex-col py-2 h-auto">
            <Database className="h-4 w-4 mb-1" />
            <span className="text-xs">System</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general">
          <div className="grid gap-6">
            <GeneralSettingsForm />
          </div>
        </TabsContent>

        {/* Warehouse Settings Tab */}
        <TabsContent value="warehouse">
          <div className="grid gap-6">
            <WarehouseSettingsForm />
          </div>
        </TabsContent>

        {/* Inventory Settings Tab */}
        <TabsContent value="inventory">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Inventory Settings</CardTitle>
                <CardDescription>Configure how inventory is managed in your warehouse.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Link href="/settings/product-properties">
                    <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Product Properties</CardTitle>
                        <div className="flex items-center">
                          <Tag className="h-4 w-4 text-muted-foreground mr-1" />
                          <Ruler className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Manage categories, units of measure, and other product properties.
                        </p>
                        <div className="flex justify-end mt-4">
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/settings/product-attributes">
                    <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Product Attributes</CardTitle>
                        <Palette className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Configure custom attributes like color, size, and material.
                        </p>
                        <div className="flex justify-end mt-4">
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/settings/inventory-rules">
                    <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Inventory Rules</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Set up rules for stock levels, reordering, and alerts.
                        </p>
                        <div className="flex justify-end mt-4">
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/settings/suppliers">
                    <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Suppliers</CardTitle>
                        <Truck className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Manage supplier information and preferences.</p>
                        <div className="flex justify-end mt-4">
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/settings/barcodes">
                    <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Barcode Settings</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Configure barcode generation and scanning preferences.
                        </p>
                        <div className="flex justify-end mt-4">
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <div className="grid gap-6">
            <NotificationSettingsForm />
          </div>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Connect LibreWarehouse with other systems and services.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">E-commerce Platforms</CardTitle>
                      <Globe className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Connect to Shopify, WooCommerce, and other e-commerce platforms.
                      </p>
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Shipping Providers</CardTitle>
                      <Truck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Integrate with shipping carriers for rates and label printing.
                      </p>
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Accounting Software</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Connect to QuickBooks, Xero, and other accounting systems.
                      </p>
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">API Access</CardTitle>
                      <Plug className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Manage API keys and access for custom integrations.
                      </p>
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Manage system-wide configuration and maintenance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">User Management</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Manage users, roles, and permissions for system access.
                      </p>
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/users">Manage</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Security</CardTitle>
                      <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Configure security settings, password policies, and 2FA.
                      </p>
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Backup & Restore</CardTitle>
                      <HardDrive className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Manage system backups and restore points.</p>
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">System Logs</CardTitle>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">View and export system logs and audit trails.</p>
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm">
                          View Logs
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">System Updates</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Check for and install system updates.</p>
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm">
                          Check Updates
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
