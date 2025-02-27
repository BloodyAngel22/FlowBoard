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

        public async Task<ServiceResult<List<ListTask>>> GetListTasks(ObjectId projectId)
        {
            try
            {
                var listTasks = await _repository.GetAllListTasks(projectId);

                return ServiceResult<List<ListTask>>.Ok(listTasks);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting list tasks");
                return ServiceResult<List<ListTask>>.Fail();
            }
        }

        public async Task<ServiceResult<ListTask>> GetListTask(ObjectId projectId, ObjectId id)
        {
            try
            {
                var listTask = await _repository.GetListTasks(projectId, id);

                return ServiceResult<ListTask>.Ok(listTask);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting list task");
                return ServiceResult<ListTask>.Fail();
            }
        }

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
    }
}