using LibreWms.Api.Data;

namespace LibreWms.Api.Features.Locations;

public static class UpdateLocation
{
    public static void MapUpdateLocationEndpoint(this IEndpointRouteBuilder app)
    {
        app.MapPut("/api/locations/{id}", async (string id, Location updated, LibreWmsDbContext db) =>
        {
            var location = await db.Locations.FindAsync(id);
            if (location is null) return Results.NotFound();
            location.Zone = updated.Zone;
            location.Aisle = updated.Aisle;
            location.Rack = updated.Rack;
            location.Capacity = updated.Capacity;
            location.Occupied = updated.Occupied;
            location.Items = updated.Items;
            location.Status = updated.Status;
            await db.SaveChangesAsync();
            return Results.Ok(location);
        })
        .WithName("UpdateLocation")
        .WithTags("Locations")
        .WithOpenApi(operation => new(operation)
        {
            Summary = "Updates a location",
            Description = "Updates the details of an existing warehouse storage location."
        });
    }
}
