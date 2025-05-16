using Microsoft.EntityFrameworkCore;

namespace LibreWms.Api.Features.Products;

public class ProductsDbContext : DbContext
{
    public ProductsDbContext(DbContextOptions<ProductsDbContext> options) : base(options) { }

    public DbSet<Product> Products => Set<Product>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Sku).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Description).HasMaxLength(1000);
            entity.Property(e => e.Quantity).IsRequired();
            entity.Property(e => e.UnitOfMeasure).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Gtin).HasMaxLength(50);
            entity.Property(e => e.Weight).HasColumnType("decimal(18,2)");
            entity.Property(e => e.Category).HasMaxLength(100);
            entity.Property(e => e.CreatedAt).IsRequired();
            entity.Property(e => e.IsDeleted).IsRequired();
        });
    }
}