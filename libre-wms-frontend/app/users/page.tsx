import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash,
  Shield,
  Key,
  UserPlus,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { UserRolesList } from "@/components/user-roles-list"
import { UserPermissionsList } from "@/components/user-permissions-list"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage users, roles, and permissions for LibreWarehouse.</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search by name, email, or role..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="manager">Warehouse Manager</SelectItem>
                  <SelectItem value="operator">Warehouse Operator</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <span className="font-medium text-blue-700 dark:text-blue-300">JD</span>
                      </div>
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">Created on May 12, 2023</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>john.doe@example.com</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
                    >
                      <Shield className="mr-1 h-3 w-3" />
                      Administrator
                    </Badge>
                  </TableCell>
                  <TableCell>Today, 10:30 AM</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                    >
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="mr-2 h-4 w-4" /> Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Key className="mr-2 h-4 w-4" /> Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" /> Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <span className="font-medium text-purple-700 dark:text-purple-300">SJ</span>
                      </div>
                      <div>
                        <p className="font-medium">Sarah Johnson</p>
                        <p className="text-xs text-muted-foreground">Created on Apr 28, 2023</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>sarah.j@example.com</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800"
                    >
                      <Shield className="mr-1 h-3 w-3" />
                      Warehouse Manager
                    </Badge>
                  </TableCell>
                  <TableCell>Yesterday, 3:45 PM</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                    >
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <span className="font-medium text-green-700 dark:text-green-300">MC</span>
                      </div>
                      <div>
                        <p className="font-medium">Mike Chen</p>
                        <p className="text-xs text-muted-foreground">Created on May 5, 2023</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>mike.c@example.com</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                    >
                      <Shield className="mr-1 h-3 w-3" />
                      Warehouse Operator
                    </Badge>
                  </TableCell>
                  <TableCell>Today, 9:15 AM</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                    >
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                        <span className="font-medium text-amber-700 dark:text-amber-300">EW</span>
                      </div>
                      <div>
                        <p className="font-medium">Emily Wilson</p>
                        <p className="text-xs text-muted-foreground">Created on May 10, 2023</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>emily.w@example.com</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800"
                    >
                      <Shield className="mr-1 h-3 w-3" />
                      Viewer
                    </Badge>
                  </TableCell>
                  <TableCell>3 days ago</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800"
                    >
                      <AlertCircle className="mr-1 h-3 w-3" />
                      Pending
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <span className="font-medium text-red-700 dark:text-red-300">RT</span>
                      </div>
                      <div>
                        <p className="font-medium">Robert Taylor</p>
                        <p className="text-xs text-muted-foreground">Created on Apr 15, 2023</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>robert.t@example.com</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                    >
                      <Shield className="mr-1 h-3 w-3" />
                      Warehouse Operator
                    </Badge>
                  </TableCell>
                  <TableCell>2 weeks ago</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
                    >
                      <XCircle className="mr-1 h-3 w-3" />
                      Inactive
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">Showing 5 of 12 users</div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search roles..." className="pl-9" />
            </div>
            <Button>
              <Shield className="mr-2 h-4 w-4" /> Create Role
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <UserRolesList />
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Permissions</CardTitle>
              <CardDescription>
                Configure permissions that can be assigned to roles. Permissions determine what actions users can
                perform in the system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserPermissionsList />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
