using Microsoft.AspNetCore.Routing;

namespace LibreWms.Api.Features.Locations;

public static class LocationEndpoints
{
    public static void MapLocationEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGetLocationsEndpoint();
        app.MapCreateLocationEndpoint();
        app.MapUpdateLocationEndpoint();
        app.MapDeleteLocationEndpoint();
    }
}
