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
import { Package, Plus, Search, Filter, MoreHorizontal, Edit, Trash, Copy, ArrowUpDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products & SKUs</h1>
          <p className="text-muted-foreground">Manage your product catalog and stock keeping units.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search products by name, SKU, or description..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="furniture">Furniture</SelectItem>
              <SelectItem value="food">Food & Beverage</SelectItem>
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
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead>
                <div className="flex items-center justify-end">
                  Unit Price
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
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
              <TableCell>Electronics</TableCell>
              <TableCell className="text-center">5</TableCell>
              <TableCell className="text-right">$129.99</TableCell>
              <TableCell>
                <Badge variant="destructive">Low Stock</Badge>
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
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" /> Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
              <TableCell>Electronics</TableCell>
              <TableCell className="text-center">3</TableCell>
              <TableCell className="text-right">$59.99</TableCell>
              <TableCell>
                <Badge variant="destructive">Low Stock</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
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
              <TableCell>Electronics</TableCell>
              <TableCell className="text-center">42</TableCell>
              <TableCell className="text-right">$12.99</TableCell>
              <TableCell>
                <Badge variant="outline">In Stock</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
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
              <TableCell>Electronics</TableCell>
              <TableCell className="text-center">2</TableCell>
              <TableCell className="text-right">$79.99</TableCell>
              <TableCell>
                <Badge variant="destructive">Low Stock</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
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
              <TableCell>Furniture</TableCell>
              <TableCell className="text-center">8</TableCell>
              <TableCell className="text-right">$199.99</TableCell>
              <TableCell>
                <Badge variant="outline">In Stock</Badge>
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
        <div className="text-sm text-muted-foreground">Showing 5 of 25 products</div>
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
