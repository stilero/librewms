using Products.Application.Features.ProductImports.Interfaces;
using Products.Domain.AggregatesModel.ProductImportAggregate;

namespace Products.Infrastructure.Data.Features.ProductImports.Repositories;
public sealed class ProductImportRepository(ProductsDbContext dbContext) : IProductImportRepository
{
    public async Task AddAsync(ProductImport productImport, CancellationToken cancellationToken) => await dbContext.AddAsync(productImport, cancellationToken);
    public async Task AddRangeAsync(IEnumerable<ProductImport> productImports, CancellationToken cancellationToken) => await dbContext.AddRangeAsync(productImports, cancellationToken);
    public async Task<ProductImport?> FindAsync(Guid id, CancellationToken cancellationToken) => await dbContext.FindAsync<ProductImport>(id, cancellationToken);
    public void Update(ProductImport productImport) => dbContext.Update(productImport);
    public void UpdateRange(IEnumerable<ProductImport> productImports) => dbContext.UpdateRange(productImports);
}
