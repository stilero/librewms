using Products.Domain.AggregatesModel.ProductImportAggregate;

namespace Products.Application.Features.ProductImports.Interfaces;
public interface IProductImportRepository
{
    Task AddAsync(ProductImport productImport, CancellationToken cancellationToken);
    Task AddRangeAsync(IEnumerable<ProductImport> productImports, CancellationToken cancellationToken);
    void Update(ProductImport productImport);
    void UpdateRange(IEnumerable<ProductImport> productImports);
    Task<ProductImport?> FindAsync(Guid id, CancellationToken cancellationToken);
}
