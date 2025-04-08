using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.DTOs;
using backend.Application.Entities;
using backend.Application.Entities.Validation;
using backend.Core.IRepositories;
using FluentValidation;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;

using MColumn = backend.Core.Models.Column;
using MTask = backend.Core.Models.Task;

namespace backend.Application.Services
{
    public class KanbanBoardService
    (
        IKanbanBoardRepository repository,
        ILogger<KanbanBoardService> logger,
        IValidator<ColumnDTO> columnValidator,
        IValidator<TaskDTO> taskValidator,
        IValidator<ColumnMoveEventDTO> columnMoveEventValidator,
        IValidator<TaskMoveEventDTO> taskMoveEventValidator
    )
    {
        private readonly IKanbanBoardRepository _repository = repository;
        private readonly ILogger<KanbanBoardService> _logger = logger;
        private readonly IValidator<ColumnDTO> _columnValidator = columnValidator;
        private readonly IValidator<TaskDTO> _taskValidator = taskValidator;
        private readonly IValidator<ColumnMoveEventDTO> _columnMoveEventValidator = columnMoveEventValidator;
        private readonly IValidator<TaskMoveEventDTO> _taskMoveEventValidator = taskMoveEventValidator;

        public async Task<ServiceResult<ColumnResponseWithoutTasks>> GetColumnInfo(ObjectId projectId, ObjectId id)
        {
            try
            {
                var column = await _repository.GetColumnById(projectId, id);

                var columnDTOWithoutTasks = new ColumnResponseWithoutTasks
                {
                    Id = column.Id,
                    Name = column.Name,
                    Position = column.Position,
                    IsFinished = column.IsFinished,
                    Color = column.Color
                };

                return ServiceResult<ColumnResponseWithoutTasks>.Ok(columnDTOWithoutTasks);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting list task");
                return ServiceResult<ColumnResponseWithoutTasks>.Fail();
            }
        }

        public async Task<ServiceResult<string>> CreateColumn(ObjectId projectId, ColumnDTO columnDTO)
        {
            var validationResult = await _columnValidator.ValidateAsync(columnDTO);
            if (!validationResult.IsValid)
            {
                var errors = ValidatorError.GetErrors(validationResult);
                _logger.LogError("Validation failed {errors}", ValidatorError.GetErrorsString(errors));
                return ServiceResult<string>.Fail();
            }

            try
            {
                var column = new MColumn
                {
                    Name = columnDTO.Name,
                    Position = columnDTO.Position,
                    IsFinished = columnDTO.IsFinished,
                    Color = columnDTO.Color
                };

                var createdColumn = await _repository.CreateColumn(projectId, column);

                return ServiceResult<string>.Ok("List task created");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating list task");
                return ServiceResult<string>.Fail();
            }
        }

        public async Task<ServiceResult<string>> UpdateColumn(ObjectId projectId, ObjectId id, ColumnDTO columnDTO)
        {
            var validationResult = await _columnValidator.ValidateAsync(columnDTO);
            if (!validationResult.IsValid)
            {
                var errors = ValidatorError.GetErrors(validationResult);
                _logger.LogError("Validation failed {errors}", ValidatorError.GetErrorsString(errors));
                return ServiceResult<string>.Fail();
            }

            try
            {
                var column = new MColumn
                {
                    Id = id,
                    Name = columnDTO.Name,
                    Position = columnDTO.Position,
                    IsFinished = columnDTO.IsFinished,
                    Color = columnDTO.Color
                };

                await _repository.UpdateColumn(projectId, id, column);

                return ServiceResult<string>.Ok("List task updated");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating list task");
                return ServiceResult<string>.Fail();
            }
        }

        public async Task<ServiceResult<string>> DeleteColumn(ObjectId projectId, ObjectId id)
        {
            try
            {
                var column = await _repository.GetColumnById(projectId, id);
                var columns = await _repository.GetColumns(projectId);

                var columnsToShift = columns.Where(c => c.Position > column.Position).ToList();

                foreach (var col in columnsToShift)
                {
                    await _repository.ChangePositionToColumn(projectId, col.Id, col.Position - 1);
                }

                await _repository.DeleteColumn(projectId, id);

                return ServiceResult<string>.Ok("List task deleted");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting list task");
                return ServiceResult<string>.Fail();
            }
        }

        public async Task<ServiceResult<MTask>> GetTask(ObjectId projectId, ObjectId columnId, ObjectId taskId)
        {
            try
            {
                var task = await _repository.GetTask(projectId, columnId, taskId);

                return ServiceResult<MTask>.Ok(task);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting kanban task");
                return ServiceResult<MTask>.Fail();
            }
        }

        public async Task<ServiceResult<string>> CreateTask(ObjectId projectId, ObjectId columnId, TaskDTO taskDTO)
        {
            var validationResult = await _taskValidator.ValidateAsync(taskDTO);
            if (!validationResult.IsValid)
            {
                var errors = ValidatorError.GetErrors(validationResult);
                _logger.LogError("Validation failed {errors}", ValidatorError.GetErrorsString(errors));
                return ServiceResult<string>.Fail();
            }

            try
            {
                var task = new MTask
                {
                    Name = taskDTO.Name,
                    Priority = taskDTO.Priority,
                    Position = taskDTO.Position,
                    Description = taskDTO.Description,
                    StartDate = taskDTO.StartDate,
                    EndDate = taskDTO.EndDate,
                    CategoryId = taskDTO.CategoryId
                };

                await _repository.CreateTask(projectId, columnId, task);

                return ServiceResult<string>.Ok("Kanban task created");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating kanban task");
                return ServiceResult<string>.Fail();
            }
        }

        public async Task<ServiceResult<string>> UpdateTask(ObjectId projectId, ObjectId columnId, ObjectId taskId, TaskDTO taskDTO)
        {
            var validationResult = await _taskValidator.ValidateAsync(taskDTO);
            if (!validationResult.IsValid)
            {
                var errors = ValidatorError.GetErrors(validationResult);
                _logger.LogError("Validation failed {errors}", ValidatorError.GetErrorsString(errors));
                return ServiceResult<string>.Fail();
            }

            try
            {
                var task = new MTask
                {
                    Id = taskId,
                    Name = taskDTO.Name,
                    Priority = taskDTO.Priority,
                    Position = taskDTO.Position,
                    Description = taskDTO.Description,
                    StartDate = taskDTO.StartDate,
                    EndDate = taskDTO.EndDate,
                    CategoryId = taskDTO.CategoryId
                };

                await _repository.UpdateTask(projectId, columnId, taskId, task);

                return ServiceResult<string>.Ok("Kanban task updated");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating kanban task");
                return ServiceResult<string>.Fail();
            }
        }

        public async Task<ServiceResult<string>> DeleteTask(ObjectId projectId, ObjectId columnId, ObjectId taskId)
        {
            try
            {
                var task = await _repository.GetTask(projectId, columnId, taskId);

                var tasksInColumn = await _repository.GetColumnById(projectId, columnId);

                var tasksToShift = tasksInColumn.Tasks.Where(x => x.Position > task.Position).ToList();

                foreach (var taskToShift in tasksToShift)
                {
                    await _repository.ChangePositionToTask(projectId, columnId, taskToShift.Id, taskToShift.Position - 1);
                }

                await _repository.DeleteTask(projectId, columnId, taskId);

                return ServiceResult<string>.Ok("Kanban task deleted");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting kanban task");
                return ServiceResult<string>.Fail();
            }
        }

        public async Task<ServiceResult<string>> MoveTask(ObjectId projectId, TaskMoveEventDTO moveTaskEventDTO)
        {
            var validationResult = await _taskMoveEventValidator.ValidateAsync(moveTaskEventDTO);
            if (!validationResult.IsValid)
            {
                var errors = ValidatorError.GetErrors(validationResult);
                _logger.LogError("Validation failed {errors}", ValidatorError.GetErrorsString(errors));
                return ServiceResult<string>.Fail();
            }

            try
            {
                var fromColumnId = ObjectId.Parse(moveTaskEventDTO.FromColumnId);
                var toColumnId = ObjectId.Parse(moveTaskEventDTO.ToColumnId);
                var taskId = ObjectId.Parse(moveTaskEventDTO.TaskId);

                if (moveTaskEventDTO.FromColumnId == moveTaskEventDTO.ToColumnId)
                {
                    var tasksInColumn = await _repository.GetColumnById(projectId, fromColumnId);

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
                    var tasksInFromColumn = await _repository.GetColumnById(projectId, fromColumnId);

                    var tasksToShiftFrom = tasksInFromColumn.Tasks.Where(task =>
                        task.Position > moveTaskEventDTO.FromPosition
                        ).ToList();

                    foreach (var task in tasksToShiftFrom)
                    {
                        await _repository.ChangePositionToTask(projectId, fromColumnId, task.Id, task.Position - 1);
                    }

                    var tasksInToColumn = await _repository.GetColumnById(projectId, toColumnId);

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

        public async Task<ServiceResult<string>> MoveColumn(ObjectId projectId, ColumnMoveEventDTO moveTaskEventDTO)
        {
            var validationResult = await _columnMoveEventValidator.ValidateAsync(moveTaskEventDTO);
            if (!validationResult.IsValid)
            {
                var errors = ValidatorError.GetErrors(validationResult);
                _logger.LogError("Validation failed {errors}", ValidatorError.GetErrorsString(errors));
                return ServiceResult<string>.Fail();
            }

            try
            {
                var columnId = ObjectId.Parse(moveTaskEventDTO.ColumnId);

                var allColumns = await _repository.GetColumns(projectId);

                var movingColumn = await _repository.GetColumnById(projectId, columnId);

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