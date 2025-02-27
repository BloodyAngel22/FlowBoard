using backend.Application.Services;
using backend.Core.IRepositories;
using backend.Infrastructure;
using backend.Infrastructure.Repositories;
using Scalar.AspNetCore;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.AddServiceDefaults();

// builder.Services.AddScoped<IRepository<Product, Guid>, ProductRepository>();
// builder.Services.AddScoped<ProductService>();

builder.Services.AddScoped<IKanbanProjectRepository, KanbanProjectRepository>();
builder.Services.AddScoped<KanbanProjectsService>();

builder.Services.AddScoped<IKanbanBoardRepository, KanbanBoardRepository>();
builder.Services.AddScoped<KanbanBoardService>();

// builder.Services.AddScoped<IValidator<ProductDTO>, ProductValidator>();

// builder.Services.AddAutoMapper(typeof(MapProduct).Assembly);

var mongoConnectionString = builder.Configuration.GetSection("MongoDbSettings:ConnectionString").Value ?? throw new Exception("Connection string not found");
var mongoDatabaseName = builder.Configuration.GetSection("MongoDbSettings:DatabaseName").Value ?? throw new Exception("Database name not found");

var mongoClient = new MongoClient(mongoConnectionString);
var mongoDatabase = mongoClient.GetDatabase(mongoDatabaseName);

builder.Services.AddSingleton(mongoDatabase);
builder.Services.AddScoped<AppDbContext>();

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
	options.AddDefaultPolicy(builder =>
	{
		builder.WithOrigins("http://localhost:3000")
			   .SetIsOriginAllowed(origin => 
			   		origin.StartsWith("https://localhost:") ||
					origin == "http://localhost:3000"
			   )
			   .AllowAnyMethod()
			   .AllowAnyHeader();
	});
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.MapOpenApi();
	app.MapScalarApiReference("docs", options =>
	{
		options.WithTheme(ScalarTheme.DeepSpace);
	});
}
app.UseCors();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();