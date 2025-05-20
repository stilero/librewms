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
  refreshKey?: number
}

interface ProductsResponse {
  items: Product[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export const useProducts = (options: UseProductsOptions = {}) => {
  // Remove internal state for page, pageSize, sortBy, sortOrder, search, category
  const { page = 1, pageSize = 10, sortBy = 'name', sortOrder = 'asc', search = '', category = '' } = options

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
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 
          (typeof window !== 'undefined' ? window.ENV?.NEXT_PUBLIC_API_URL : '') || 
          ''
        
        // Detailed debugging
        console.log('Environment Debug Info:', {
          processEnvApiUrl: process.env.NEXT_PUBLIC_API_URL,
          windowEnvApiUrl: typeof window !== 'undefined' ? window.ENV?.NEXT_PUBLIC_API_URL : undefined,
          finalApiUrl: apiUrl,
          isWindowDefined: typeof window !== 'undefined',
          windowEnvExists: typeof window !== 'undefined' && window.ENV !== undefined
        })

        const fullUrl = `${apiUrl}/api/products?${params}`
        console.log('Full request URL:', fullUrl)
        console.log('Request parameters:', Object.fromEntries(params.entries()))
        
        const response = await fetch(fullUrl)
        
        // Log response details before checking if it's ok
        console.log('Response status:', response.status)
        console.log('Response status text:', response.statusText)
        
        if (!response.ok) {
          console.error('Response error details:', {
            status: response.status,
            statusText: response.statusText,
            url: fullUrl,
            headers: Object.fromEntries(response.headers.entries())
          })
          throw new Error(`Failed to fetch products: ${response.status} ${response.statusText} (Url: ${fullUrl})`)
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
  }, [page, pageSize, sortBy, sortOrder, search, category, options.refreshKey])

  const determineStockStatus = (product: Product): 'in_stock' | 'low_stock' | 'out_of_stock' => {
    if (product.stockLevel <= 0) return 'out_of_stock'
    if (product.minStockLevel && product.stockLevel <= product.minStockLevel) return 'low_stock'
    return 'in_stock'
  }

  return {
    products,
    isLoading,
    error,
    pagination
  }
} 