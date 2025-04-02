using backend.Application.DTOs;
using backend.Application.Services;
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

        [HttpGet("columns/{columnId}")]
        public async Task<IActionResult> GetColumn(ObjectId projectId, ObjectId columnId)
        {
            var result = await _kanbanBoardService.GetColumnInfo(projectId, columnId);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }

        [HttpPost("columns")]
        public async Task<IActionResult> CreateColumn(ObjectId projectId, ColumnDTO columnDTO)
        {
            var result = await _kanbanBoardService.CreateColumn(projectId, columnDTO);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }

        [HttpPut("columns/{id}")]
        public async Task<IActionResult> UpdateColumn(ObjectId projectId, ObjectId id, ColumnDTO columnDTO)
        {
            var result = await _kanbanBoardService.UpdateColumn(projectId, id, columnDTO);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }

        [HttpDelete("columns/{id}")]
        public async Task<IActionResult> DeleteColumn(ObjectId projectId, ObjectId id)
        {
            var result = await _kanbanBoardService.DeleteColumn(projectId, id);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }

        [HttpGet("columns/{columnId}/tasks/{taskId}")]
        public async Task<IActionResult> GetTask(ObjectId projectId, ObjectId columnId, ObjectId taskId)
        {
            var result = await _kanbanBoardService.GetTask(projectId, columnId, taskId);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }

        [HttpPost("columns/{columnId}/tasks")]
        public async Task<IActionResult> CreateTask(ObjectId projectId, ObjectId columnId, TaskDTO taskDTO)
        {
            var result = await _kanbanBoardService.CreateTask(projectId, columnId, taskDTO);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }

        [HttpPut("columns/{columnId}/tasks/{taskId}")]
        public async Task<IActionResult> UpdateTask(ObjectId projectId, ObjectId columnId, ObjectId taskId, TaskDTO taskDTO)
        {
            var result = await _kanbanBoardService.UpdateTask(projectId, columnId, taskId, taskDTO);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }

        [HttpDelete("columns/{columnId}/tasks/{taskId}")]
        public async Task<IActionResult> DeleteTask(ObjectId projectId, ObjectId columnId, ObjectId taskId)
        {
            var result = await _kanbanBoardService.DeleteTask(projectId, columnId, taskId);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }

        [HttpPut("tasks/move")]
        public async Task<IActionResult> ChangePositionToTask([FromQuery] ObjectId projectId, [FromBody] TaskMoveEventDTO moveTaskEventDTO)
        {
            var result = await _kanbanBoardService.MoveTask(projectId, moveTaskEventDTO);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }

        [HttpPut("columns/move")]
        public async Task<IActionResult> ChangePositionToColumn([FromQuery] ObjectId projectId, [FromBody] ColumnMoveEventDTO moveColumnEventDTO)
        {
            var result = await _kanbanBoardService.MoveColumn(projectId, moveColumnEventDTO);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }
    }
}