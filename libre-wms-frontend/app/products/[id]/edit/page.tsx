'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EditProductForm } from "@/components/edit-product-form"

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <a href="/products">
              <ArrowLeft className="h-4 w-4" />
            </a>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
        </div>
      </div>

      <div className="grid gap-6">
        <EditProductForm productId={params.id} />
      </div>
    </div>
  )
} 