using backend.WebApi.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDatabaseServices(builder.Configuration)
				.AddKanbanServices()
				.AddValidators()
				.AddApiServices()
				.AddCorsServices();

builder.AddServiceDefaults();

var app = builder.Build();

app.UseDevelopmentMiddleware(app.Environment);
app.UseCoreMiddleware();

app.Run();