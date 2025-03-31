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

        private async Task<Project> GetProjectById(ObjectId projectId)
        {
            var project = await _context.Projects
                .Find(project => project.Id == projectId)
                .FirstOrDefaultAsync() ?? throw new Exception("Project not found");

            return project;
        }

        private ListTask GetListTaskByProject(ref Project project, ObjectId listTaskId)
        {
            var listTask = project.ListTasks
                .Find(listTask => listTask.Id == listTaskId) ?? throw new Exception("ListTask not found");

            return listTask;
        }

        private KanbanTask GetKanbanTaskByProject(ref Project project, ObjectId listTaskId, ObjectId kanbanTaskId)
        {
            var listTask = GetListTaskByProject(ref project, listTaskId);

            var kanbanTask = listTask.Tasks
                .Find(kanbanTask => kanbanTask.Id == kanbanTaskId) ?? throw new Exception("KanbanTask not found");

            return kanbanTask;
        }

        public async Task<ListTask> GetListTaskById(ObjectId projectId, ObjectId id)
        {
            var project = await GetProjectById(projectId);

            var listTask = GetListTaskByProject(ref project, id);

            return listTask;
        }

        public async Task<ListTask> CreateListTasks(ObjectId projectId, ListTask listTask)
        {
            var project = await GetProjectById(projectId);

            project.ListTasks.Add(listTask);

            await _context.Projects.ReplaceOneAsync(project => project.Id == projectId, project);

            return listTask;
        }

        public async Task DeleteListTasks(ObjectId projectId, ObjectId id)
        {
            var project = await GetProjectById(projectId); 

            var listTask = GetListTaskByProject(ref project, id);

            project.ListTasks.Remove(listTask);

            await _context.Projects.ReplaceOneAsync(project => project.Id == projectId, project);
        }

        public async Task UpdateListTasks(ObjectId projectId, ObjectId id, ListTask listTask)
        {
            var project = await GetProjectById(projectId);

            var listTaskToUpdate = GetListTaskByProject(ref project, id);

            listTaskToUpdate.Name = listTask.Name;
            listTaskToUpdate.Position = listTask.Position;
            listTaskToUpdate.IsFinished = listTask.IsFinished;

            await _context.Projects.ReplaceOneAsync(project => project.Id == projectId, project);
        }

        public async Task<KanbanTask> GetKanbanTask(ObjectId projectId, ObjectId listTaskId, ObjectId kanbanTaskId)
        {
            var project = await GetProjectById(projectId);

            var kanbanTask = GetKanbanTaskByProject(ref project, listTaskId, kanbanTaskId);
            
            return kanbanTask;
        }

        public async Task CreateKanbanTask(ObjectId projectId, ObjectId listTaskId, KanbanTask kanbanTask)
        {
            var project = await GetProjectById(projectId);

            var listTask = GetListTaskByProject(ref project, listTaskId);

            listTask.Tasks.Add(kanbanTask);

            await _context.Projects.ReplaceOneAsync(project => project.Id == projectId, project);
        }

        public async Task UpdateKanbanTask(ObjectId projectId, ObjectId listTaskId, ObjectId kanbanTaskId, KanbanTask kanbanTask)
        {
            var project = await GetProjectById(projectId);

            var listTask = GetListTaskByProject(ref project, listTaskId);

            var kanbanTaskToUpdate = GetKanbanTaskByProject(ref project, listTaskId, kanbanTaskId);

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
            var project = await GetProjectById(projectId);

            var listTask = GetListTaskByProject(ref project, listTaskId);

            var kanbanTaskToDelete = GetKanbanTaskByProject(ref project, listTaskId, kanbanTaskId);

            listTask.Tasks.Remove(kanbanTaskToDelete);

            await _context.Projects.ReplaceOneAsync(project => project.Id == projectId, project);
        }

        // public async Task MoveKanbanTask(ObjectId projectId, ObjectId listTaskId, ObjectId kanbanTaskId, int position)
        // {
        //     var project = await GetProjectById(projectId);

        //     var kanbanTaskToMove = GetKanbanTaskByProject(ref project, listTaskId, kanbanTaskId);

        //     kanbanTaskToMove.Position = position;
        // }

        public async Task<KanbanTask> GetKanbanTaskByPosition(ObjectId projectId, ObjectId listTaskId, int position)
        {
            var project = await GetProjectById(projectId);

            var listTask = GetListTaskByProject(ref project, listTaskId);

            var kanbanTask = GetKanbanTaskByProject(ref project, listTaskId, listTask.Tasks[position].Id);
            
            return kanbanTask;
        }

        public async Task ChangePositionToTask(ObjectId projectId, ObjectId listTaskId, ObjectId kanbanTaskId, int position)
        {
            var project = await GetProjectById(projectId);

            var kanbanTask = GetKanbanTaskByProject(ref project, listTaskId, kanbanTaskId);

            kanbanTask.Position = position;

            await UpdateKanbanTask(projectId, listTaskId, kanbanTaskId, kanbanTask);
        }

        public async Task ChangePositionToTaskInOtherColumn(ObjectId projectId, ObjectId currentListTaskId, ObjectId newListTaskId, ObjectId kanbanTaskId, int position)
        {
            var project = await GetProjectById(projectId);

            var kanbanTask = GetKanbanTaskByProject(ref project, currentListTaskId, kanbanTaskId);

            var currentListTask = GetListTaskByProject(ref project, currentListTaskId);

            currentListTask.Tasks.Remove(kanbanTask);

            var newListTask = GetListTaskByProject(ref project, newListTaskId);

            newListTask.Tasks.Insert(position, kanbanTask);

            kanbanTask.Position = position;

            await _context.Projects.ReplaceOneAsync(project => project.Id == projectId, project);
        }

        public async Task ChangePositionToColumn(ObjectId projectId, ObjectId listTaskId, int position)
        {
            var project = await GetProjectById(projectId);

            var listTask = GetListTaskByProject(ref project, listTaskId);

            listTask.Position = position;

            await _context.Projects.ReplaceOneAsync(project => project.Id == projectId, project);
        }

        public async Task<List<ListTask>> GetListTasks(ObjectId projectId)
        {
            var project = await GetProjectById(projectId);

            return project.ListTasks;
        }
    }
}