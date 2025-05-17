import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoveHorizontal, Search, Filter, MoreHorizontal, ArrowRight, ArrowUp, ArrowDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function MovementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Movements</h1>
          <p className="text-muted-foreground">Track and manage stock movements between locations.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <ArrowUp className="mr-2 h-4 w-4" /> Stock Adjustment
          </Button>
          <Button>
            <MoveHorizontal className="mr-2 h-4 w-4" /> New Movement
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search by movement ID, product, or location..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Movement Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="transfer">Transfer</SelectItem>
              <SelectItem value="adjustment">Adjustment</SelectItem>
              <SelectItem value="return">Return</SelectItem>
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
              <TableHead className="w-[100px]">Movement ID</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">MOV-2023-156</TableCell>
              <TableCell>May 15, 2023 14:32</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
                >
                  <MoveHorizontal className="mr-1 h-3 w-3" />
                  Transfer
                </Badge>
              </TableCell>
              <TableCell>Premium Headphones (SKU-7723)</TableCell>
              <TableCell>24 units</TableCell>
              <TableCell>A-12-B</TableCell>
              <TableCell>B-05-C</TableCell>
              <TableCell>Mike Chen</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">MOV-2023-155</TableCell>
              <TableCell>May 15, 2023 11:15</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                >
                  <ArrowUp className="mr-1 h-3 w-3" />
                  Adjustment (+)
                </Badge>
              </TableCell>
              <TableCell>Wireless Keyboard (SKU-5521)</TableCell>
              <TableCell>5 units</TableCell>
              <TableCell>-</TableCell>
              <TableCell>A-08-D</TableCell>
              <TableCell>Sarah Johnson</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">MOV-2023-154</TableCell>
              <TableCell>May 14, 2023 16:45</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
                >
                  <MoveHorizontal className="mr-1 h-3 w-3" />
                  Transfer
                </Badge>
              </TableCell>
              <TableCell>USB-C Cable 2m (SKU-9982)</TableCell>
              <TableCell>50 units</TableCell>
              <TableCell>D-04-A</TableCell>
              <TableCell>C-22-A</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">MOV-2023-153</TableCell>
              <TableCell>May 14, 2023 10:22</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                >
                  <ArrowDown className="mr-1 h-3 w-3" />
                  Adjustment (-)
                </Badge>
              </TableCell>
              <TableCell>Bluetooth Speaker (SKU-3344)</TableCell>
              <TableCell>2 units</TableCell>
              <TableCell>B-05-C</TableCell>
              <TableCell>-</TableCell>
              <TableCell>Emily Wilson</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">MOV-2023-152</TableCell>
              <TableCell>May 13, 2023 15:10</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800"
                >
                  <ArrowRight className="mr-1 h-3 w-3" />
                  Return
                </Badge>
              </TableCell>
              <TableCell>Ergonomic Office Chair (SKU-6677)</TableCell>
              <TableCell>1 unit</TableCell>
              <TableCell>-</TableCell>
              <TableCell>D-02-B</TableCell>
              <TableCell>Robert Taylor</TableCell>
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
        <div className="text-sm text-muted-foreground">Showing 5 of 156 movements</div>
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
