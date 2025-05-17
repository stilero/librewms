using LibreWms.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace LibreWms.Api.Features.Locations;

public static class GetLocations
{
    public static void MapGetLocationsEndpoint(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/locations", async (LibreWmsDbContext db) =>
            await db.Locations.ToListAsync())
            .WithName("GetLocations")
            .WithTags("Locations")
            .WithOpenApi(operation => new(operation)
            {
                Summary = "Gets all locations",
                Description = "Returns a list of all defined warehouse storage locations."
            });
    }
}
