using BuildingBlocks.Application.Models.Results;

using Products.Application.Features.ProductImports.Contracts;

namespace Products.Application.Features.ProductImports.Interfaces;
public interface IProductImportService
{
    Task<Result<Guid>> CreateNew(ProductImportRequest request, CancellationToken cancellationToken);
    Task<Result> ProcessImport(Guid importId, CancellationToken cancellationToken);
}
