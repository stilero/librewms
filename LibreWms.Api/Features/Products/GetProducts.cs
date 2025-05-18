using LibreWms.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace LibreWms.Api.Features.Products;

public class ProductsResponse
{
    public List<Product> Items { get; set; } = new();
    public int Total { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
}

public static class GetProducts
{
    public static void MapGetProductsEndpoint(this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/api/products", async (
            LibreWmsDbContext db,
            HttpContext context,
            int page = 1,
            int pageSize = 10,
            string? search = null,
            string? category = null,
            string? unitOfMeasure = null,
            string? sortBy = "name",
            string? sortOrder = "asc"
        ) =>
        {
            var query = db.Products.Where(p => !p.IsDeleted).AsQueryable();

            // Filtering
            if (!string.IsNullOrWhiteSpace(search))
                query = query.Where(p => p.Name.Contains(search) || p.Sku.Contains(search) || p.Description.Contains(search));
            if (!string.IsNullOrWhiteSpace(category))
                query = query.Where(p => p.Category == category);
            if (!string.IsNullOrWhiteSpace(unitOfMeasure))
                query = query.Where(p => p.UnitOfMeasure == unitOfMeasure);

            // Get total count before pagination
            var total = await query.CountAsync();
            var totalPages = (int)Math.Ceiling(total / (double)pageSize);

            // Sorting
            bool desc = string.Equals(sortOrder, "desc", StringComparison.OrdinalIgnoreCase);
            query = sortBy switch
            {
                "name" => desc ? query.OrderByDescending(p => p.Name) : query.OrderBy(p => p.Name),
                "sku" => desc ? query.OrderByDescending(p => p.Sku) : query.OrderBy(p => p.Sku),
                "category" => desc ? query.OrderByDescending(p => p.Category) : query.OrderBy(p => p.Category),
                "createdAt" => desc ? query.OrderByDescending(p => p.CreatedAt) : query.OrderBy(p => p.CreatedAt),
                _ => query.OrderBy(p => p.Name)
            };

            // Apply pagination
            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var response = new ProductsResponse
            {
                Items = items,
                Total = total,
                Page = page,
                PageSize = pageSize,
                TotalPages = totalPages
            };

            await context.Response.WriteAsJsonAsync(response);
        })
        .WithName("GetProducts")
        .WithTags("Products")
        .WithOpenApi(operation => new(operation)
        {
            Summary = "Gets all products with pagination",
            Description = "Returns a paginated list of products with optional filtering and sorting. Query parameters: page, pageSize, search, category, unitOfMeasure, sortBy, sortOrder."
        });
    }
}