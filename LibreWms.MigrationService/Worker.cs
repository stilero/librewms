using LibreWms.Api.Data;
using Microsoft.EntityFrameworkCore;
using OpenTelemetry.Trace;
using System.Diagnostics;
using System.Threading;

namespace LibreWms.MigrationService;

public class Worker(
    IServiceProvider serviceProvider, 
    IHostApplicationLifetime hostApplicationLifetime, 
    ILogger<Worker> logger) : BackgroundService
{
    public const string ActivitySourceName = "Migrations";
    public static readonly ActivitySource s_activitySource = new(ActivitySourceName);

    private readonly ILogger<Worker> _logger = logger;

    protected override async Task ExecuteAsync(CancellationToken cancellationToken)
    {
        using var activity = s_activitySource.StartActivity("Migrating database", ActivityKind.Client);

        try
        {
            using var scope = serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<LibreWmsDbContext>();

            await RunMigrationAsync(dbContext, cancellationToken);
        }
        catch (Exception ex)
        {
            activity?.RecordException(ex);
            throw;
        }

        hostApplicationLifetime.StopApplication();
    }

    private static async Task RunMigrationAsync(LibreWmsDbContext dbContext, CancellationToken cancellationToken)
    {
        var strategy = dbContext.Database.CreateExecutionStrategy();
        await strategy.ExecuteAsync(async () =>
        {
            // Run migration in a transaction to avoid partial migration if it fails.
            await dbContext.Database.MigrateAsync(cancellationToken);
        });
    }
}
