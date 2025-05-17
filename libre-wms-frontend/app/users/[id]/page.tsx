import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Mail, Calendar, Shield, Key, Clock, ArrowLeft, Save } from "lucide-react"
import { UserActivityLog } from "@/components/user-activity-log"

export default function UserDetailPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <a href="/users">
              <ArrowLeft className="h-4 w-4" />
            </a>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Key className="mr-2 h-4 w-4" /> Reset Password
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>User Information</CardTitle>
              <CardDescription>View and edit user details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center justify-center py-4">
                <div className="h-24 w-24 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">JD</span>
                </div>
                <h2 className="text-xl font-bold">John Doe</h2>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
                >
                  <Shield className="mr-1 h-3 w-3" />
                  Administrator
                </Badge>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">john.doe@example.com</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Created on May 12, 2023</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">Last active: Today, 10:30 AM</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Label htmlFor="account-status" className="mr-2">
                      Account Status
                    </Label>
                  </div>
                  <Switch id="account-status" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Label htmlFor="two-factor" className="mr-2">
                      Two-Factor Authentication
                    </Label>
                  </div>
                  <Switch id="two-factor" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Label htmlFor="email-notifications" className="mr-2">
                      Email Notifications
                    </Label>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-2/3">
          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="activity">Activity Log</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update user's personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input id="first-name" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" defaultValue="Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage user's account settings and role</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="johndoe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select defaultValue="admin">
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
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Add notes about this user"
                        defaultValue="Main system administrator responsible for user management and system configuration."
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="permissions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>User Permissions</CardTitle>
                  <CardDescription>
                    Permissions are inherited from the user's role. You can override specific permissions for this user.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Role-Based Permissions</h3>
                        <p className="text-sm text-muted-foreground">
                          This user has the Administrator role with full system access
                        </p>
                      </div>
                      <Button variant="outline">
                        <Shield className="mr-2 h-4 w-4" /> Change Role
                      </Button>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-2">Permission Overrides</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Override specific permissions for this user, regardless of their role
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 rounded-md border">
                          <div>
                            <h4 className="font-medium">Products & SKUs</h4>
                            <p className="text-sm text-muted-foreground">View, create, edit, and delete products</p>
                          </div>
                          <Button variant="outline">Configure</Button>
                        </div>

                        <div className="flex items-center justify-between p-2 rounded-md border">
                          <div>
                            <h4 className="font-medium">Warehouse Locations</h4>
                            <p className="text-sm text-muted-foreground">View, create, edit, and delete locations</p>
                          </div>
                          <Button variant="outline">Configure</Button>
                        </div>

                        <div className="flex items-center justify-between p-2 rounded-md border">
                          <div>
                            <h4 className="font-medium">Inbound Orders</h4>
                            <p className="text-sm text-muted-foreground">
                              View, create, process, edit, and delete inbound orders
                            </p>
                          </div>
                          <Button variant="outline">Configure</Button>
                        </div>

                        <div className="flex items-center justify-between p-2 rounded-md border">
                          <div>
                            <h4 className="font-medium">Outbound Orders</h4>
                            <p className="text-sm text-muted-foreground">
                              View, create, process, edit, and delete outbound orders
                            </p>
                          </div>
                          <Button variant="outline">Configure</Button>
                        </div>

                        <div className="flex items-center justify-between p-2 rounded-md border">
                          <div>
                            <h4 className="font-medium">User Management</h4>
                            <p className="text-sm text-muted-foreground">
                              View, create, edit, and delete users and roles
                            </p>
                          </div>
                          <Button variant="outline">Configure</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Log</CardTitle>
                  <CardDescription>View user's recent activity in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <UserActivityLog />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
