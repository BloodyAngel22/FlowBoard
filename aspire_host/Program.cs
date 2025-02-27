var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.backend_WebApi>("backend");

builder.Build().Run();
