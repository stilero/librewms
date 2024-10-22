using Common.Domain.SeedWork;

using Products.Domain.Events;
using Products.Domain.Exceptions;

namespace Products.Domain.AggregatesModel.ProductImportAggregate;
public sealed class ProductImport : Entity, IAggregateRoot
{
    public ImportType Type { get; private set; } = ImportType.Add;
    public ImportStatus Status { get; private set; } = ImportStatus.Draft;
    private readonly List<ProductImportLine> _lines;
    public IReadOnlyCollection<ProductImportLine> Lines => _lines.AsReadOnly();

    private ProductImport()
    {
        _lines = [];
    }

    public static ProductImport CreateNew(ImportType type)
    {
        var productImport = new ProductImport
        {
            Id = Guid.NewGuid(),
            Type = type
        };

        productImport.AddDomainEvent(new ImportCreatedEventDomainEvent(productImport));

        return productImport;
    }

    public void AddLine(ProductImportLine importLine)
    {
        var existingLinesForProduct = _lines.SingleOrDefault(x => x.ProductSku == importLine.ProductSku);
        if (existingLinesForProduct != null)
        {
            throw new ProductDomainException($"Product with SKU {importLine?.ProductSku} already exists in the import.");
        }

        _lines.Add(importLine);
    }

    public void SetStatusStaged()
    {
        Status = ImportStatus.Staged;
        AddDomainEvent(new ImportStagedDomainEvent(Id));
    }

    public void SetStatusProcessing()
    {
        Status = ImportStatus.Processing;
        AddDomainEvent(new ImportProcessingDomainEvent(Id));
    }

    public void SetStatusValidated()
    {
        Status = ImportStatus.Validated;
        AddDomainEvent(new ImportValidatedDomainEvent(Id));
    }

    public void SetStatusCompleted()
    {
        Status = ImportStatus.Completed;
        AddDomainEvent(new ImportCompletedDomainEvent(Id));
    }
}
