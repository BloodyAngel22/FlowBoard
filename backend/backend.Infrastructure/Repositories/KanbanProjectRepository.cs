using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Core.IRepositories;
using backend.Core.Models;
using MongoDB.Bson;
using MongoDB.Driver;

namespace backend.Infrastructure.Repositories
{
    public class KanbanProjectRepository : IKanbanProjectRepository
    {
        private readonly AppDbContext _context;

        public KanbanProjectRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Project> CreateProject(Project project)
        {
            await _context.Projects.InsertOneAsync(project);

            return project;
        }

        public async Task DeleteProject(ObjectId id)
        {
            var project = await _context.Projects.Find(project => project.Id == id).FirstOrDefaultAsync() ?? throw new Exception("Project not found");

            await _context.Projects.DeleteOneAsync(project => project.Id == id);
        }

        public async Task<Project?> GetProject(ObjectId id)
        {
            var project = await _context.Projects.Find(project => project.Id == id).FirstOrDefaultAsync();

            //TODO: надо сортировать списки и задачи в списках по позициям.
            project.ListTasks.Sort((x, y) => x.Position.CompareTo(y.Position));

            foreach (var listTask in project.ListTasks)
            {
                listTask.Tasks.Sort((x, y) => x.Position.CompareTo(y.Position));
            }

            return project;
        }

        public async Task<List<Project>> GetAllProjects()
        {
            var projects = await _context.Projects.Find(_ => true).ToListAsync();

            return projects;
        }

        public async Task UpdateProject(ObjectId id, Project project)
        {
            var existingProject = await _context.Projects.Find(project => project.Id == id).FirstOrDefaultAsync() ?? throw new Exception("Project not found");

            var result = await _context.Projects.ReplaceOneAsync(
                project => project.Id == id,
                project
            );
        }
    }
}