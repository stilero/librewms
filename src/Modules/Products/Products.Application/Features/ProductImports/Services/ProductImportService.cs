using BuildingBlocks.Application.Models.Results;

using Products.Application.Features.ProductImports.Contracts;
using Products.Application.Features.ProductImports.Interfaces;
using Products.Application.Features.Products.Common.Repositories;
using Products.Domain.AggregatesModel.ProductAggregate;
using Products.Domain.AggregatesModel.ProductImportAggregate;

namespace Products.Application.Features.ProductImports.Services;
public sealed class ProductImportService : IProductImportService
{
    private readonly IProductImportRepository _productImportRepository;
    private readonly IProductImportLineRepository _stagedProductDataRepository;
    private readonly IProductRepository _productRepository;

    public ProductImportService(IProductImportRepository productImportRepository, IProductImportLineRepository stagedProductDataRepository, IProductRepository productRepository)
    {
        _productImportRepository = productImportRepository;
        _stagedProductDataRepository = stagedProductDataRepository;
        _productRepository = productRepository;
    }

    public async Task<Result<Guid>> CreateNew(ProductImportRequest request, CancellationToken cancellationToken)
    {
        if (request is null)
        {
            return ErrorResult.Validation("ProductImportErrors.InvalidRequest", "Request cannot be null");
        }

        var import = ProductImport.CreateNew(request.ImportType);
        foreach (var data in request.Data)
        {
            import.AddLine(ProductImportLine.CreateNew(
                data.Name,
                data.Sku,
                data.Description,
                data.Manufacturer,
                data.Category,
                data.Status));
        }

        _productImportRepository.Add(import);
        await _productImportRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
        return import.Id;
    }

    public async Task<Result> ProcessImport(Guid importId, CancellationToken cancellationToken)
    {
        var import = await _productImportRepository.GetAsync(importId);
        if (import is null)
        {
            return ErrorResult.NotFound("ProductImportErrors.ImportNotFound", "Import not found");
        }
        
        import.SetStatusProcessing();
        _productImportRepository.Update(import);
        foreach (var line in import.Lines)
        {
            var product = Product.CreateNew(line.ProductName, line.ProductSku, line.ProductDescription, line.ProductManufacturer, line.ProductCategory);
            await _productRepository.AddAsync(product, cancellationToken);
        }
        await _productRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
        import.SetStatusCompleted();
        _productImportRepository.Update(import);
        await _productImportRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
        return Result.Success();
    }
}
