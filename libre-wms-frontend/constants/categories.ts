// Shared product categories for dropdowns and forms
export const PRODUCT_CATEGORIES = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'food', label: 'Food & Beverage' },
  { value: 'office', label: 'Office Supplies' },
  { value: 'other', label: 'Other' },
];

// For dropdowns that need an 'All Categories' option
export const PRODUCT_CATEGORIES_WITH_ALL = [
  { value: 'all', label: 'All Categories' },
  ...PRODUCT_CATEGORIES,
]; 