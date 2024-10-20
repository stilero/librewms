using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Products.Application;
using Products.Infrastructure.Data;

namespace Products.Infrastructure;

public static class DependencyInjections
{
    public static IServiceCollection AddProductsModule(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddProductsApplication();
        services.AddProductsInfrastructure(configuration);
        return services;
    }
}
