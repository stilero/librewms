var builder = DistributedApplication.CreateBuilder(args);

// Add a PostgreSQL resource using Aspire's AddPostgres
var username = builder.AddParameter("POSTGRESUSER", secret: true);
var password = builder.AddParameter("POSTGRESSPASSWORD", secret: true);
var postgres = builder.AddPostgres("postgres", username, password, 5432)
    .WithPgAdmin()
    .AddDatabase("librewms");

// Add the API project and connect it to the PostgreSQL resource
builder.AddProject<Projects.LibreWms_Api>("librewms-api")
    .WithReference(postgres)
    .WithExternalHttpEndpoints()
    .WaitFor(postgres);

builder.AddProject<Projects.LibreWms_MigrationService>("librewms-migrationservice")
    .WithReference(postgres)
    .WaitFor(postgres);

builder.Build().Run();
