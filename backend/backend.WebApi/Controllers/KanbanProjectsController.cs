using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.DTOs;
using backend.Application.Services;
using backend.WebApi.Helpers.Response;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace backend.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class KanbanProjectsController
    (
        KanbanProjectsService kanbanProjectsService
    ) : ControllerBase
    {
        private readonly KanbanProjectsService _kanbanProjectsService = kanbanProjectsService;

        [HttpGet]
        public async Task<IActionResult> GetAllProjects()
        {
            var result = await _kanbanProjectsService.GetAllProjects();

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProject(ObjectId id)
        {
            var result = await _kanbanProjectsService.GetProject(id);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject([FromBody] ProjectDTO project)
        {
            var result = await _kanbanProjectsService.CreateProject(project);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(ObjectId id, [FromBody] ProjectDTO project)
        {
            var result = await _kanbanProjectsService.UpdateProject(id, project);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(ObjectId id)
        {
            var result = await _kanbanProjectsService.DeleteProject(id);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }
    }
}