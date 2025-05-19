using LibreWms.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace LibreWms.Api.Features.Products;

public static class GetProductById
{
    public static void MapGetProductByIdEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/api/products/{id:guid}", async (Guid id, LibreWmsDbContext db, HttpContext context) =>
        {
            var product = await db.Products.FirstOrDefaultAsync(p => p.Id == id && !p.IsDeleted);
            if (product == null)
            {
                context.Response.StatusCode = StatusCodes.Status404NotFound;
                await context.Response.WriteAsJsonAsync(new { error = "Product not found." });
                return;
            }
            await context.Response.WriteAsJsonAsync(product);
        })
        .WithName("GetProductById")
        .WithTags("Products")
        .WithOpenApi(operation => new(operation)
        {
            Summary = "Gets a product by its id",
            Description = "Returns a single product by its unique identifier."
        });
    }
}
