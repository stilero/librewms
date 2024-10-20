using BuildingBlocks.Domain.Primitives;

namespace Products.Domain.ProductImport.Events;
public sealed class ProductImportCreated : DomainEvent
{
    public string ImportType { get; } = string.Empty;

    public ProductImportCreated(ProductImport productImport) : base(productImport.Id, nameof(ProductImport), nameof(ProductImportCreated))
    {
        ImportType = productImport.Type.ToString();
    }
}
