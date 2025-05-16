using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;

namespace LibreWms.Api.Features.Products;

public static class GetProducts
{
    public static void MapGetProductsEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/api/products", async (
            ProductsDbContext db,
            HttpContext context,
            string? name,
            string? category,
            string? unitOfMeasure,
            string? sortBy,
            string? sortOrder
        ) =>
        {
            var query = db.Products.Where(p => !p.IsDeleted).AsQueryable();

            // Filtering
            if (!string.IsNullOrWhiteSpace(name))
                query = query.Where(p => p.Name.Contains(name));
            if (!string.IsNullOrWhiteSpace(category))
                query = query.Where(p => p.Category == category);
            if (!string.IsNullOrWhiteSpace(unitOfMeasure))
                query = query.Where(p => p.UnitOfMeasure == unitOfMeasure);

            // Sorting
            bool desc = string.Equals(sortOrder, "desc", StringComparison.OrdinalIgnoreCase);
            query = sortBy switch
            {
                "name" => desc ? query.OrderByDescending(p => p.Name) : query.OrderBy(p => p.Name),
                "createdAt" => desc ? query.OrderByDescending(p => p.CreatedAt) : query.OrderBy(p => p.CreatedAt),
                _ => query.OrderBy(p => p.Name)
            };

            var products = await query.ToListAsync();
            await context.Response.WriteAsJsonAsync(products);
        })
        .WithName("GetProducts")
        .WithTags("Products");
    }
}