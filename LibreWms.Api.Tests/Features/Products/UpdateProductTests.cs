using System;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using LibreWms.Api.Features.Products;
using LibreWms.Api.Data;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace LibreWms.Api.Tests.Features.Products
{
    // Custom factory to override the database for tests
    public class CustomWebApplicationFactory : WebApplicationFactory<Program>
    {
        private readonly string _dbName = $"TestDb-UpdateProduct-{Guid.NewGuid()}";
        protected override void ConfigureWebHost(Microsoft.AspNetCore.Hosting.IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                // Remove all LibreWmsDbContext and DbContextOptions registrations (scoped, generic, etc.)
                var toRemove = services.Where(d =>
                    d.ServiceType == typeof(LibreWmsDbContext) ||
                    d.ServiceType == typeof(DbContextOptions<LibreWmsDbContext>) ||
                    (d.ServiceType.IsGenericType &&
                     d.ServiceType.GetGenericTypeDefinition() == typeof(DbContextOptions<>) &&
                     d.ServiceType.GenericTypeArguments[0] == typeof(LibreWmsDbContext)) ||
                    (d.ImplementationType != null && d.ImplementationType.FullName != null && d.ImplementationType.FullName.Contains("Npgsql")) ||
                    (d.ImplementationFactory != null && d.ImplementationFactory.Method.ReturnType.FullName != null && d.ImplementationFactory.Method.ReturnType.FullName.Contains("Npgsql"))
                ).ToList();
                foreach (var d in toRemove)
                    services.Remove(d);

                // Register only the InMemory provider and use a new internal service provider for EF Core
                services.AddEntityFrameworkInMemoryDatabase();
                services.AddDbContext<LibreWmsDbContext>((serviceProvider, options) =>
                {
                    options.UseInMemoryDatabase(_dbName)
                           .UseInternalServiceProvider(serviceProvider);
                });
            });
        }
    }

    public class UpdateProductTests : IClassFixture<CustomWebApplicationFactory>
    {
        private readonly CustomWebApplicationFactory _factory;

        public UpdateProductTests(CustomWebApplicationFactory factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task UpdateProduct_Success()
        {
            var client = _factory.CreateClient();
            Guid productId;
            using (var scope = _factory.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<LibreWmsDbContext>();
                var product = new Product
                {
                    Id = Guid.NewGuid(),
                    Name = "Test Product",
                    Sku = "SKU1",
                    Category = "Cat",
                    UnitOfMeasure = "pcs",
                    IsActive = true,
                    IsTaxable = true
                };
                db.Products.Add(product);
                db.SaveChanges();
                productId = product.Id;
            }

            var update = new Product
            {
                Id = productId,
                Name = "Updated Name",
                Sku = "SKU2",
                Category = "Cat2",
                UnitOfMeasure = "kg",
                IsActive = false,
                IsTaxable = false
            };

            var response = await client.PutAsJsonAsync($"/api/products/{productId}", update);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var updated = await response.Content.ReadFromJsonAsync<Product>();
            Assert.Equal("Updated Name", updated!.Name);
            Assert.Equal("SKU2", updated.Sku);
            Assert.Equal("kg", updated.UnitOfMeasure);
            Assert.False(updated.IsActive);
        }

        [Fact]
        public async Task UpdateProduct_NotFound()
        {
            var client = _factory.CreateClient();
            var update = new Product { Id = Guid.NewGuid(), Name = "X", UnitOfMeasure = "pcs" };
            var response = await client.PutAsJsonAsync($"/api/products/{update.Id}", update);
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async Task UpdateProduct_ValidationError()
        {
            var client = _factory.CreateClient();
            Guid productId;
            using (var scope = _factory.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<LibreWmsDbContext>();
                var product = new Product { Id = Guid.NewGuid(), Name = "A", Sku = "B", Category = "C", UnitOfMeasure = "pcs" };
                db.Products.Add(product);
                db.SaveChanges();
                productId = product.Id;
            }
            var update = new Product { Id = productId, Name = "", UnitOfMeasure = "" };
            var response = await client.PutAsJsonAsync($"/api/products/{productId}", update);
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        }
    }
}
