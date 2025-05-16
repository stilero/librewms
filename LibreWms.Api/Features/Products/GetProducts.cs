using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace LibreWms.Api.Features.Products;

public static class GetProducts
{
    public static void MapGetProductsEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/api/products", async (HttpContext context) =>
        {
            // In-memory example, replace with real data access later
            var products = new List<Product>
            {
                new Product { Id = Guid.NewGuid(), Name = "Sample Product", Sku = "SKU001", Description = "A sample product", Quantity = 100 }
            };
            await context.Response.WriteAsJsonAsync(products);
        })
        .WithName("GetProducts")
        .WithTags("Products");
    }
}