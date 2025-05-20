'use client'

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
import Link from "next/link"
import { useProducts, type Product } from "./hooks/useProducts"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useState, useCallback } from "react"
import { useDebounce } from "../../hooks/useDebounce"

export default function ProductsPage() {
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [sortBy, setSortBy] = useState<keyof Product>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Debounce search term to avoid too many API calls
  const debouncedSearch = useDebounce(searchTerm, 300)

  const { products, isLoading, error, pagination } = useProducts({
    page,
    pageSize,
    sortBy,
    sortOrder,
    search: debouncedSearch,
    category: selectedCategory === 'all' ? '' : selectedCategory
  })

  const sortableFields: Array<keyof Product> = ['sku', 'name', 'category']

  const handleSort = useCallback((field: keyof Product) => {
    if (!sortableFields.includes(field)) return
    if (field === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }, [sortBy, sortOrder])

  if (isLoading && products.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-3">Loading products...</span>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products & SKUs</h1>
          <p className="text-muted-foreground">Manage your product catalog and stock keeping units.</p>
        </div>
        <Button asChild>
          <Link href="/products/add">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products by name, SKU, or description..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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

      {products.length === 0 ? (
        <div className="text-center py-10">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No products found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new product.</p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/products/add">
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative rounded-md border">
          {/* Table overlay for smoother loading */}
          {isLoading && products.length > 0 && (
            <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/60 flex items-center justify-center z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100"></div>
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="w-[100px] cursor-pointer select-none"
                  tabIndex={0}
                  role="button"
                  aria-label="Sort by SKU"
                  onClick={() => handleSort('sku')}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleSort('sku')}
                >
                  <div className="flex items-center">
                    SKU
                    <ArrowUpDown className={`ml-2 h-4 w-4 ${sortBy === 'sku' ? 'opacity-100' : 'opacity-50'}`} />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none"
                  tabIndex={0}
                  role="button"
                  aria-label="Sort by Product Name"
                  onClick={() => handleSort('name')}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleSort('name')}
                >
                  <div className="flex items-center">
                    Product Name
                    <ArrowUpDown className={`ml-2 h-4 w-4 ${sortBy === 'name' ? 'opacity-100' : 'opacity-50'}`} />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer select-none"
                  tabIndex={0}
                  role="button"
                  aria-label="Sort by Category"
                  onClick={() => handleSort('category')}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleSort('category')}
                >
                  <div className="flex items-center">
                    Category
                    <ArrowUpDown className={`ml-2 h-4 w-4 ${sortBy === 'category' ? 'opacity-100' : 'opacity-50'}`} />
                  </div>
                </TableHead>
                <TableHead className="text-center select-none">Stock</TableHead>
                <TableHead className="select-none text-right">Unit Price</TableHead>
                <TableHead className="select-none">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.sku}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <Package className="h-4 w-4 text-gray-500" />
                      </div>
                      <span>{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-center">{product.stockLevel}</TableCell>
                  <TableCell className="text-right">${product.unitPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === 'out_of_stock'
                          ? 'destructive'
                          : product.status === 'low_stock'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {product.status === 'out_of_stock'
                        ? 'Out of Stock'
                        : product.status === 'low_stock'
                        ? 'Low Stock'
                        : 'In Stock'}
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
                        <DropdownMenuItem asChild>
                          <Link href={`/products/${product.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
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
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {products.length} of {pagination.total} {pagination.total === 1 ? 'product' : 'products'}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= pagination.totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
