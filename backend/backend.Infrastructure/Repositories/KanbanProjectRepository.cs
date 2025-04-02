using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Core.IRepositories;
using MongoDB.Bson;
using MongoDB.Driver;

using MProject = backend.Core.Models.Project;

namespace backend.Infrastructure.Repositories
{
    public class KanbanProjectRepository : IKanbanProjectRepository
    {
        private readonly AppDbContext _context;

        public KanbanProjectRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<MProject> CreateProject(MProject project)
        {
            await _context.Projects.InsertOneAsync(project);

            return project;
        }

        public async Task DeleteProject(ObjectId id)
        {
            var project = await _context.Projects.Find(project => project.Id == id).FirstOrDefaultAsync() ?? throw new Exception("MProject not found");

            await _context.Projects.DeleteOneAsync(project => project.Id == id);
        }

        public async Task<MProject?> GetProject(ObjectId id)
        {
            var project = await _context.Projects.Find(project => project.Id == id).FirstOrDefaultAsync();

            project.Columns.Sort((x, y) => x.Position.CompareTo(y.Position));

            foreach (var column in project.Columns)
            {
                column.Tasks.Sort((x, y) => x.Position.CompareTo(y.Position));
            }

            return project;
        }

        public async Task<List<MProject>> GetAllProjects()
        {
            var projects = await _context.Projects.Find(_ => true).ToListAsync();

            return projects;
        }

        public async Task UpdateProject(ObjectId id, MProject project)
        {
            var existingProject = await _context.Projects.Find(project => project.Id == id).FirstOrDefaultAsync() ?? throw new Exception("MProject not found");

            var result = await _context.Projects.ReplaceOneAsync(
                project => project.Id == id,
                project
            );
        }
    }
}