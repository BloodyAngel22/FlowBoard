using Microsoft.EntityFrameworkCore;
using backend.Core.Models;
using MongoDB.Driver;

namespace backend.Infrastructure
{
	public class AppDbContext : DbContext
	{
		private readonly IMongoCollection<Project> _projects;

		public AppDbContext(IMongoDatabase database)
		{
			_projects = database.GetCollection<Project>("Projects");
		}

		public IMongoCollection<Project> Projects => _projects;
    }
}