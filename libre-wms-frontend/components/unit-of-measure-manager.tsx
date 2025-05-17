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
import { Plus, MoreHorizontal, Edit, Trash, Ruler } from "lucide-react"
import { createUnitOfMeasure, updateUnitOfMeasure, deleteUnitOfMeasure } from "@/app/actions/unit-actions"

// Define the form schema with validation
const uomFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  abbreviation: z.string().min(1, { message: "Abbreviation is required." }),
  description: z.string().optional(),
})

type UomFormValues = z.infer<typeof uomFormSchema>

// Mock data for initial units of measure
const initialUnits = [
  {
    id: "1",
    name: "Each",
    abbreviation: "ea",
    description: "Individual items",
    productCount: 56,
  },
  {
    id: "2",
    name: "Box",
    abbreviation: "box",
    description: "Standard box packaging",
    productCount: 23,
  },
  {
    id: "3",
    name: "Case",
    abbreviation: "case",
    description: "Multiple items packaged together",
    productCount: 18,
  },
  {
    id: "4",
    name: "Pallet",
    abbreviation: "pallet",
    description: "Standard shipping pallet",
    productCount: 7,
  },
  {
    id: "5",
    name: "Kilogram",
    abbreviation: "kg",
    description: "Metric weight measurement",
    productCount: 12,
  },
  {
    id: "6",
    name: "Gram",
    abbreviation: "g",
    description: "Metric weight measurement (small)",
    productCount: 5,
  },
  {
    id: "7",
    name: "Liter",
    abbreviation: "L",
    description: "Metric volume measurement",
    productCount: 9,
  },
  {
    id: "8",
    name: "Meter",
    abbreviation: "m",
    description: "Metric length measurement",
    productCount: 4,
  },
]

export function UnitOfMeasureManager() {
  const [units, setUnits] = useState(initialUnits)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentUnit, setCurrentUnit] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize the form
  const form = useForm<UomFormValues>({
    resolver: zodResolver(uomFormSchema),
    defaultValues: {
      name: "",
      abbreviation: "",
      description: "",
    },
  })

  const editForm = useForm<UomFormValues>({
    resolver: zodResolver(uomFormSchema),
    defaultValues: {
      name: "",
      abbreviation: "",
      description: "",
    },
  })

  // Handle add form submission
  async function onAddSubmit(data: UomFormValues) {
    setIsSubmitting(true)

    try {
      // Call the server action to create the unit of measure
      const result = await createUnitOfMeasure(data)

      if (result.success) {
        // Add the new unit to the state
        setUnits([
          ...units,
          {
            id: Math.random().toString(36).substring(7), // Mock ID generation
            ...data,
            productCount: 0,
          },
        ])

        toast({
          title: "Unit of measure created",
          description: `${data.name} has been added to your units of measure.`,
        })

        setIsAddDialogOpen(false)
        form.reset()
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to create unit of measure. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      console.error("Error creating unit of measure:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle edit form submission
  async function onEditSubmit(data: UomFormValues) {
    setIsSubmitting(true)

    try {
      // Call the server action to update the unit of measure
      const result = await updateUnitOfMeasure(currentUnit.id, data)

      if (result.success) {
        // Update the unit in the state
        setUnits(units.map((unit) => (unit.id === currentUnit.id ? { ...unit, ...data } : unit)))

        toast({
          title: "Unit of measure updated",
          description: `${data.name} has been updated.`,
        })

        setIsEditDialogOpen(false)
        editForm.reset()
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to update unit of measure. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      console.error("Error updating unit of measure:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle unit deletion
  async function onDelete() {
    setIsSubmitting(true)

    try {
      // Call the server action to delete the unit of measure
      const result = await deleteUnitOfMeasure(currentUnit.id)

      if (result.success) {
        // Remove the unit from the state
        setUnits(units.filter((unit) => unit.id !== currentUnit.id))

        toast({
          title: "Unit of measure deleted",
          description: `${currentUnit.name} has been deleted.`,
        })

        setIsDeleteDialogOpen(false)
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to delete unit of measure. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      console.error("Error deleting unit of measure:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle edit button click
  function handleEdit(unit: any) {
    setCurrentUnit(unit)
    editForm.reset({
      name: unit.name,
      abbreviation: unit.abbreviation,
      description: unit.description || "",
    })
    setIsEditDialogOpen(true)
  }

  // Handle delete button click
  function handleDelete(unit: any) {
    setCurrentUnit(unit)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">{units.length} units of measure</div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Unit of Measure
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Unit of Measure</DialogTitle>
              <DialogDescription>
                Create a new unit of measure for your products. Units of measure define how products are quantified.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onAddSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Kilogram" {...field} />
                      </FormControl>
                      <FormDescription>The full name of this unit of measure</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="abbreviation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Abbreviation</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., kg" {...field} />
                      </FormControl>
                      <FormDescription>A short abbreviation used for display</FormDescription>
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
                          placeholder="Enter a description for this unit of measure"
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
                    {isSubmitting ? "Creating..." : "Create Unit"}
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
              <TableHead>Abbreviation</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Products</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {units.map((unit) => (
              <TableRow key={unit.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <Ruler className="h-4 w-4 text-gray-500" />
                    </div>
                    <span className="font-medium">{unit.name}</span>
                  </div>
                </TableCell>
                <TableCell>{unit.abbreviation}</TableCell>
                <TableCell className="max-w-[300px] truncate">{unit.description || "—"}</TableCell>
                <TableCell className="text-center">{unit.productCount}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(unit)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(unit)}
                        className="text-red-600"
                        disabled={unit.productCount > 0}
                      >
                        <Trash className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {units.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  No units of measure found. Create your first unit to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Unit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Unit of Measure</DialogTitle>
            <DialogDescription>Update the details for this unit of measure.</DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="abbreviation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Abbreviation</FormLabel>
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
              {currentUnit?.productCount > 0 ? (
                <span className="text-red-500">
                  This unit of measure cannot be deleted because it is used by {currentUnit?.productCount} products.
                </span>
              ) : (
                "This action cannot be undone. This will permanently delete the unit of measure."
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDelete}
              disabled={currentUnit?.productCount > 0 || isSubmitting}
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
