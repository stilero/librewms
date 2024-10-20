using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Products.Domain.ProductImport.Entities;
using Products.Domain.ProductImport.ValueObjects;
using Products.Domain.Products.ValueObjects;

namespace Products.Infrastructure.Data.Features.ProductImports.Configurations;
public class ProductImportLineConfiguration : IEntityTypeConfiguration<ProductImportLine>
{
    public void Configure(EntityTypeBuilder<ProductImportLine> builder)
    {
        ArgumentNullException.ThrowIfNull(builder, nameof(builder));
        builder.ToTable("ProductImportLines");
        builder.Property(p => p.ProductName).HasMaxLength(255).HasDefaultValue(string.Empty);
        builder.Property(p => p.ProductManufacturer).HasMaxLength(50).HasDefaultValue(string.Empty);
        builder.Property(p => p.ProductCategory).HasMaxLength(50).HasDefaultValue(string.Empty);
        builder.Property(p => p.ProductStatus).HasMaxLength(50).HasDefaultValue(ProductStatus.Active);
        builder.Property(p => p.ProductSku).HasMaxLength(50).IsRequired();
        builder.Property(p => p.ProductName).HasMaxLength(100).IsRequired();
        builder.Property(p => p.Status).HasMaxLength(50).HasConversion<string>().HasDefaultValue(StagingStatus.Pending);

        builder.HasOne(p => p.ProductImport).WithMany(p => p.Lines).HasForeignKey(p => p.ProductImportId).OnDelete(DeleteBehavior.Cascade);

        ConfigureIndexes(builder);
    }

    private static void ConfigureIndexes(EntityTypeBuilder<ProductImportLine> builder)
    {
        builder.HasIndex(p => p.Status);
    }
}
