using Common.Domain.SeedWork;

namespace Products.Domain.AggregatesModel.ProductImportAggregate;
public interface IProductImportRepository : IRepository<ProductImport>
{
    ProductImport Add(ProductImport productImport);
    void Update(ProductImport productImport);
    Task<ProductImport> GetAsync(Guid id);
}
