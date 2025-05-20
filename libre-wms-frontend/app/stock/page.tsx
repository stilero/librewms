import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  MoreHorizontal,
  ArrowUpDown,
  Package,
  AlertTriangle,
  MoveHorizontal,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PRODUCT_CATEGORIES_WITH_ALL } from "@/constants/categories"

export default function StockPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Stock Tracking</h1>
          <p className="text-muted-foreground">Real-time view of your inventory across all warehouse locations.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <ArrowDown className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button variant="outline">
            <ArrowUp className="mr-2 h-4 w-4" /> Import
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search by SKU, product name, or location..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_CATEGORIES_WITH_ALL.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="in_stock">In Stock</SelectItem>
              <SelectItem value="low_stock">Low Stock</SelectItem>
              <SelectItem value="out_of_stock">Out of Stock</SelectItem>
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
              <TableHead className="w-[100px]">SKU</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>
                <div className="flex items-center">
                  Stock Level
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Locations</TableHead>
              <TableHead>Last Movement</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">SKU-7723</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Package className="h-4 w-4 text-gray-500" />
                  </div>
                  <span>Premium Headphones</span>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>5 units</span>
                    <span className="text-red-500">50%</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="destructive">
                  <AlertTriangle className="mr-1 h-3 w-3" />
                  Low Stock
                </Badge>
              </TableCell>
              <TableCell>A-12-B, B-05-C</TableCell>
              <TableCell>May 15, 2023</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoveHorizontal className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">SKU-5521</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Package className="h-4 w-4 text-gray-500" />
                  </div>
                  <span>Wireless Keyboard</span>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>3 units</span>
                    <span className="text-red-500">20%</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="destructive">
                  <AlertTriangle className="mr-1 h-3 w-3" />
                  Low Stock
                </Badge>
              </TableCell>
              <TableCell>A-08-D</TableCell>
              <TableCell>May 15, 2023</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoveHorizontal className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">SKU-9982</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Package className="h-4 w-4 text-gray-500" />
                  </div>
                  <span>USB-C Cable 2m</span>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>42 units</span>
                    <span className="text-green-500">84%</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">In Stock</Badge>
              </TableCell>
              <TableCell>C-22-A, D-04-A</TableCell>
              <TableCell>May 14, 2023</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoveHorizontal className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">SKU-3344</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Package className="h-4 w-4 text-gray-500" />
                  </div>
                  <span>Bluetooth Speaker</span>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>2 units</span>
                    <span className="text-red-500">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="destructive">
                  <AlertTriangle className="mr-1 h-3 w-3" />
                  Low Stock
                </Badge>
              </TableCell>
              <TableCell>B-05-C</TableCell>
              <TableCell>May 14, 2023</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoveHorizontal className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">SKU-6677</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Package className="h-4 w-4 text-gray-500" />
                  </div>
                  <span>Ergonomic Office Chair</span>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>8 units</span>
                    <span className="text-green-500">80%</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">In Stock</Badge>
              </TableCell>
              <TableCell>D-02-B, B-03-A</TableCell>
              <TableCell>May 13, 2023</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoveHorizontal className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Showing 5 of 125 stock items</div>
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
