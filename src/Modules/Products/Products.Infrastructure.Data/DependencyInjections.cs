using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using BuildingBlocks.Application.Interfaces;
using Products.Application.Features.Products.Common.Repositories;
using Products.Application.Features.ProductImports.Interfaces;

namespace Products.Infrastructure.Data;

public static class DependencyInjections
{

    public static IServiceCollection AddProductsInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        ArgumentNullException.ThrowIfNull(configuration, nameof(configuration));

        services.AddDatabase(configuration);
        services.AddRepositories();

        return services;
    }

    public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
    {
        ArgumentNullException.ThrowIfNull(configuration, nameof(configuration));

        var connectionString = configuration.GetConnectionString("SqlServer")
            ?? configuration["ConnectionStrings__SqlServer"]
            ?? throw new ArgumentException("Connection string not found");

        //services.AddSingleton<DomainEventsInterceptor>();
        //services.AddSingleton<AuditSaveChangesInterceptor>();

        services.AddDbContext<ProductsDbContext>((sp, options) =>
        {
            //var domainEventsInterceptor = sp.GetRequiredService<DomainEventsInterceptor>();
            //var auditSaveChangesInterceptor = sp.GetRequiredService<AuditSaveChangesInterceptor>();
            options.UseSqlServer(connectionString);
                //.AddInterceptors(auditSaveChangesInterceptor);
        });
        return services;
    }

    public static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddScoped<IUnitOfWork, ProductsUnitOfWork>();
        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped<IProductImportRepository, ProductImportRepository>();
        services.AddScoped<IProductImportLineRepository, ProductImportLineRepository>();
        return services;
    }

}
