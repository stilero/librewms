using LibreWms.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace LibreWms.Api.Features.Products;

public static class CreateProduct
{
    public static void MapCreateProductEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost("/api/products", async (Product product, LibreWmsDbContext db, HttpContext context) =>
        {
            // Validation: Name and UnitOfMeasure are required
            if (string.IsNullOrWhiteSpace(product.Name) || string.IsNullOrWhiteSpace(product.UnitOfMeasure))
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                await context.Response.WriteAsJsonAsync(new { error = "Name and UnitOfMeasure are required." });
                return;
            }

            // Ensure unique Id (should be unique by DB, but check for explicit Id)
            if (await db.Products.AnyAsync(p => p.Id == product.Id))
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                await context.Response.WriteAsJsonAsync(new { error = "A product with this Id already exists." });
                return;
            }

            // If Id is empty, generate a new one
            if (product.Id == Guid.Empty)
                product.Id = Guid.NewGuid();
            product.CreatedAt = DateTime.UtcNow;
            db.Products.Add(product);
            await db.SaveChangesAsync();
            await context.Response.WriteAsJsonAsync(product);
        })
        .WithName("CreateProduct")
        .WithTags("Products");
    }
}