using LibreWms.Api.Features.Products;
using LibreWms.Api.Features.Locations;
using Microsoft.EntityFrameworkCore;

namespace LibreWms.Api.Data;

public class LibreWmsDbContext : DbContext
{
    public LibreWmsDbContext(DbContextOptions<LibreWmsDbContext> options) : base(options) { }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Location> Locations => Set<Location>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Sku).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Description).HasMaxLength(1000);
            entity.Property(e => e.StockLevel).IsRequired();
            entity.Property(e => e.UnitOfMeasure).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Gtin).HasMaxLength(50);
            entity.Property(e => e.Weight).HasColumnType("decimal(18,2)");
            entity.Property(e => e.Category).HasMaxLength(100);
            entity.Property(e => e.CreatedAt).IsRequired();
            entity.Property(e => e.IsDeleted).IsRequired();
            entity.Property(e => e.Width).HasColumnType("decimal(18,2)");
            entity.Property(e => e.Height).HasColumnType("decimal(18,2)");
            entity.Property(e => e.Length).HasColumnType("decimal(18,2)");
            entity.Property(e => e.UnitPrice).HasColumnType("decimal(18,2)").IsRequired();
            entity.Property(e => e.CostPrice).HasColumnType("decimal(18,2)").IsRequired();
            entity.Property(e => e.DefaultLocation).HasMaxLength(100);
            entity.Property(e => e.Barcode).HasMaxLength(100);
            entity.Property(e => e.IsActive).IsRequired();
            entity.Property(e => e.IsTaxable).IsRequired();
        });

        modelBuilder.Entity<Location>(entity =>
        {
            entity.HasKey(e => e.LocationId);
            entity.Property(e => e.LocationId).HasMaxLength(20);
            entity.Property(e => e.Zone).IsRequired().HasMaxLength(10);
            entity.Property(e => e.Aisle).IsRequired().HasMaxLength(10);
            entity.Property(e => e.Rack).IsRequired().HasMaxLength(10);
            entity.Property(e => e.Capacity).IsRequired().HasColumnType("decimal(18,2)");
            entity.Property(e => e.Occupied).IsRequired().HasColumnType("decimal(5,2)");
            entity.Property(e => e.Items).IsRequired();
            entity.Property(e => e.Status).IsRequired().HasMaxLength(20);
        });
    }
}