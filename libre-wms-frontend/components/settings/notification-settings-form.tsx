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
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Save, Bell, Mail, MessageSquare } from "lucide-react"

// Define the form schema with validation
const notificationSettingsSchema = z.object({
  enableEmailNotifications: z.boolean().default(true),
  enableInAppNotifications: z.boolean().default(true),
  enableSmsNotifications: z.boolean().default(false),
  lowStockAlerts: z.boolean().default(true),
  inboundOrderAlerts: z.boolean().default(true),
  outboundOrderAlerts: z.boolean().default(true),
  inventoryMovementAlerts: z.boolean().default(false),
  systemAlerts: z.boolean().default(true),
  emailRecipients: z.string().optional(),
  smsRecipients: z.string().optional(),
})

type NotificationSettingsValues = z.infer<typeof notificationSettingsSchema>

// Default values for the form
const defaultValues: Partial<NotificationSettingsValues> = {
  enableEmailNotifications: true,
  enableInAppNotifications: true,
  enableSmsNotifications: false,
  lowStockAlerts: true,
  inboundOrderAlerts: true,
  outboundOrderAlerts: true,
  inventoryMovementAlerts: false,
  systemAlerts: true,
  emailRecipients: "admin@librewarehouse.org, warehouse@librewarehouse.org",
  smsRecipients: "",
}

export function NotificationSettingsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize the form
  const form = useForm<NotificationSettingsValues>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues,
    mode: "onChange",
  })

  // Handle form submission
  async function onSubmit(data: NotificationSettingsValues) {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings saved",
        description: "Your notification settings have been updated successfully.",
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
            <CardTitle>Notification Channels</CardTitle>
            <CardDescription>Configure how you want to receive notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="enableInAppNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-muted-foreground" />
                        <FormLabel>In-App Notifications</FormLabel>
                      </div>
                      <FormDescription>Show notifications within the application</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enableEmailNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <FormLabel>Email Notifications</FormLabel>
                      </div>
                      <FormDescription>Send notifications via email</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enableSmsNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <FormLabel>SMS Notifications</FormLabel>
                      </div>
                      <FormDescription>Send notifications via SMS (text message)</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              {form.watch("enableEmailNotifications") && (
                <FormField
                  control={form.control}
                  name="emailRecipients"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Recipients</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email addresses, separated by commas" {...field} />
                      </FormControl>
                      <FormDescription>Who should receive email notifications</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {form.watch("enableSmsNotifications") && (
                <FormField
                  control={form.control}
                  name="smsRecipients"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SMS Recipients</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter phone numbers, separated by commas" {...field} />
                      </FormControl>
                      <FormDescription>Who should receive SMS notifications</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Types</CardTitle>
            <CardDescription>Choose which events trigger notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="lowStockAlerts"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Low Stock Alerts</FormLabel>
                      <FormDescription>Notify when items fall below minimum stock levels</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="inboundOrderAlerts"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Inbound Order Alerts</FormLabel>
                      <FormDescription>Notify about new or updated inbound orders</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="outboundOrderAlerts"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Outbound Order Alerts</FormLabel>
                      <FormDescription>Notify about new or updated outbound orders</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="inventoryMovementAlerts"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Inventory Movement Alerts</FormLabel>
                      <FormDescription>Notify about inventory transfers and adjustments</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="systemAlerts"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>System Alerts</FormLabel>
                      <FormDescription>Notify about system updates, maintenance, and issues</FormDescription>
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
