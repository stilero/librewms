using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;

namespace LibreWms.Api.Features.Products;

public static class GetProducts
{
    public static void MapGetProductsEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/api/products", async (ProductsDbContext db, HttpContext context) =>
        {
            var products = await db.Products.ToListAsync();
            await context.Response.WriteAsJsonAsync(products);
        })
        .WithName("GetProducts")
        .WithTags("Products");
    }
}