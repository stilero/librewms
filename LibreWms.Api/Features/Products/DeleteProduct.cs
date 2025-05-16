using LibreWms.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace LibreWms.Api.Features.Products;

public static class DeleteProduct
{
    public static void MapDeleteProductEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapDelete("/api/products/{id:guid}", async (Guid id, LibreWmsDbContext db, HttpContext context) =>
        {
            var product = await db.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product == null || product.IsDeleted)
            {
                context.Response.StatusCode = StatusCodes.Status404NotFound;
                await context.Response.WriteAsJsonAsync(new { error = "Product not found." });
                return;
            }
            product.IsDeleted = true;
            await db.SaveChangesAsync();
            context.Response.StatusCode = StatusCodes.Status204NoContent;
        })
        .WithName("DeleteProduct")
        .WithTags("Products");
    }
}