import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Plus, Search, Filter, MoreHorizontal, CheckCircle, Package, Truck } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function OutboundPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Outbound Orders</h1>
          <p className="text-muted-foreground">Process and manage customer orders and shipments.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Outbound Order
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search by order ID, customer, or reference..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="picking">Picking</SelectItem>
              <SelectItem value="packing">Packing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
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
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">OUT-2023-107</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <ShoppingCart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span>Acme Corporation</span>
                </div>
              </TableCell>
              <TableCell>May 15, 2023</TableCell>
              <TableCell>5 SKUs (12 units)</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800"
                >
                  <Package className="mr-1 h-3 w-3" />
                  Picking
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">OUT-2023-106</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <ShoppingCart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span>TechStart Inc.</span>
                </div>
              </TableCell>
              <TableCell>May 14, 2023</TableCell>
              <TableCell>3 SKUs (8 units)</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800"
                >
                  <Package className="mr-1 h-3 w-3" />
                  Packing
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">OUT-2023-105</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <ShoppingCart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span>Global Traders Ltd.</span>
                </div>
              </TableCell>
              <TableCell>May 12, 2023</TableCell>
              <TableCell>7 SKUs (24 units)</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
                >
                  <Truck className="mr-1 h-3 w-3" />
                  Shipped
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">OUT-2023-104</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <ShoppingCart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span>Office Solutions</span>
                </div>
              </TableCell>
              <TableCell>May 10, 2023</TableCell>
              <TableCell>4 SKUs (16 units)</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                >
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Delivered
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">OUT-2023-103</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <ShoppingCart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span>Retail Partners</span>
                </div>
              </TableCell>
              <TableCell>May 8, 2023</TableCell>
              <TableCell>6 SKUs (42 units)</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                >
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Delivered
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
        <div className="text-sm text-muted-foreground">Showing 5 of 107 outbound orders</div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
