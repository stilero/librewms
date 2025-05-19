using LibreWms.Api.Data;
using LibreWms.Api.Features.Products;
using LibreWms.Api.Features.Locations;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.AddServiceDefaults();

// Add CORS support
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        if (builder.Environment.IsDevelopment())
        {
            // In development, accept any localhost origin
            policy.SetIsOriginAllowed(origin => 
                new Uri(origin).Host == "localhost")
                .AllowAnyHeader()
                .AllowAnyMethod();
        }
        else
        {
            // In production, use specific origins
            policy.WithOrigins("your-production-domain.com")
                .AllowAnyHeader()
                .AllowAnyMethod();
        }
    });
});

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

// Enable CORS
app.UseCors();

// Only use HTTPS redirection in production
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.MapGetProductsEndpoint();
app.MapCreateProductEndpoint();
app.MapUpdateProductEndpoint();
app.MapDeleteProductEndpoint();

// Register location endpoints
app.MapLocationEndpoints();

app.Run();

public partial class Program { }
