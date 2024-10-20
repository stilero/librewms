using Products.Application.Features.ProductImports.Interfaces;
using Products.Domain.ProductImport.Entities;

namespace Products.Infrastructure.Data.Features.ProductImports.Repositories;
public sealed class ProductImportLineRepository(ProductsDbContext dbContext) : IProductImportLineRepository
{
    public async Task AddAsync(ProductImportLine productLine, CancellationToken cancellationToken) => await dbContext.AddAsync(productLine, cancellationToken);
    public async Task AddRangeAsync(IEnumerable<ProductImportLine> productLines, CancellationToken cancellationToken) => await dbContext.AddRangeAsync(productLines, cancellationToken);
    public async Task<ProductImportLine?> FindAsync(Guid id, CancellationToken cancellationToken) => await dbContext.FindAsync<ProductImportLine>(id, cancellationToken);
    public void Update(ProductImportLine productLine) => dbContext.Update(productLine);
    public void UpdateRange(IEnumerable<ProductImportLine> productLines) => dbContext.UpdateRange(productLines);
}
