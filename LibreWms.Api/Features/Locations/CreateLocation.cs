using LibreWms.Api.Data;

namespace LibreWms.Api.Features.Locations;

public static class CreateLocation
{
    public static void MapCreateLocationEndpoint(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/locations", async (Location location, LibreWmsDbContext db) =>
        {
            db.Locations.Add(location);
            await db.SaveChangesAsync();
            return Results.Created($"/api/locations/{location.LocationId}", location);
        })
        .WithName("CreateLocation")
        .WithTags("Locations")
        .WithOpenApi(operation => new(operation)
        {
            Summary = "Creates a new location",
            Description = "Defines a new warehouse storage location (zone, aisle, rack, etc.)."
        });
    }
}
