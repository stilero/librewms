import '@testing-library/jest-dom'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import ProductsPage from '../page'
import { useProducts } from '../hooks/useProducts'

// Mock the useProducts hook
jest.mock('../hooks/useProducts')
const mockedUseProducts = jest.mocked(useProducts);

const mockProducts = [
  {
    id: '1',
    sku: 'SKU-7723',
    name: 'Premium Headphones',
    category: 'Electronics',
    unitOfMeasure: 'unit',
    stockLevel: 5,
    unitPrice: 129.99,
    costPrice: 80.00,
    status: 'low_stock' as 'low_stock',
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
    status: 'low_stock' as 'low_stock',
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
    mockedUseProducts.mockReturnValue({
      products: [],
      isLoading: true,
      error: null,
      pagination: mockPagination,
      setPage: jest.fn(),
      setPageSize: jest.fn(),
      setSortBy: jest.fn(),
      setSortOrder: jest.fn(),
      setSearch: jest.fn(),
      setCategory: jest.fn()
    })

    render(<ProductsPage />)
    expect(screen.getByText('Loading products...')).toBeInTheDocument()
  })

  it('displays error message when API call fails', () => {
    const errorMessage = 'Failed to fetch products'
    mockedUseProducts.mockReturnValue({
      products: [],
      isLoading: false,
      error: new Error(errorMessage),
      pagination: mockPagination,
      setPage: jest.fn(),
      setPageSize: jest.fn(),
      setSortBy: jest.fn(),
      setSortOrder: jest.fn(),
      setSearch: jest.fn(),
      setCategory: jest.fn()
    })

    render(<ProductsPage />)
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('displays products when API call succeeds', async () => {
    mockedUseProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
      error: null,
      pagination: mockPagination,
      setPage: jest.fn(),
      setPageSize: jest.fn(),
      setSortBy: jest.fn(),
      setSortOrder: jest.fn(),
      setSearch: jest.fn(),
      setCategory: jest.fn()
    })

    render(<ProductsPage />)

    // Use findByText for async queries
    expect(await screen.findByText('Premium Headphones')).toBeInTheDocument()
    expect(await screen.findByText('Wireless Keyboard')).toBeInTheDocument()
  })

  it('displays empty state when no products are available', async () => {
    mockedUseProducts.mockReturnValue({
      products: [],
      isLoading: false,
      error: null,
      pagination: { ...mockPagination, total: 0, totalPages: 0 },
      setPage: jest.fn(),
      setPageSize: jest.fn(),
      setSortBy: jest.fn(),
      setSortOrder: jest.fn(),
      setSearch: jest.fn(),
      setCategory: jest.fn()
    })

    render(<ProductsPage />)
    // Use findByText for async queries
    expect(await screen.findByText('No products found')).toBeInTheDocument()
  })

  it('handles pagination correctly', async () => {
    const mockUseProducts = mockedUseProducts
    mockUseProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
      error: null,
      pagination: mockPagination,
      setPage: jest.fn(),
      setPageSize: jest.fn(),
      setSortBy: jest.fn(),
      setSortOrder: jest.fn(),
      setSearch: jest.fn(),
      setCategory: jest.fn()
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
      pagination: { ...mockPagination, page: 2 },
      setPage: jest.fn(),
      setPageSize: jest.fn(),
      setSortBy: jest.fn(),
      setSortOrder: jest.fn(),
      setSearch: jest.fn(),
      setCategory: jest.fn()
    })

    fireEvent.click(screen.getByText('Previous'))
    await waitFor(() => {
      expect(mockUseProducts).toHaveBeenCalledWith(expect.objectContaining({
        page: 1,
        pageSize: 10
      }))
    })
  })

  it('handles sorting for all supported columns and ignores unsupported columns', async () => {
    const mockUseProducts = mockedUseProducts
    mockUseProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
      error: null,
      pagination: mockPagination,
      setPage: jest.fn(),
      setPageSize: jest.fn(),
      setSortBy: jest.fn(),
      setSortOrder: jest.fn(),
      setSearch: jest.fn(),
      setCategory: jest.fn()
    })

    render(<ProductsPage />)

    // Supported columns
    const supported = [
      { label: 'SKU', sortBy: 'sku' },
      { label: 'Product Name', sortBy: 'name' },
      { label: 'Category', sortBy: 'category' }
    ]
    for (const { label, sortBy } of supported) {
      fireEvent.click(screen.getByText(label))
      await waitFor(() => {
        expect(mockUseProducts).toHaveBeenCalledWith(expect.objectContaining({
          sortBy,
          sortOrder: 'asc'
        }))
      })
      fireEvent.click(screen.getByText(label))
      await waitFor(() => {
        expect(mockUseProducts).toHaveBeenCalledWith(expect.objectContaining({
          sortBy,
          sortOrder: 'desc'
        }))
      })
    }

    // Unsupported columns
    const unsupported = ['Stock', 'Unit Price', 'Status']
    for (const label of unsupported) {
      mockUseProducts.mockClear()
      fireEvent.click(screen.getByText(label))
      // Should not trigger a new call with that label as sortBy
      expect(mockUseProducts).not.toHaveBeenCalledWith(expect.objectContaining({ sortBy: label }))
    }
  })

  it('supports keyboard accessibility for sorting', async () => {
    const mockUseProducts = mockedUseProducts
    mockUseProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
      error: null,
      pagination: mockPagination,
      setPage: jest.fn(),
      setPageSize: jest.fn(),
      setSortBy: jest.fn(),
      setSortOrder: jest.fn(),
      setSearch: jest.fn(),
      setCategory: jest.fn()
    })

    render(<ProductsPage />)

    // Tab to SKU header and press Enter
    const skuHeader = screen.getByRole('button', { name: /sort by sku/i })
    skuHeader.focus()
    fireEvent.keyDown(skuHeader, { key: 'Enter', code: 'Enter' })
    await waitFor(() => {
      expect(mockUseProducts).toHaveBeenCalledWith(expect.objectContaining({
        sortBy: 'sku',
        sortOrder: 'asc'
      }))
    })

    // Tab to Name header and press Space
    const nameHeader = screen.getByRole('button', { name: /sort by product name/i })
    nameHeader.focus()
    fireEvent.keyDown(nameHeader, { key: ' ', code: 'Space' })
    await waitFor(() => {
      expect(mockUseProducts).toHaveBeenCalledWith(expect.objectContaining({
        sortBy: 'name',
        sortOrder: 'asc'
      }))
    })
  })

  it('handles search correctly', async () => {
    const mockUseProducts = mockedUseProducts
    mockUseProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
      error: null,
      pagination: mockPagination,
      setPage: jest.fn(),
      setPageSize: jest.fn(),
      setSortBy: jest.fn(),
      setSortOrder: jest.fn(),
      setSearch: jest.fn(),
      setCategory: jest.fn()
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
    const mockUseProducts = mockedUseProducts
    mockUseProducts.mockReturnValue({
      products: mockProducts,
      isLoading: false,
      error: null,
      pagination: mockPagination,
      setPage: jest.fn(),
      setPageSize: jest.fn(),
      setSortBy: jest.fn(),
      setSortOrder: jest.fn(),
      setSearch: jest.fn(),
      setCategory: jest.fn()
    })

    render(<ProductsPage />)

    // Open category dropdown
    fireEvent.click(screen.getByRole('combobox'))
    // Select Electronics category (pick the dropdown item, not the table cell)
    const electronicsOptions = screen.getAllByText('Electronics')
    // The dropdown item is usually the last one
    fireEvent.click(electronicsOptions[electronicsOptions.length - 1])

    await waitFor(() => {
      expect(mockUseProducts).toHaveBeenCalledWith(expect.objectContaining({
        category: 'electronics'
      }))
    })
  })
}) 