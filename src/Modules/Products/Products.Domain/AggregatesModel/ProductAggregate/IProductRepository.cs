using Common.Domain.SeedWork;
using Products.Domain.AggregatesModel.ProductImportAggregate;

namespace Products.Domain.AggregatesModel.ProductAggregate;
public interface IProductRepository : IRepository<Product>
{
    Task AddAsync(Product product, CancellationToken cancellationToken = default);
    Task AddRangeAsync(IEnumerable<Product> products, CancellationToken cancellationToken = default);
    Task Delete(Guid id, CancellationToken cancellationToken = default);
    Task<Product?> FindAsync(Guid id, CancellationToken cancellationToken = default);
    void Update(Product product);
}
