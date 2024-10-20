using BuildingBlocks.Domain.Primitives;

namespace Products.Domain.ProductImport.Events;
public sealed class ProductImportStaged : DomainEvent
{
    public ProductImportStaged(ProductImport productImport) : base(productImport.Id, nameof(ProductImport), nameof(ProductImportStaged))
    {
    }
}
