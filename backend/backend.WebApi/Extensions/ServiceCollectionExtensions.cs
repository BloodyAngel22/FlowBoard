using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.DTOs;
using backend.Application.Services;
using backend.Application.Validators;
using backend.Core.IRepositories;
using backend.Infrastructure;
using backend.Infrastructure.Repositories;
using FluentValidation;
using MongoDB.Driver;

namespace backend.WebApi.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddDatabaseServices(this IServiceCollection services, IConfiguration configuration)
        {
            var mongoConnectionString = configuration.GetSection("MongoDbSettings:ConnectionString").Value
                ?? throw new Exception("Connection string not found");
            var mongoDatabaseName = configuration.GetSection("MongoDbSettings:DatabaseName").Value
                ?? throw new Exception("Database name not found");

            var mongoClient = new MongoClient(mongoConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(mongoDatabaseName);

            services.AddSingleton(mongoDatabase);
            services.AddScoped<AppDbContext>();

            return services;
        }

        public static IServiceCollection AddKanbanServices(this IServiceCollection services)
        {
            services.AddScoped<IKanbanProjectRepository, KanbanProjectRepository>();
            services.AddScoped<KanbanProjectsService>();

            services.AddScoped<IKanbanBoardRepository, KanbanBoardRepository>();
            services.AddScoped<KanbanBoardService>();

            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<CategoryService>();

            return services;
        }

        public static IServiceCollection AddValidators(this IServiceCollection services)
        {
            services.AddScoped<IValidator<CategoryDTO>, CategoryValidator>();
            services.AddScoped<IValidator<ProjectDTO>, ProjectValidator>();
            services.AddScoped<IValidator<ColumnDTO>, ColumnValidator>();
            services.AddScoped<IValidator<TaskDTO>, TaskValidator>();
            services.AddScoped<IValidator<ColumnMoveEventDTO>, ColumnMoveEventValidator>();
            services.AddScoped<IValidator<TaskMoveEventDTO>, TaskMoveEventValidator>();

            return services;
        }

        public static IServiceCollection AddApiServices(this IServiceCollection services)
        {
            services.AddControllers();
            services.AddOpenApi();

            return services;
        }

        public static IServiceCollection AddCorsServices(this IServiceCollection services)
        {
            services.AddCors(options =>
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

            return services;
        }
    }
}