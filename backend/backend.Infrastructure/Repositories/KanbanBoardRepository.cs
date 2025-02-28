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

        public async Task DeleteListTasks(ObjectId projectId, ObjectId id)
        {
            var project = await _context.Projects
                .Find(project => project.Id == projectId)
                .FirstOrDefaultAsync() ?? throw new Exception("Project not found");

            var listTask = project.ListTasks
                .Find(listTask => listTask.Id == id) ?? throw new Exception("ListTask not found");

            project.ListTasks.Remove(listTask);

            await _context.Projects.ReplaceOneAsync(project => project.Id == projectId, project);
        }

        public async Task UpdateListTasks(ObjectId projectId, ObjectId id, ListTask listTask)
        {
            var project = await _context.Projects
                .Find(project => project.Id == projectId)
                .FirstOrDefaultAsync() ?? throw new Exception("Project not found");

            var listTaskToUpdate = project.ListTasks
                .Find(listTask => listTask.Id == id) ?? throw new Exception("ListTask not found");

            listTaskToUpdate.Name = listTask.Name;
            listTaskToUpdate.Position = listTask.Position;
            listTaskToUpdate.IsFinished = listTask.IsFinished;

            await _context.Projects.ReplaceOneAsync(project => project.Id == projectId, project);
        }

        public async Task<KanbanTask> GetKanbanTask(ObjectId projectId, ObjectId listTaskId, ObjectId kanbanTaskId)
        {
            var project = await _context.Projects
                .Find(project => project.Id == projectId)
                .FirstOrDefaultAsync() ?? throw new Exception("Project not found");

            var listTask = project.ListTasks
                .Find(listTask => listTask.Id == listTaskId) ?? throw new Exception("ListTask not found");
                
            var kanbanTask = listTask.Tasks
                .Find(kanbanTask => kanbanTask.Id == kanbanTaskId) ?? throw new Exception("KanbanTask not found");
            
            return kanbanTask;
        }

        public async Task CreateKanbanTask(ObjectId projectId, ObjectId listTaskId, KanbanTask kanbanTask)
        {
            var project = await _context.Projects
                .Find(project => project.Id == projectId)
                .FirstOrDefaultAsync() ?? throw new Exception("Project not found");

            var listTask = project.ListTasks
                .Find(listTask => listTask.Id == listTaskId) ?? throw new Exception("ListTask not found");

            listTask.Tasks.Add(kanbanTask);

            await _context.Projects.ReplaceOneAsync(project => project.Id == projectId, project);
        }

        public async Task UpdateKanbanTask(ObjectId projectId, ObjectId listTaskId, ObjectId kanbanTaskId, KanbanTask kanbanTask)
        {
            var project = await _context.Projects
                .Find(project => project.Id == projectId)
                .FirstOrDefaultAsync() ?? throw new Exception("Project not found");

            var listTask = project.ListTasks
                .Find(listTask => listTask.Id == listTaskId) ?? throw new Exception("ListTask not found");

            var kanbanTaskToUpdate = listTask.Tasks
                .Find(kanbanTask => kanbanTask.Id == kanbanTaskId) ?? throw new Exception("KanbanTask not found");

            kanbanTaskToUpdate.Name = kanbanTask.Name;
            kanbanTaskToUpdate.Position = kanbanTask.Position;
            kanbanTaskToUpdate.Description = kanbanTask.Description;
            kanbanTaskToUpdate.StartDate = kanbanTask.StartDate;
            kanbanTaskToUpdate.EndDate = kanbanTask.EndDate;
            kanbanTaskToUpdate.CategoryId = kanbanTask.CategoryId;
            kanbanTaskToUpdate.Priority = kanbanTask.Priority;

            await _context.Projects.ReplaceOneAsync(project => project.Id == projectId, project);
        }

        public async Task DeleteKanbanTask(ObjectId projectId, ObjectId listTaskId, ObjectId kanbanTaskId)
        {
            var project = await _context.Projects
                .Find(project => project.Id == projectId)
                .FirstOrDefaultAsync() ?? throw new Exception("Project not found");

            var listTask = project.ListTasks
                .Find(listTask => listTask.Id == listTaskId) ?? throw new Exception("ListTask not found");

            var kanbanTaskToDelete = listTask.Tasks
                .Find(kanbanTask => kanbanTask.Id == kanbanTaskId) ?? throw new Exception("KanbanTask not found");

            listTask.Tasks.Remove(kanbanTaskToDelete);

            await _context.Projects.ReplaceOneAsync(project => project.Id == projectId, project);
        }
    }
}