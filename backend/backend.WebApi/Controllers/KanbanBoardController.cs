using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.DTOs;
using backend.Application.Entities;
using backend.Application.Services;
using backend.Core.Models;
using backend.WebApi.Helpers.Response;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace backend.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KanbanBoardController
    (
        KanbanBoardService kanbanBoardService
    ) : ControllerBase
    {
        private readonly KanbanBoardService _kanbanBoardService = kanbanBoardService;

        [HttpGet]
        public async Task<IActionResult> GetListTasks(ObjectId projectId)
        {
            var result = await _kanbanBoardService.GetListTasks(projectId);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetListTask(ObjectId projectId, ObjectId id)
        {
            var result = await _kanbanBoardService.GetListTask(projectId, id);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }

        [HttpPost]
        public async Task<IActionResult> CreateListTask(ObjectId projectId, ListTaskDTO listTaskDTO)
        {
            var result = await _kanbanBoardService.CreateListTask(projectId, listTaskDTO);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }
    }
}