"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

// Define the category schema for validation
const categorySchema = z.object({
  name: z.string().min(2),
  code: z.string().min(1),
  description: z.string().optional(),
})

type CategoryData = z.infer<typeof categorySchema>

export async function createCategory(data: CategoryData) {
  try {
    // Validate the input data
    const validatedData = categorySchema.parse(data)

    // Make the API call to create the category
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      return {
        success: false,
        message: errorData?.message || `Failed to create category: ${response.status} ${response.statusText}`,
      }
    }

    // Revalidate the categories page to show the new category
    revalidatePath("/settings/product-properties")

    return { success: true }
  } catch (error) {
    console.error("Error creating category:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: `Validation error: ${error.errors.map((e) => e.message).join(", ")}`,
      }
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

export async function updateCategory(id: string, data: CategoryData) {
  try {
    // Validate the input data
    const validatedData = categorySchema.parse(data)

    // Make the API call to update the category
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      return {
        success: false,
        message: errorData?.message || `Failed to update category: ${response.status} ${response.statusText}`,
      }
    }

    // Revalidate the categories page to show the updated category
    revalidatePath("/settings/product-properties")

    return { success: true }
  } catch (error) {
    console.error("Error updating category:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: `Validation error: ${error.errors.map((e) => e.message).join(", ")}`,
      }
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

export async function deleteCategory(id: string) {
  try {
    // Make the API call to delete the category
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/categories/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      return {
        success: false,
        message: errorData?.message || `Failed to delete category: ${response.status} ${response.statusText}`,
      }
    }

    // Revalidate the categories page to show the updated list
    revalidatePath("/settings/product-properties")

    return { success: true }
  } catch (error) {
    console.error("Error deleting category:", error)

    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}
