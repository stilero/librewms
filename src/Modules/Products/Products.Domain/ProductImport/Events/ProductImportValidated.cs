using BuildingBlocks.Domain.Primitives;

namespace Products.Domain.ProductImport.Events;
public sealed class ProductImportValidated : DomainEvent
{
    public ProductImportValidated(ProductImport productImport) : base(productImport.Id, nameof(ProductImport), nameof(ProductImportValidated))
    {
    }
}
