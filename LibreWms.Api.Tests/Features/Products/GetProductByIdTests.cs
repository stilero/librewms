using System;
using System.Net;
using System.Net.Http.Json;
using System.Threading.Tasks;
using LibreWms.Api.Features.Products;
using LibreWms.Api.Data;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Xunit;

namespace LibreWms.Api.Tests.Features.Products
{
    public class GetProductByIdTests : IClassFixture<CustomWebApplicationFactory>
    {
        private readonly CustomWebApplicationFactory _factory;

        public GetProductByIdTests(CustomWebApplicationFactory factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task GetProductById_ReturnsProduct_WhenExists()
        {
            var client = _factory.CreateClient();
            Guid productId;
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
            using (var scope = _factory.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<LibreWmsDbContext>();
                db.Products.Add(product);
                db.SaveChanges();
                productId = product.Id;
            }

            var response = await client.GetAsync($"/api/products/{productId}");
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            var returned = await response.Content.ReadFromJsonAsync<Product>();
            Assert.NotNull(returned);
            Assert.Equal(productId, returned!.Id);
            Assert.Equal("Test Product", returned.Name);
        }

        [Fact]
        public async Task GetProductById_ReturnsNotFound_WhenNotExists()
        {
            var client = _factory.CreateClient();
            var response = await client.GetAsync($"/api/products/{Guid.NewGuid()}");
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Fact]
        public async Task GetProductById_ReturnsNotFound_WhenDeleted()
        {
            var client = _factory.CreateClient();
            Guid productId;
            var product = new Product
            {
                Id = Guid.NewGuid(),
                Name = "Deleted Product",
                Sku = "SKU2",
                Category = "Cat",
                UnitOfMeasure = "pcs",
                IsActive = true,
                IsTaxable = true,
                IsDeleted = true
            };
            using (var scope = _factory.Services.CreateScope())
            {
                var db = scope.ServiceProvider.GetRequiredService<LibreWmsDbContext>();
                db.Products.Add(product);
                db.SaveChanges();
                productId = product.Id;
            }

            var response = await client.GetAsync($"/api/products/{productId}");
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}
