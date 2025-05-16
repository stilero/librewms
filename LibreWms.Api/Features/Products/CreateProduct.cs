using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace LibreWms.Api.Features.Products;

public static class CreateProduct
{
    public static void MapCreateProductEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapPost("/api/products", async (Product product, HttpContext context) =>
        {
            // In-memory example, replace with real data access later
            product.Id = Guid.NewGuid();
            product.CreatedAt = DateTime.UtcNow;
            // Return the created product
            await context.Response.WriteAsJsonAsync(product);
        })
        .WithName("CreateProduct")
        .WithTags("Products");
    }
}