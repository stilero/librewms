using Common.Domain.SeedWork;

using Products.Domain.Events;

namespace Products.Domain.AggregatesModel.ProductImportAggregate;
public sealed class ProductImportLine : Entity
{
    public string ProductName { get; private set; } = string.Empty;
    public string ProductSku { get; private set; } = string.Empty;
    public string ProductDescription { get; private set; } = string.Empty;
    public string ProductManufacturer { get; private set; } = string.Empty;
    public string ProductCategory { get; private set; } = string.Empty;
    public string ProductStatus { get; private set; } = string.Empty;
    public ImportLineStatus Status { get; private set; } = ImportLineStatus.Pending;
    public string Message { get; private set; } = string.Empty;
    public Guid ProductImportId { get; private set; }

    public static ProductImportLine CreateNew(string productName, string productSku, string productDescription, string productManufacturer, string productCategory, string productStatus)
    {
        var line = new ProductImportLine
        {
            Id = Guid.NewGuid(),
            ProductName = productName,
            ProductSku = productSku,
            ProductDescription = productDescription,
            ProductManufacturer = productManufacturer,
            ProductCategory = productCategory,
            ProductStatus = productStatus,
        };

        line.AddDomainEvent(new ImportLineCreatedDomainEvent(line));
        return line;
    }

    public void SetStatusValidated()
    {
        Status = ImportLineStatus.Validated;
        AddDomainEvent(new ImportLineValidatedDomainEvent(Id));
    }

    public void SetStatusInvalid(string message)
    {
        Status = ImportLineStatus.Invalid;
        Message = message;
        AddDomainEvent(new ImportLineInvalidDomainEvent(Id));
    }

    public void SetStatusProcessed()
    {
        Status = ImportLineStatus.Processed;
        AddDomainEvent(new ImportLineProcessedDomainEvent(Id));
    }
 }
