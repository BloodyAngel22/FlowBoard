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
    public class KanbanBoardRepository(AppDbContext context) : IKanbanBoardRepository
    {
        private readonly AppDbContext _context = context;

        public async Task<ListTask> CreateListTasks(ObjectId projectId, ListTask listTask)
        {
            var project = await _context.Projects
                .Find(project => project.Id == projectId)
                .FirstOrDefaultAsync() ?? throw new Exception("Project not found");

            project.ListTasks.Add(listTask);

            await _context.Projects.ReplaceOneAsync(project => project.Id == projectId, project);

            return listTask;
        }

        public Task DeleteListTasks(ObjectId projectId, ObjectId id)
        {
            throw new NotImplementedException();
        }

        public async Task<ListTask> GetListTasks(ObjectId projectId, ObjectId id)
        {
            var project = await _context.Projects
                .Find(project => project.Id == projectId)
                .FirstOrDefaultAsync() ?? throw new Exception("Project not found");
                
            var listTask = project.ListTasks
                .Find(listTask => listTask.Id == id) ?? throw new Exception("ListTask not found");

            return listTask;
        }

        public async Task<List<ListTask>> GetAllListTasks(ObjectId projectId)
        {
            var project = await _context.Projects
                .Find(project => project.Id == projectId)
                .FirstOrDefaultAsync();

            return project.ListTasks;
        }

        public Task UpdateListTasks(ObjectId projectId, ObjectId id, ListTask listTask)
        {
            throw new NotImplementedException();
        }
    }
}