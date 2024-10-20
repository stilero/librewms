using BuildingBlocks.Application.Interfaces;

namespace Products.Infrastructure.Data.Common.Repositories;
public class ProductsUnitOfWork : IUnitOfWork
{
    private readonly ProductsDbContext _dbContext;

    public ProductsUnitOfWork(ProductsDbContext dbContext)
    {
        _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
    }

    public async Task BeginTransactionAsync() => await _dbContext.Database.BeginTransactionAsync();
    public async Task CommitTransactionAsync() => await _dbContext.Database.CommitTransactionAsync();
    public async Task RollbackTransactionAsync() => await _dbContext.Database.RollbackTransactionAsync();
    public async Task SaveChangesAsync() => await _dbContext.SaveChangesAsync();
}
