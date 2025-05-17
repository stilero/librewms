import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, UserPlus } from "lucide-react"

export default function NewUserPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <a href="/users">
              <ArrowLeft className="h-4 w-4" />
            </a>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Add New User</h1>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Create User
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Enter the user's personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" placeholder="Enter first name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" placeholder="Enter last name" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email address" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (Optional)</Label>
              <Input id="phone" type="tel" placeholder="Enter phone number" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Configure the user's account and access</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Enter username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="manager">Warehouse Manager</SelectItem>
                  <SelectItem value="operator">Warehouse Operator</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                The role determines the user's default permissions in the system
              </p>
            </div>

            <Separator className="my-2" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="send-invite">Send Email Invitation</Label>
                  <p className="text-xs text-muted-foreground">
                    Send an email with instructions to set up their account
                  </p>
                </div>
                <Switch id="send-invite" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="require-2fa">Require Two-Factor Authentication</Label>
                  <p className="text-xs text-muted-foreground">User will be required to set up 2FA on first login</p>
                </div>
                <Switch id="require-2fa" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="active-status">Active Status</Label>
                  <p className="text-xs text-muted-foreground">Inactive users cannot log in to the system</p>
                </div>
                <Switch id="active-status" defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
            <CardDescription>Add any additional notes or information about this user</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Add notes about this user (optional)" className="min-h-[100px]" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Button variant="outline" asChild>
              <a href="/users">Cancel</a>
            </Button>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" /> Create User
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
