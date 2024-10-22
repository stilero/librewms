using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

using Products.Domain.AggregatesModel.ProductImportAggregate;

namespace Products.Infrastructure.Data.Features.ProductImports.Configurations;
public class ProductImportConfiguration : IEntityTypeConfiguration<ProductImport>
{
    public void Configure(EntityTypeBuilder<ProductImport> builder)
    {
        ArgumentNullException.ThrowIfNull(builder, nameof(builder));
        builder.ToTable("ProductImports");
        builder.HasKey(p => p.Id);
        builder.Property(p => p.Type).HasConversion<string>().HasMaxLength(50).IsRequired();
        builder.Property(p => p.Status).HasConversion<string>().HasMaxLength(50).IsRequired();

        ConfigureIndexes(builder);
    }

    private static void ConfigureIndexes(EntityTypeBuilder<ProductImport> builder)
    {
        builder.HasIndex(p => p.Status);
    }
}
