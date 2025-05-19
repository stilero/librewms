using LibreWms.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace LibreWms.Api.Features.Products;

public static class UpdateProduct
{
    public static void MapUpdateProductEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPut("/api/products/{id}", async (Guid id, Product updatedProduct, LibreWmsDbContext db, HttpContext context) =>
        {
            var product = await db.Products.FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);
            if (product == null)
            {
                context.Response.StatusCode = StatusCodes.Status404NotFound;
                await context.Response.WriteAsJsonAsync(new { error = "Product not found." });
                return;
            }

            // Validation: Name and UnitOfMeasure are required
            if (string.IsNullOrWhiteSpace(updatedProduct.Name) || string.IsNullOrWhiteSpace(updatedProduct.UnitOfMeasure))
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                await context.Response.WriteAsJsonAsync(new { error = "Name and UnitOfMeasure are required." });
                return;
            }

            // Update fields
            product.Name = updatedProduct.Name;
            product.Sku = updatedProduct.Sku;
            product.Description = updatedProduct.Description;
            product.Category = updatedProduct.Category;
            product.UnitOfMeasure = updatedProduct.UnitOfMeasure;
            product.Width = updatedProduct.Width;
            product.Height = updatedProduct.Height;
            product.Length = updatedProduct.Length;
            product.Weight = updatedProduct.Weight;
            product.UnitPrice = updatedProduct.UnitPrice;
            product.CostPrice = updatedProduct.CostPrice;
            product.MinStockLevel = updatedProduct.MinStockLevel;
            product.MaxStockLevel = updatedProduct.MaxStockLevel;
            product.ReorderPoint = updatedProduct.ReorderPoint;
            product.DefaultLocation = updatedProduct.DefaultLocation;
            product.Barcode = updatedProduct.Barcode;
            product.IsActive = updatedProduct.IsActive;
            product.IsTaxable = updatedProduct.IsTaxable;
            product.StockLevel = updatedProduct.StockLevel;
            product.Gtin = updatedProduct.Gtin;
            // Do not update CreatedAt or IsDeleted

            await db.SaveChangesAsync();
            await context.Response.WriteAsJsonAsync(product);
        })
        .WithName("UpdateProduct")
        .WithTags("Products");
    }
}
