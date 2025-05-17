using LibreWms.Api.Data;

namespace LibreWms.Api.Features.Locations;

public static class DeleteLocation
{
    public static void MapDeleteLocationEndpoint(this IEndpointRouteBuilder app)
    {
        app.MapDelete("/api/locations/{id}", async (string id, LibreWmsDbContext db) =>
        {
            var location = await db.Locations.FindAsync(id);
            if (location is null) return Results.NotFound();
            db.Locations.Remove(location);
            await db.SaveChangesAsync();
            return Results.NoContent();
        })
        .WithName("DeleteLocation")
        .WithTags("Locations")
        .WithOpenApi(operation => new(operation)
        {
            Summary = "Deletes a location",
            Description = "Removes a warehouse storage location from the system."
        });
    }
}
