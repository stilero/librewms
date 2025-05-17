import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TruckIcon, Plus, Search, Filter, MoreHorizontal, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function InboundPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inbound Orders</h1>
          <p className="text-muted-foreground">Manage and process incoming shipments and receipts.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> New Inbound Order
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search by order ID, supplier, or reference..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_transit">In Transit</SelectItem>
              <SelectItem value="received">Received</SelectItem>
              <SelectItem value="issues">Has Issues</SelectItem>
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
              <TableHead>Supplier</TableHead>
              <TableHead>Expected Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INB-2023-042</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <TruckIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span>Tech Supplies Inc.</span>
                </div>
              </TableCell>
              <TableCell>May 15, 2023</TableCell>
              <TableCell>12 SKUs (48 units)</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800"
                >
                  <Clock className="mr-1 h-3 w-3" />
                  In Transit
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INB-2023-041</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <TruckIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span>Office Furniture Co.</span>
                </div>
              </TableCell>
              <TableCell>May 12, 2023</TableCell>
              <TableCell>5 SKUs (15 units)</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                >
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Received
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INB-2023-040</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <TruckIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span>Electronics Wholesale</span>
                </div>
              </TableCell>
              <TableCell>May 10, 2023</TableCell>
              <TableCell>8 SKUs (120 units)</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                >
                  <AlertCircle className="mr-1 h-3 w-3" />
                  Issues
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INB-2023-039</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <TruckIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span>Tech Supplies Inc.</span>
                </div>
              </TableCell>
              <TableCell>May 8, 2023</TableCell>
              <TableCell>3 SKUs (35 units)</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                >
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Received
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INB-2023-038</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <TruckIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span>Office Furniture Co.</span>
                </div>
              </TableCell>
              <TableCell>May 5, 2023</TableCell>
              <TableCell>6 SKUs (12 units)</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                >
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Received
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
        <div className="text-sm text-muted-foreground">Showing 5 of 42 inbound orders</div>
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
