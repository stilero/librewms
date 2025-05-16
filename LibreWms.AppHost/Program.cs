var builder = DistributedApplication.CreateBuilder(args);

// Add a PostgreSQL container resource using AddContainer
var postgres = builder.AddContainer("postgres", "postgres:16-alpine")
    .WithEnvironment("POSTGRES_USER", "postgres")
    .WithEnvironment("POSTGRES_PASSWORD", "postgres")
    .WithEnvironment("POSTGRES_DB", "librewms");

// Compose the connection string manually
var connectionString = "Host=localhost;Port=5432;Database=librewms;Username=postgres;Password=postgres";

// Add the API project and set the connection string
builder.AddProject<Projects.LibreWms_Api>("librewms-api")
    .WithEnvironment("ConnectionStrings__DefaultConnection", connectionString);

builder.Build().Run();
