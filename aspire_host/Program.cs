var builder = DistributedApplication.CreateBuilder(args);

var app = builder.AddProject<Projects.backend_WebApi>("backend");

builder.AddNpmApp("frontend", "../frontend")
       .WithReference(app)
       .WaitFor(app)
       .WithHttpEndpoint(3000, 3001)
       .WithExternalHttpEndpoints();

builder.Build().Run();
