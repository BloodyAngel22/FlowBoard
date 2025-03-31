using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.DTOs;
using backend.Application.Entities;
using backend.Core.IRepositories;
using backend.Core.Models;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;

namespace backend.Application.Services
{
    public class KanbanBoardService
    (
        IKanbanBoardRepository repository,
        ILogger<KanbanBoardService> logger
    )
    {
        private readonly IKanbanBoardRepository _repository = repository;
        private readonly ILogger<KanbanBoardService> _logger = logger;

        public async Task<ServiceResult<ListTaskResponseWithoutTasks>> GetListInfo(ObjectId projectId, ObjectId id)
        {
            try
            {
                var listTask = await _repository.GetListTaskById(projectId, id);

                var listTaskDTOWithoutTasks = new ListTaskResponseWithoutTasks
                {
                    Id = listTask.Id,
                    Name = listTask.Name,
                    Position = listTask.Position,
                    IsFinished = listTask.IsFinished
                };

                return ServiceResult<ListTaskResponseWithoutTasks>.Ok(listTaskDTOWithoutTasks);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting list task");
                return ServiceResult<ListTaskResponseWithoutTasks>.Fail();
            }
        }

        public async Task<ServiceResult<string>> CreateListTask(ObjectId projectId, ListTaskDTO listTaskDTO)
        {
            try
            {
                var listTask = new ListTask
                {
                    Name = listTaskDTO.Name,
                    Position = listTaskDTO.Position,
                    IsFinished = listTaskDTO.IsFinished
                };

                var createdListTask = await _repository.CreateListTasks(projectId, listTask);

                return ServiceResult<string>.Ok("List task created");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating list task");
                return ServiceResult<string>.Fail();
            }
        }

        public async Task<ServiceResult<string>> UpdateListTask(ObjectId projectId, ObjectId id, ListTaskDTO listTaskDTO)
        {
            try
            {
                var listTask = new ListTask
                {
                    Id = id,
                    Name = listTaskDTO.Name,
                    Position = listTaskDTO.Position,
                    IsFinished = listTaskDTO.IsFinished
                };

                await _repository.UpdateListTasks(projectId, id, listTask);

                return ServiceResult<string>.Ok("List task updated");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating list task");
                return ServiceResult<string>.Fail();
            }
        }

        public async Task<ServiceResult<string>> DeleteListTask(ObjectId projectId, ObjectId id)
        {
            try
            {
                await _repository.DeleteListTasks(projectId, id);

                return ServiceResult<string>.Ok("List task deleted");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting list task");
                return ServiceResult<string>.Fail();
            }
        }

        public async Task<ServiceResult<KanbanTask>> GetKanbanTask(ObjectId projectId, ObjectId listTaskId, ObjectId kanbanTaskId)
        {
            try
            {
                var kanbanTask = await _repository.GetKanbanTask(projectId, listTaskId, kanbanTaskId);

                return ServiceResult<KanbanTask>.Ok(kanbanTask);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting kanban task");
                return ServiceResult<KanbanTask>.Fail();
            }
        }

        public async Task<ServiceResult<string>> CreateKanbanTask(ObjectId projectId, ObjectId listTaskId, KanbanTaskDTO kanbanTaskDTO)
        {
            try
            {
                var kanbanTask = new KanbanTask
                {
                    Name = kanbanTaskDTO.Name,
                    Priority = kanbanTaskDTO.Priority,
                    Position = kanbanTaskDTO.Position,
                    Description = kanbanTaskDTO.Description,
                    StartDate = kanbanTaskDTO.StartDate,
                    EndDate = kanbanTaskDTO.EndDate,
                    CategoryId = kanbanTaskDTO.CategoryId
                };

                await _repository.CreateKanbanTask(projectId, listTaskId, kanbanTask);

                return ServiceResult<string>.Ok("Kanban task created");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating kanban task");
                return ServiceResult<string>.Fail();
            }
        }

        public async Task<ServiceResult<string>> UpdateKanbanTask(ObjectId projectId, ObjectId listTaskId, ObjectId kanbanTaskId, KanbanTaskDTO kanbanTaskDTO)
        {
            try
            {
                var kanbanTask = new KanbanTask
                {
                    Id = kanbanTaskId,
                    Name = kanbanTaskDTO.Name,
                    Priority = kanbanTaskDTO.Priority,
                    Position = kanbanTaskDTO.Position,
                    Description = kanbanTaskDTO.Description,
                    StartDate = kanbanTaskDTO.StartDate,
                    EndDate = kanbanTaskDTO.EndDate,
                    CategoryId = kanbanTaskDTO.CategoryId
                };

                await _repository.UpdateKanbanTask(projectId, listTaskId, kanbanTaskId, kanbanTask);

                return ServiceResult<string>.Ok("Kanban task updated");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating kanban task");
                return ServiceResult<string>.Fail();
            }
        }

        public async Task<ServiceResult<string>> DeleteKanbanTask(ObjectId projectId, ObjectId listTaskId, ObjectId kanbanTaskId)
        {
            try
            {
                var kanbanTask = await _repository.GetKanbanTask(projectId, listTaskId, kanbanTaskId);

                var tasksInColumn = await _repository.GetListTaskById(projectId, listTaskId);

                var tasksToShift = tasksInColumn.Tasks.Where(x => x.Position > kanbanTask.Position).ToList();

                foreach (var task in tasksToShift)
                {
                    await _repository.ChangePositionToTask(projectId, listTaskId, task.Id, task.Position - 1);
                }

                await _repository.DeleteKanbanTask(projectId, listTaskId, kanbanTaskId);

                return ServiceResult<string>.Ok("Kanban task deleted");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting kanban task");
                return ServiceResult<string>.Fail();
            }
        }

        public async Task<ServiceResult<string>> MoveKanbanTask(ObjectId projectId, KanbanTaskMoveEventDTO moveTaskEventDTO)
        {
            try
            {
                var fromColumnId = ObjectId.Parse(moveTaskEventDTO.FromColumnId);
                var toColumnId = ObjectId.Parse(moveTaskEventDTO.ToColumnId);
                var taskId = ObjectId.Parse(moveTaskEventDTO.TaskId);

                if (moveTaskEventDTO.FromColumnId == moveTaskEventDTO.ToColumnId)
                {
                    var tasksInColumn = await _repository.GetListTaskById(projectId, fromColumnId);

                    if (moveTaskEventDTO.FromPosition > moveTaskEventDTO.ToPosition)
                    {
                        var tasksToShift = tasksInColumn.Tasks.Where(task => task.Position >= moveTaskEventDTO.ToPosition && task.Position < moveTaskEventDTO.FromPosition).ToList();

                        foreach (var task in tasksToShift)
                        {
                            await _repository.ChangePositionToTask(projectId, fromColumnId, task.Id, task.Position + 1);
                        }
                    }
                    else if (moveTaskEventDTO.FromPosition < moveTaskEventDTO.ToPosition)
                    {
                        var tasksToShift = tasksInColumn.Tasks.Where(task => task.Position > moveTaskEventDTO.FromPosition && task.Position <= moveTaskEventDTO.ToPosition).ToList();

                        foreach (var task in tasksToShift)
                        {
                            await _repository.ChangePositionToTask(projectId, fromColumnId, task.Id, task.Position - 1);
                        }
                    }

                    await _repository.ChangePositionToTask(projectId, fromColumnId, taskId, moveTaskEventDTO.ToPosition);

                    return ServiceResult<string>.Ok("Kanban task moved in the same column");
                }
                else
                {
                    var tasksInFromColumn = await _repository.GetListTaskById(projectId, fromColumnId);

                    var tasksToShiftFrom = tasksInFromColumn.Tasks.Where(task =>
                        task.Position > moveTaskEventDTO.FromPosition
                        ).ToList();

                    foreach (var task in tasksToShiftFrom)
                    {
                        await _repository.ChangePositionToTask(projectId, fromColumnId, task.Id, task.Position - 1);
                    }

                    var tasksInToColumn = await _repository.GetListTaskById(projectId, toColumnId);

                    var tasksToShiftTo = tasksInToColumn.Tasks.Where(task =>
                        task.Position >= moveTaskEventDTO.ToPosition
                        ).ToList();

                    foreach (var task in tasksToShiftTo)
                    {
                        await _repository.ChangePositionToTask(projectId, toColumnId, task.Id, task.Position + 1);
                    }

                    await _repository.ChangePositionToTaskInOtherColumn(projectId, fromColumnId, toColumnId, taskId, moveTaskEventDTO.ToPosition);

                    return ServiceResult<string>.Ok("Kanban task moved to another column");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error moving kanban task");
                return ServiceResult<string>.Fail();
            }
        }

        public async Task<ServiceResult<string>> MoveListTask(ObjectId projectId, ListTaskMoveEventDTO moveTaskEventDTO)
        {
            try
            {
                var columnId = ObjectId.Parse(moveTaskEventDTO.ColumnId);

                var allColumns = await _repository.GetListTasks(projectId);

                var movingColumn = await _repository.GetListTaskById(projectId, columnId);

                if (moveTaskEventDTO.FromPosition > moveTaskEventDTO.ToPosition)
                {
                    var columnsToShift = allColumns.Where(c => c.Position >= moveTaskEventDTO.ToPosition && c.Position < moveTaskEventDTO.FromPosition).ToList();

                    foreach (var col in columnsToShift)
                    {
                        await _repository.ChangePositionToColumn(projectId, col.Id, col.Position + 1);
                    }
                }
                else if (moveTaskEventDTO.FromPosition < moveTaskEventDTO.ToPosition)
                {
                    var columnsToShift = allColumns.Where(c => c.Position > moveTaskEventDTO.FromPosition && c.Position <= moveTaskEventDTO.ToPosition).ToList();

                    foreach (var col in columnsToShift)
                    {
                        await _repository.ChangePositionToColumn(projectId, col.Id, col.Position - 1);
                    }
                }

                await _repository.ChangePositionToColumn(projectId, columnId, moveTaskEventDTO.ToPosition);

                return ServiceResult<string>.Ok("Kanban column moved");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error moving kanban task");
                return ServiceResult<string>.Fail();
            }
        }
    }
}