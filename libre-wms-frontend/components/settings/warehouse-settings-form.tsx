"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Save, Warehouse, MapPin, Grid3X3 } from "lucide-react"

// Define the form schema with validation
const warehouseSettingsSchema = z.object({
  warehouseName: z.string().min(2, { message: "Warehouse name must be at least 2 characters." }),
  warehouseCode: z.string().min(1, { message: "Warehouse code is required." }),
  address: z.string().optional(),
  locationNamingScheme: z.string().min(1, { message: "Please select a location naming scheme." }),
  defaultZone: z.string().optional(),
  enableBarcodeScanning: z.boolean().default(true),
  requireLocationForAllItems: z.boolean().default(true),
  enforceCapacityLimits: z.boolean().default(false),
  trackItemHistory: z.boolean().default(true),
})

type WarehouseSettingsValues = z.infer<typeof warehouseSettingsSchema>

// Default values for the form
const defaultValues: Partial<WarehouseSettingsValues> = {
  warehouseName: "Main Warehouse",
  warehouseCode: "WH-MAIN",
  address: "123 Warehouse St, Storage City, SC 12345",
  locationNamingScheme: "zone-aisle-shelf-bin",
  defaultZone: "A",
  enableBarcodeScanning: true,
  requireLocationForAllItems: true,
  enforceCapacityLimits: false,
  trackItemHistory: true,
}

export function WarehouseSettingsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize the form
  const form = useForm<WarehouseSettingsValues>({
    resolver: zodResolver(warehouseSettingsSchema),
    defaultValues,
    mode: "onChange",
  })

  // Handle form submission
  async function onSubmit(data: WarehouseSettingsValues) {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings saved",
        description: "Your warehouse settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
      console.error("Error saving settings:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Warehouse Information</CardTitle>
            <CardDescription>Configure your warehouse details and location.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="warehouseName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warehouse Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Warehouse className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-9" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="warehouseCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warehouse Code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>A unique identifier for this warehouse</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Warehouse Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location Settings</CardTitle>
            <CardDescription>Configure how warehouse locations are organized and managed.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="locationNamingScheme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location Naming Scheme</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select naming scheme" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="zone-aisle-shelf-bin">Zone-Aisle-Shelf-Bin (e.g., A-01-02-03)</SelectItem>
                        <SelectItem value="aisle-bay-level">Aisle-Bay-Level (e.g., 01-02-03)</SelectItem>
                        <SelectItem value="row-rack-bin">Row-Rack-Bin (e.g., R01-R02-B03)</SelectItem>
                        <SelectItem value="custom">Custom Format</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>How location identifiers are structured</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="defaultZone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Zone</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select default zone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="A">Zone A</SelectItem>
                        <SelectItem value="B">Zone B</SelectItem>
                        <SelectItem value="C">Zone C</SelectItem>
                        <SelectItem value="D">Zone D</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Default zone for new items without a specified location</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-md">
              <div className="flex items-center gap-2">
                <Grid3X3 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="text-sm font-medium">Warehouse Layout Editor</h3>
                  <p className="text-xs text-muted-foreground">
                    Visually design your warehouse layout and storage locations
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Open Editor
              </Button>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="requireLocationForAllItems"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Require Location for All Items</FormLabel>
                      <FormDescription>Every inventory item must have a location assigned</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enforceCapacityLimits"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Enforce Capacity Limits</FormLabel>
                      <FormDescription>Prevent exceeding defined capacity limits for locations</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="trackItemHistory"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Track Item History</FormLabel>
                      <FormDescription>Record location history for all inventory items</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enableBarcodeScanning"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Enable Barcode Scanning</FormLabel>
                      <FormDescription>Allow barcode scanning for locations and items</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end border-t pt-4">
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Settings"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
