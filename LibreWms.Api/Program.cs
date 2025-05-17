using LibreWms.Api.Data;
using LibreWms.Api.Features.Products;
using LibreWms.Api.Features.Locations;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.AddServiceDefaults();


// Add EF Core with Postgres
builder.Services.AddDbContext<LibreWmsDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container.
builder.Services.AddOpenApi();

var app = builder.Build();
app.MapDefaultEndpoints();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGetProductsEndpoint();
app.MapCreateProductEndpoint();
app.MapDeleteProductEndpoint();

// Register location endpoints
app.MapLocationEndpoints();

app.Run();
