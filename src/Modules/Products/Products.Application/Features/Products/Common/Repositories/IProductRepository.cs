using Products.Domain.AggregatesModel.ProductAggregate;

namespace Products.Application.Features.Products.Common.Repositories;
public interface IProductRepository
{
    Task AddAsync(Product product, CancellationToken cancellationToken = default);
    Task AddRangeAsync(IEnumerable<Product> products, CancellationToken cancellationToken = default);
    Task Delete(Guid id, CancellationToken cancellationToken = default);
    Task<Product?> FindAsync(Guid id, CancellationToken cancellationToken = default);
    void Update(Product product);
}
