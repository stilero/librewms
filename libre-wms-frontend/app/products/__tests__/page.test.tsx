import '@testing-library/jest-dom'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import ProductsPage from '../page'
import { useProducts } from '../hooks/useProducts'
import type { Product } from '../hooks/useProducts'

// Mock the useProducts hook
jest.mock('../hooks/useProducts')

const mockProducts: Product[] = [
  {
    id: '1',
    sku: 'SKU-7723',
    name: 'Premium Headphones',
    category: 'Electronics',
    unitOfMeasure: 'unit',
    stockLevel: 5,
    unitPrice: 129.99,
    costPrice: 80.00,
    status: 'low_stock',
    isActive: true,
    isTaxable: true
  },
  {
    id: '2',
    sku: 'SKU-5521',
    name: 'Wireless Keyboard',
    category: 'Electronics',
    unitOfMeasure: 'unit',
    stockLevel: 3,
    unitPrice: 59.99,
    costPrice: 35.00,
    status: 'low_stock',
    isActive: true,
    isTaxable: true
  }
]

const mockPagination = {
  total: 20,
  page: 1,
  pageSize: 10,
  totalPages: 2
}

describe('ProductsPage', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  it('displays loading state initially', () => {
    (useProducts as jest.Mock).mockReturnValue({
      products: [],
      isLoading: true,
      error: null,
      pagination: mockPagination
    })

    render(<ProductsPage />)
    expect(screen.getByText('Loading products...')).toBeInTheDocument()
  })

  it('displays error message when API call fails', () => {
    const errorMessage = 'Failed to fetch products'
    ;(useProducts as jest.Mock).mockReturnValue({
      products: [],
      isLoading: false,
      error: new Error(errorMessage),
      pagination: mockPagination
    })

    render(<ProductsPage />)
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('displays products when API call succeeds', async () => {
    ;(useProducts as jest.Mock).mockReturnValue({
      products: mockProducts,
      isLoading: false,
      error: null,
      pagination: mockPagination
    })

    render(<ProductsPage />)

    await waitFor(() => {
      expect(screen.getByText('Premium Headphones')).toBeInTheDocument()
      expect(screen.getByText('Wireless Keyboard')).toBeInTheDocument()
    })
  })

  it('displays empty state when no products are available', () => {
    ;(useProducts as jest.Mock).mockReturnValue({
      products: [],
      isLoading: false,
      error: null,
      pagination: { ...mockPagination, total: 0, totalPages: 0 }
    })

    render(<ProductsPage />)
    expect(screen.getByText('No products found')).toBeInTheDocument()
  })

  it('handles pagination correctly', async () => {
    const mockUseProducts = useProducts as jest.Mock
    mockUseProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
      error: null,
      pagination: mockPagination
    })

    render(<ProductsPage />)

    // Next page
    fireEvent.click(screen.getByText('Next'))
    await waitFor(() => {
      expect(mockUseProducts).toHaveBeenCalledWith(expect.objectContaining({
        page: 2,
        pageSize: 10
      }))
    })

    // Previous page
    mockUseProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
      error: null,
      pagination: { ...mockPagination, page: 2 }
    })

    fireEvent.click(screen.getByText('Previous'))
    await waitFor(() => {
      expect(mockUseProducts).toHaveBeenCalledWith(expect.objectContaining({
        page: 1,
        pageSize: 10
      }))
    })
  })

  it('handles sorting correctly', async () => {
    const mockUseProducts = useProducts as jest.Mock
    mockUseProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
      error: null,
      pagination: mockPagination
    })

    render(<ProductsPage />)

    // Sort by name
    fireEvent.click(screen.getByText('Product Name'))
    await waitFor(() => {
      expect(mockUseProducts).toHaveBeenCalledWith(expect.objectContaining({
        sortBy: 'name',
        sortOrder: 'asc'
      }))
    })

    // Sort by name in descending order
    fireEvent.click(screen.getByText('Product Name'))
    await waitFor(() => {
      expect(mockUseProducts).toHaveBeenCalledWith(expect.objectContaining({
        sortBy: 'name',
        sortOrder: 'desc'
      }))
    })
  })

  it('handles search correctly', async () => {
    const mockUseProducts = useProducts as jest.Mock
    mockUseProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
      error: null,
      pagination: mockPagination
    })

    render(<ProductsPage />)

    const searchInput = screen.getByPlaceholderText('Search products by name, SKU, or description...')
    fireEvent.change(searchInput, { target: { value: 'headphones' } })

    // Wait for debounce
    await waitFor(() => {
      expect(mockUseProducts).toHaveBeenCalledWith(expect.objectContaining({
        search: 'headphones'
      }))
    }, { timeout: 400 })
  })

  it('handles category filtering correctly', async () => {
    const mockUseProducts = useProducts as jest.Mock
    mockUseProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
      error: null,
      pagination: mockPagination
    })

    render(<ProductsPage />)

    // Open category dropdown
    fireEvent.click(screen.getByRole('combobox'))
    // Select Electronics category
    fireEvent.click(screen.getByText('Electronics'))

    await waitFor(() => {
      expect(mockUseProducts).toHaveBeenCalledWith(expect.objectContaining({
        category: 'electronics'
      }))
    })
  })
}) 