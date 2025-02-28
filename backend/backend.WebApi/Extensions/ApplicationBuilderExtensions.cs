using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scalar.AspNetCore;

namespace backend.WebApi.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseDevelopmentMiddleware(this WebApplication app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.MapOpenApi();
                app.MapScalarApiReference("docs", options =>
                {
                    options.WithTheme(ScalarTheme.DeepSpace);
                });
            }

            return app;
        }

        public static IApplicationBuilder UseCoreMiddleware(this WebApplication app)
        {
            app.UseCors();
            app.UseHttpsRedirection();
            app.MapControllers();

            return app;
        }
    }
}