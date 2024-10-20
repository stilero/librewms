using BuildingBlocks.Domain.Primitives;

using Products.Domain.ProductImport.ValueObjects;

namespace Products.Domain.ProductImport;
public sealed class ProductImport : AggregateRoot
{
    public Guid Id { get; private set; }
    public ImportType Type { get; private set; } = ImportType.Add;
    public ImportStatus Status { get; private set; } = ImportStatus.Pending;
    public ICollection<ProductImportLine> Lines { get; private set; } = [];

    private ProductImport()
    {
    }

    public static ProductImport CreateNew(ImportType type)
    {
        var productImport = new ProductImport
        {
            Id = Guid.NewGuid(),
            Type = type
        };

        productImport.RaiseDomainEvent(new ProductImportCreated(productImport));

        return productImport;
    }

    public void StageLines(ICollection<ProductImportLine> importLines)
    {
        Lines = importLines;
        Status = ImportStatus.Processing;
        RaiseDomainEvent(new ProductImportStaged(this));
    }

    private void ValidateStagedLines()
    {
        foreach (var stagedData in Lines)
        {
            stagedData.Validate();
        }

        Status = Lines.Any(x => x.Status == StagingStatus.Invalid) ? ImportStatus.Failed : ImportStatus.Completed;
        if (Status == ImportStatus.Completed)
        {
            RaiseDomainEvent(new ProductImportValidated(this));
        }
        else
        {
            RaiseDomainEvent(new ProductImportValidationFailed(this));
        }

    }

    public IEnumerable<Product> ProcessLinesAndReturnProducts()
    {
        ValidateStagedLines();
        var products = new List<Product>();
        if (Type == ImportType.Add)
        {

            foreach (var stagedData in Lines)
            {
                if (stagedData.Status == StagingStatus.Validated)
                {
                    var product = Product.CreateNew(stagedData.ProductName, stagedData.ProductSku, stagedData.ProductDescription, stagedData.ProductManufacturer, stagedData.ProductCategory);
                    products.Add(product);
                }
            }
        }
        else
        {
            foreach (var stagedData in Lines)
            {
                if (stagedData.Status == StagingStatus.Validated)
                {
                    var product = Product.Update(Guid.NewGuid(), stagedData.ProductName, stagedData.ProductSku, stagedData.ProductStatus, stagedData.ProductManufacturer, stagedData.ProductDescription, stagedData.ProductCategory);
                    products.Add(product);
                }
            }
        }
        return products;
    }
}
