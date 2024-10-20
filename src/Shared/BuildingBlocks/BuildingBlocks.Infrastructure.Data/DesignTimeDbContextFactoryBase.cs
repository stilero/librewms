using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace BuildingBlocks.Infrastructure.Data;

public class DesignTimeDbContextFactoryBase<TDbContext> : IDesignTimeDbContextFactory<TDbContext>
    where TDbContext : DbContext
{
    public TDbContext CreateDbContext(string[] args)
    {
        ArgumentNullException.ThrowIfNull(args, nameof(args));

        if (args.Length != 1)
        {
            throw new ArgumentException("You need to provide an argument that contains the database connection string. Command could be \"dotnet ef database update -- \"<connection string>\" ");
        }

        var connectionString = args[0];

        if (string.IsNullOrWhiteSpace(connectionString))
        {
            throw new ArgumentException("Connection string cant be empty...");
        }

        var optionsBuilder = new DbContextOptionsBuilder<TDbContext>();
        optionsBuilder.UseSqlServer(connectionString);
        return new DbContext(optionsBuilder.Options) as TDbContext ?? throw new InvalidOperationException("Could not create instance of DbContext");
    }
}
