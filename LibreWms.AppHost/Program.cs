var builder = DistributedApplication.CreateBuilder(args);

// Add a PostgreSQL resource using Aspire's AddPostgres
var password = builder.AddParameter("postgres-username", secret: true);
var username = builder.AddParameter("postgres-password", secret: true);
var postgres = builder.AddPostgres("postgres", username, password)
    .WithPgAdmin()
    .AddDatabase("librewms");

// Add the API project and connect it to the PostgreSQL resource
builder.AddProject<Projects.LibreWms_Api>("librewms-api")
    .WithReference(postgres)
    .WaitFor(postgres);

builder.AddProject<Projects.LibreWms_MigrationService>("librewms-migrationservice")
    .WithReference(postgres)
    .WaitFor(postgres);

builder.Build().Run();
