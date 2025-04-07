using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Core.IRepositories;
using MongoDB.Bson;
using MongoDB.Driver;

using MProject = backend.Core.Models.Project;
using MColumn = backend.Core.Models.Column;
using MTask = backend.Core.Models.Task;

namespace backend.Infrastructure.Repositories
{
    public class KanbanBoardRepository(AppDbContext context) : IKanbanBoardRepository
    {
        private readonly AppDbContext _context = context;

        private async Task<MProject> GetProjectById(ObjectId projectId)
        {
            var project = await _context.Projects
                .Find(project => project.Id == projectId)
                .FirstOrDefaultAsync() ?? throw new Exception("MProject not found");

            return project;
        }

        private MColumn GetColumnByProject(ref MProject project, ObjectId columnId)
        {
            var column = project.Columns
                .Find(column => column.Id == columnId) ?? throw new Exception("Column not found");

            return column;
        }

        private MTask GetTaskByProject(ref MProject project, ObjectId columnId, ObjectId taskId)
        {
            var column = GetColumnByProject(ref project, columnId);

            var task = column.Tasks
                .Find(task => task.Id == taskId) ?? throw new Exception("task not found");

            return task;
        }

        public async Task<MColumn> GetColumnById(ObjectId projectId, ObjectId id)
        {
            var project = await GetProjectById(projectId);

            var column = GetColumnByProject(ref project, id);

            return column;
        }

        public async Task<MColumn> CreateColumn(ObjectId projectId, MColumn column)
        {
            var project = await GetProjectById(projectId);

            project.Columns.Add(column);

            await _context.Projects.ReplaceOneAsync(project => project.Id == projectId, project);

            return column;
        }

        public async Task DeleteColumn(ObjectId projectId, ObjectId id)
        {
            var project = await GetProjectById(projectId);

            var column = GetColumnByProject(ref project, id);

            project.Columns.Remove(column);

            await _context.Projects.ReplaceOneAsync(project => project.Id == projectId, project);
        }

        public async Task UpdateColumn(ObjectId projectId, ObjectId id, MColumn column)
        {
            var project = await GetProjectById(projectId);

            var columnToUpdate = GetColumnByProject(ref project, id);

            columnToUpdate.Name = column.Name;
            columnToUpdate.Position = column.Position;
            columnToUpdate.IsFinished = column.IsFinished;
            columnToUpdate.Color = column.Color;

            await _context.Projects.ReplaceOneAsync(project => project.Id == projectId, project);
        }

        public async Task<MTask> GetTask(ObjectId projectId, ObjectId columnId, ObjectId taskId)
        {
            var project = await GetProjectById(projectId);

            var task = GetTaskByProject(ref project, columnId, taskId);

            return task;
        }

        public async Task CreateTask(ObjectId projectId, ObjectId columnId, MTask task)
        {
            var project = await GetProjectById(projectId);

            var column = GetColumnByProject(ref project, columnId);

            column.Tasks.Add(task);

            await _context.Projects.ReplaceOneAsync(project => project.Id == projectId, project);
        }

        public async Task UpdateTask(ObjectId projectId, ObjectId columnId, ObjectId taskId, MTask task)
        {
            var project = await GetProjectById(projectId);

            var column = GetColumnByProject(ref project, columnId);

            var taskToUpdate = GetTaskByProject(ref project, columnId, taskId);

            taskToUpdate.Name = task.Name;
            taskToUpdate.Position = task.Position;
            taskToUpdate.Description = task.Description;
            taskToUpdate.StartDate = task.StartDate;
            taskToUpdate.EndDate = task.EndDate;
            taskToUpdate.CategoryId = task.CategoryId;
            taskToUpdate.Priority = task.Priority;

            await _context.Projects.ReplaceOneAsync(project => project.Id == projectId, project);
        }

        public async Task DeleteTask(ObjectId projectId, ObjectId columnId, ObjectId taskId)
        {
            var project = await GetProjectById(projectId);

            var column = GetColumnByProject(ref project, columnId);

            var taskToDelete = GetTaskByProject(ref project, columnId, taskId);

            column.Tasks.Remove(taskToDelete);

            await _context.Projects.ReplaceOneAsync(project => project.Id == projectId, project);
        }

        public async Task<MTask> GetTaskByPosition(ObjectId projectId, ObjectId columnId, int position)
        {
            var project = await GetProjectById(projectId);

            var column = GetColumnByProject(ref project, columnId);

            var task = GetTaskByProject(ref project, columnId, column.Tasks[position].Id);

            return task;
        }

        public async Task ChangePositionToTask(ObjectId projectId, ObjectId columnId, ObjectId taskId, int position)
        {
            var project = await GetProjectById(projectId);

            var task = GetTaskByProject(ref project, columnId, taskId);

            task.Position = position;

            await UpdateTask(projectId, columnId, taskId, task);
        }

        public async Task ChangePositionToTaskInOtherColumn(ObjectId projectId, ObjectId currentColumnId, ObjectId newColumnId, ObjectId taskId, int position)
        {
            var project = await GetProjectById(projectId);

            var task = GetTaskByProject(ref project, currentColumnId, taskId);

            var currentColumn = GetColumnByProject(ref project, currentColumnId);

            currentColumn.Tasks.Remove(task);

            var newColumn = GetColumnByProject(ref project, newColumnId);

            newColumn.Tasks.Insert(position, task);

            task.Position = position;

            await _context.Projects.ReplaceOneAsync(project => project.Id == projectId, project);
        }

        public async Task ChangePositionToColumn(ObjectId projectId, ObjectId columnId, int position)
        {
            var project = await GetProjectById(projectId);

            var column = GetColumnByProject(ref project, columnId);

            column.Position = position;

            await _context.Projects.ReplaceOneAsync(project => project.Id == projectId, project);
        }

        public async Task<List<MColumn>> GetColumns(ObjectId projectId)
        {
            var project = await GetProjectById(projectId);

            return project.Columns;
        }
    }
}