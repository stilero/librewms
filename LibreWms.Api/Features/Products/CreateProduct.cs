using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;

namespace LibreWms.Api.Features.Products;

public static class CreateProduct
{
    public static void MapCreateProductEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost("/api/products", async (Product product, ProductsDbContext db, HttpContext context) =>
        {
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