"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";


// Define the product schema for validation
const productSchema = z.object({
    name: z.string().min(2),
    sku: z.string().min(3),
    description: z.string().optional(),
    category: z.string().min(1),
    unitOfMeasure: z.string().min(1),
    width: z.coerce.number().min(0).optional(),
    height: z.coerce.number().min(0).optional(),
    length: z.coerce.number().min(0).optional(),
    weight: z.coerce.number().min(0).optional(),
    unitPrice: z.coerce.number().min(0),
    costPrice: z.coerce.number().min(0),
    minStockLevel: z.coerce.number().min(0).optional(),
    maxStockLevel: z.coerce.number().min(0).optional(),
    reorderPoint: z.coerce.number().min(0).optional(),
    defaultLocation: z.string().optional(),
    barcode: z.string().optional(),
    isActive: z.boolean().default(true),
    isTaxable: z.boolean().default(true),
  })

  type ProductData = z.infer<typeof productSchema>;

  export async function createProduct(data: ProductData) {
    try{
        //Validate the data
        const validatedData = productSchema.safeParse(data);
        if (!validatedData.success) {
            return {error: "Invalid fields"};
        }
        
        //Make the request to create the product
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validatedData.data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null)
            return {
                success: false,
                message: errorData?.message || `Failed to create product: ${response.status} ${response.statusText}`,
            }
        }   

        //Revalidate the product list
        revalidatePath("/products");

        return {
            success: true,
            message: "Product created successfully",
        }
    } catch (error) {
        console.error("Error creating product:", error)
    
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
