import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Plus, Search, Grid3X3, List, Edit, Trash, Package } from "lucide-react"
import { WarehouseMap } from "@/components/warehouse-map"

export default function LocationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Warehouse Locations</h1>
          <p className="text-muted-foreground">Manage and visualize your warehouse storage locations.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Location
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search locations by ID, zone, or description..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <MapPin className="mr-2 h-4 w-4" /> Zones
          </Button>
          <Button variant="outline">
            <Grid3X3 className="mr-2 h-4 w-4" /> Grid View
          </Button>
          <Button variant="outline">
            <List className="mr-2 h-4 w-4" /> List View
          </Button>
        </div>
      </div>

      <Tabs defaultValue="map" className="space-y-4">
        <TabsList>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="zones">Zones</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Warehouse Layout</CardTitle>
              <CardDescription>Visual representation of your warehouse layout and storage locations</CardDescription>
            </CardHeader>
            <CardContent>
              <WarehouseMap />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zones" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Zone A</CardTitle>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>Main Storage Area - Electronics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Total Locations:</span>
                    <span className="font-medium">48</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Occupied:</span>
                    <span className="font-medium">32 (67%)</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Available:</span>
                    <span className="font-medium">16 (33%)</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Items Stored:</span>
                    <span className="font-medium">245</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Zone B</CardTitle>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>Secondary Storage - Furniture</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Total Locations:</span>
                    <span className="font-medium">36</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Occupied:</span>
                    <span className="font-medium">28 (78%)</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Available:</span>
                    <span className="font-medium">8 (22%)</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Items Stored:</span>
                    <span className="font-medium">112</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Zone C</CardTitle>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>High-Value Items Storage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Total Locations:</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Occupied:</span>
                    <span className="font-medium">18 (75%)</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Available:</span>
                    <span className="font-medium">6 (25%)</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Items Stored:</span>
                    <span className="font-medium">86</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Zone D</CardTitle>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>Bulk Storage Area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Total Locations:</span>
                    <span className="font-medium">18</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Occupied:</span>
                    <span className="font-medium">12 (67%)</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Available:</span>
                    <span className="font-medium">6 (33%)</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Items Stored:</span>
                    <span className="font-medium">320</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Location List</CardTitle>
              <CardDescription>Detailed list of all warehouse locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-start space-x-4 p-3 rounded-md border">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">A-{i + 1}-B</p>
                          <p className="text-sm text-muted-foreground">Zone A, Rack {i + 1}, Bin B</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Package className="mr-2 h-4 w-4" /> View Items
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Capacity</p>
                          <p className="text-sm font-medium">100 kg / 0.5 m³</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Items</p>
                          <p className="text-sm font-medium">
                            {5 + i} SKUs / {12 + i * 3} units
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Status</p>
                          <p className="text-sm font-medium">Active</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
