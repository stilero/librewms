"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"
import { Plus, MoreHorizontal, Edit, Trash, Tag } from "lucide-react"
import { createCategory, updateCategory, deleteCategory } from "@/app/actions/category-actions"

// Define the form schema with validation
const categoryFormSchema = z.object({
  name: z.string().min(2, { message: "Category name must be at least 2 characters." }),
  code: z.string().min(1, { message: "Category code is required." }),
  description: z.string().optional(),
})

type CategoryFormValues = z.infer<typeof categoryFormSchema>

// Mock data for initial categories
const initialCategories = [
  {
    id: "1",
    name: "Electronics",
    code: "ELEC",
    description: "Electronic devices and accessories",
    productCount: 42,
  },
  {
    id: "2",
    name: "Clothing",
    code: "CLTH",
    description: "Apparel and wearable items",
    productCount: 28,
  },
  {
    id: "3",
    name: "Furniture",
    code: "FURN",
    description: "Home and office furniture",
    productCount: 15,
  },
  {
    id: "4",
    name: "Food & Beverage",
    code: "FOOD",
    description: "Consumable food and drink products",
    productCount: 36,
  },
  {
    id: "5",
    name: "Office Supplies",
    code: "OFFC",
    description: "Supplies and equipment for office use",
    productCount: 22,
  },
]

export function CategoryManager() {
  const [categories, setCategories] = useState(initialCategories)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize the form
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
    },
  })

  const editForm = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
    },
  })

  // Handle add form submission
  async function onAddSubmit(data: CategoryFormValues) {
    setIsSubmitting(true)

    try {
      // Call the server action to create the category
      const result = await createCategory(data)

      if (result.success) {
        // Add the new category to the state
        setCategories([
          ...categories,
          {
            id: Math.random().toString(36).substring(7), // Mock ID generation
            ...data,
            productCount: 0,
          },
        ])

        toast({
          title: "Category created",
          description: `${data.name} has been added to your categories.`,
        })

        setIsAddDialogOpen(false)
        form.reset()
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to create category. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      console.error("Error creating category:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle edit form submission
  async function onEditSubmit(data: CategoryFormValues) {
    setIsSubmitting(true)

    try {
      // Call the server action to update the category
      const result = await updateCategory(currentCategory.id, data)

      if (result.success) {
        // Update the category in the state
        setCategories(categories.map((cat) => (cat.id === currentCategory.id ? { ...cat, ...data } : cat)))

        toast({
          title: "Category updated",
          description: `${data.name} has been updated.`,
        })

        setIsEditDialogOpen(false)
        editForm.reset()
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update category. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      console.error("Error updating category:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle category deletion
  async function onDelete() {
    setIsSubmitting(true)

    try {
      // Call the server action to delete the category
      const result = await deleteCategory(currentCategory.id)

      if (result.success) {
        // Remove the category from the state
        setCategories(categories.filter((cat) => cat.id !== currentCategory.id))

        toast({
          title: "Category deleted",
          description: `${currentCategory.name} has been deleted.`,
        })

        setIsDeleteDialogOpen(false)
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to delete category. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      console.error("Error deleting category:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle edit button click
  function handleEdit(category: any) {
    setCurrentCategory(category)
    editForm.reset({
      name: category.name,
      code: category.code,
      description: category.description || "",
    })
    setIsEditDialogOpen(true)
  }

  // Handle delete button click
  function handleDelete(category: any) {
    setCurrentCategory(category)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">{categories.length} categories</div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Create a new product category. Categories help organize your products for easier management and
                searching.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onAddSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Electronics" {...field} />
                      </FormControl>
                      <FormDescription>The display name for this category</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Code</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., ELEC" {...field} />
                      </FormControl>
                      <FormDescription>A short code used for identification</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter a description for this category"
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Category"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Products</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <Tag className="h-4 w-4 text-gray-500" />
                    </div>
                    <span className="font-medium">{category.name}</span>
                  </div>
                </TableCell>
                <TableCell>{category.code}</TableCell>
                <TableCell className="max-w-[300px] truncate">{category.description || "—"}</TableCell>
                <TableCell className="text-center">{category.productCount}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(category)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(category)}
                        className="text-red-600"
                        disabled={category.productCount > 0}
                      >
                        <Trash className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {categories.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No categories found. Create your first category to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update the details for this product category.</DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea className="min-h-[80px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {currentCategory?.productCount > 0 ? (
                <span className="text-red-500">
                  This category cannot be deleted because it is used by {currentCategory?.productCount} products.
                </span>
              ) : (
                "This action cannot be undone. This will permanently delete the category."
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDelete}
              disabled={currentCategory?.productCount > 0 || isSubmitting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isSubmitting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
