var builder = DistributedApplication.CreateBuilder(args);

// Add a PostgreSQL resource using Aspire's AddPostgres
var username = builder.AddParameter("POSTGRESUSER", secret: true);
var password = builder.AddParameter("POSTGRESSPASSWORD", secret: true);
var postgres = builder.AddPostgres("postgres", username, password, 5432)
    .WithPgAdmin()
    .AddDatabase("librewms");

// Add the API project and connect it to the PostgreSQL resource
var migrationService = builder.AddProject<Projects.LibreWms_MigrationService>("librewms-migrationservice")
    .WithReference(postgres)
    .WaitFor(postgres);

var api = builder.AddProject<Projects.LibreWms_Api>("librewms-api")
    .WithReference(postgres)
    .WithExternalHttpEndpoints()
    .WaitFor(postgres)
    .WaitFor(migrationService);

builder.AddNpmApp("librewms-frontend", "../libre-wms-frontend")
    .WithReference(api)
    //.WithEnvironment("BROWSER", "none")
    .WithEnvironment("NODE_ENV", "production")
    .WithEnvironment("NEXT_PUBLIC_API_URL", api.GetEndpoint("https"))
    .WithEnvironment("NODE_TLS_REJECT_UNAUTHORIZED", "0")
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints()   
    .WaitFor(postgres)
    .WaitFor(api)
    .PublishAsDockerFile();

builder.Build().Run();
