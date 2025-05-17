import type { Metadata } from "next"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddProductForm } from "@/components/add-product-form"

export const metadata: Metadata = {
  title: "Add Product - LibreWarehouse",
  description: "Add a new product to your inventory",
}

export default function AddProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <a href="/products">
              <ArrowLeft className="h-4 w-4" />
            </a>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
        </div>
      </div>

      <div className="grid gap-6">
        <AddProductForm />
      </div>
    </div>
  )
}