using System.Reflection;

using BuildingBlocks.Application.Messaging.Behaviors;

using FluentValidation;

using Microsoft.Extensions.DependencyInjection;

using Products.Application.Features.ProductImports.Interfaces;
using Products.Application.Features.ProductImports.Services;

namespace Products.Application;

public static class DependencyInjections
{
    public static IServiceCollection AddProductsApplication(this IServiceCollection services)
    {
        var thisAssembly = Assembly.GetExecutingAssembly();
        services.AddValidatorsFromAssembly(thisAssembly);
        services.AddMediatR(config =>
        {

            config.AddOpenBehavior(typeof(FluentValidationBehavior<,>));
            //config.AddOpenBehavior(typeof(UnitOfWorkBehavior<,>));
            config.RegisterServicesFromAssembly(thisAssembly);
        });
        services.AddScoped<IProductImportService, ProductImportService>();
        return services;
    }
}
