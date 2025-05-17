"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

// Define the unit of measure schema for validation
const uomSchema = z.object({
  name: z.string().min(2),
  abbreviation: z.string().min(1),
  description: z.string().optional(),
})

type UomData = z.infer<typeof uomSchema>

export async function createUnitOfMeasure(data: UomData) {
  try {
    // Validate the input data
    const validatedData = uomSchema.parse(data)

    // Make the API call to create the unit of measure
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/units-of-measure`, {
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
        message: errorData?.message || `Failed to create unit of measure: ${response.status} ${response.statusText}`,
      }
    }

    // Revalidate the page to show the new unit
    revalidatePath("/settings/product-properties")

    return { success: true }
  } catch (error) {
    console.error("Error creating unit of measure:", error)

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

export async function updateUnitOfMeasure(id: string, data: UomData) {
  try {
    // Validate the input data
    const validatedData = uomSchema.parse(data)

    // Make the API call to update the unit of measure
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/units-of-measure/${id}`, {
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
        message: errorData?.message || `Failed to update unit of measure: ${response.status} ${response.statusText}`,
      }
    }

    // Revalidate the page to show the updated unit
    revalidatePath("/settings/product-properties")

    return { success: true }
  } catch (error) {
    console.error("Error updating unit of measure:", error)

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

export async function deleteUnitOfMeasure(id: string) {
  try {
    // Make the API call to delete the unit of measure
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/units-of-measure/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      return {
        success: false,
        message: errorData?.message || `Failed to delete unit of measure: ${response.status} ${response.statusText}`,
      }
    }

    // Revalidate the page to show the updated list
    revalidatePath("/settings/product-properties")

    return { success: true }
  } catch (error) {
    console.error("Error deleting unit of measure:", error)

    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}
