using Microsoft.EntityFrameworkCore;
using backend.Core.Models;
using MongoDB.Driver;

namespace backend.Infrastructure
{
	public class AppDbContext : DbContext
	{
		private readonly IMongoCollection<Project> _projects;
		private readonly IMongoCollection<Category> _categories;

		public AppDbContext(IMongoDatabase database)
		{
			_projects = database.GetCollection<Project>("Projects");
			_categories = database.GetCollection<Category>("Categories");
		}

		public IMongoCollection<Project> Projects => _projects;
		public IMongoCollection<Category> Categories => _categories;
    }
}