using Products.Domain.AggregatesModel.ProductImportAggregate;

namespace Products.Application.Features.ProductImports.Interfaces;
public interface IProductImportLineRepository
{
    Task AddAsync(ProductImportLine productLine, CancellationToken cancellationToken);
    Task AddRangeAsync(IEnumerable<ProductImportLine> productLines, CancellationToken cancellationToken);
    void Update(ProductImportLine productLine);
    void UpdateRange(IEnumerable<ProductImportLine> productLines);
    Task<ProductImportLine?> FindAsync(Guid id, CancellationToken cancellationToken);
}
