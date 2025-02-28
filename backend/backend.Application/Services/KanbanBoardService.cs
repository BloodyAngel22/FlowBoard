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

        public async Task<ServiceResult<ListTask>> CreateListTask(ObjectId projectId, ListTaskDTO listTaskDTO)
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

                return ServiceResult<ListTask>.Ok(createdListTask);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating list task");
                return ServiceResult<ListTask>.Fail();
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
                await _repository.DeleteKanbanTask(projectId, listTaskId, kanbanTaskId);

                return ServiceResult<string>.Ok("Kanban task deleted");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting kanban task");
                return ServiceResult<string>.Fail();
            }
        }
    }
}