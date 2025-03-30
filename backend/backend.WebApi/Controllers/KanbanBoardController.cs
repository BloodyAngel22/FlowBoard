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

        [HttpGet("{columnId}")]
        public async Task<IActionResult> GetListInfo(ObjectId projectId, ObjectId columnId)
        {
            var result = await _kanbanBoardService.GetListInfo(projectId, columnId);

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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateListTask(ObjectId projectId, ObjectId id, ListTaskDTO listTaskDTO)
        {
            var result = await _kanbanBoardService.UpdateListTask(projectId, id, listTaskDTO);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteListTask(ObjectId projectId, ObjectId id)
        {
            var result = await _kanbanBoardService.DeleteListTask(projectId, id);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }

        [HttpGet("{listTaskId}/kanbantasks/{kanbanTaskId}")]
        public async Task<IActionResult> GetKanbanTask(ObjectId projectId, ObjectId listTaskId, ObjectId kanbanTaskId)
        {
            var result = await _kanbanBoardService.GetKanbanTask(projectId, listTaskId, kanbanTaskId);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }

        [HttpPost("{listTaskId}/kanbantasks")]
        public async Task<IActionResult> CreateKanbanTask(ObjectId projectId, ObjectId listTaskId, KanbanTaskDTO kanbanTaskDTO)
        {
            var result = await _kanbanBoardService.CreateKanbanTask(projectId, listTaskId, kanbanTaskDTO);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }

        [HttpPut("{listTaskId}/kanbantasks/{kanbanTaskId}")]
        public async Task<IActionResult> UpdateKanbanTask(ObjectId projectId, ObjectId listTaskId, ObjectId kanbanTaskId, KanbanTaskDTO kanbanTaskDTO)
        {
            var result = await _kanbanBoardService.UpdateKanbanTask(projectId, listTaskId, kanbanTaskId, kanbanTaskDTO);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }

        [HttpDelete("{listTaskId}/kanbantasks/{kanbanTaskId}")]
        public async Task<IActionResult> DeleteKanbanTask(ObjectId projectId, ObjectId listTaskId, ObjectId kanbanTaskId)
        {
            var result = await _kanbanBoardService.DeleteKanbanTask(projectId, listTaskId, kanbanTaskId);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }
    }
}