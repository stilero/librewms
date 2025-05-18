import { useState, useEffect } from 'react'

export interface Product {
  id: string
  name: string
  sku: string
  description?: string
  category: string
  unitOfMeasure: string
  width?: number
  height?: number
  length?: number
  weight?: number
  unitPrice: number
  costPrice: number
  minStockLevel?: number
  maxStockLevel?: number
  reorderPoint?: number
  defaultLocation?: string
  barcode?: string
  isActive: boolean
  isTaxable: boolean
  stockLevel: number
  status: 'in_stock' | 'low_stock' | 'out_of_stock'
}

interface UseProductsOptions {
  page?: number
  pageSize?: number
  sortBy?: keyof Product
  sortOrder?: 'asc' | 'desc'
  search?: string
  category?: string
}

interface ProductsResponse {
  items: Product[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export const useProducts = (options: UseProductsOptions = {}) => {
  // Convert options into state variables
  const [page, setPage] = useState(options.page ?? 1)
  const [pageSize, setPageSize] = useState(options.pageSize ?? 10)
  const [sortBy, setSortBy] = useState<keyof Product>(options.sortBy ?? 'name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(options.sortOrder ?? 'asc')
  const [search, setSearch] = useState(options.search ?? '')
  const [category, setCategory] = useState(options.category ?? '')

  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [pagination, setPagination] = useState({
    total: 0,
    page: page,
    pageSize: pageSize,
    totalPages: 0
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Build query parameters
        const params = new URLSearchParams({
          page: page.toString(),
          pageSize: pageSize.toString(),
          sortBy,
          sortOrder,
          ...(search && { search }),
          ...(category && { category })
        })

        // Get API URL with fallback
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
        console.log('Using API URL:', apiUrl)
        console.log('Fetching products from:', `${apiUrl}/api/products?${params}`)
        
        const response = await fetch(`${apiUrl}/api/products?${params}`)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status} ${response.statusText} (Url: ${apiUrl}/api/products?${params})` )
        }

        const data: ProductsResponse = await response.json()
        console.log('Received products data:', data)
        
        // Transform the data to include status based on stock levels
        const productsWithStatus = data.items.map((product: Product) => ({
          ...product,
          status: determineStockStatus(product)
        }))

        setProducts(productsWithStatus)
        setPagination({
          total: data.total,
          page: data.page,
          pageSize: data.pageSize,
          totalPages: data.totalPages
        })
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(err instanceof Error ? err : new Error('Failed to fetch products'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [page, pageSize, sortBy, sortOrder, search, category]) // Dependencies updated to use state variables

  const determineStockStatus = (product: Product): 'in_stock' | 'low_stock' | 'out_of_stock' => {
    if (product.stockLevel <= 0) return 'out_of_stock'
    if (product.minStockLevel && product.stockLevel <= product.minStockLevel) return 'low_stock'
    return 'in_stock'
  }

  return {
    products,
    isLoading,
    error,
    pagination,
    // Return the state setters directly
    setPage,
    setPageSize,
    setSortBy,
    setSortOrder,
    setSearch,
    setCategory
  }
} 