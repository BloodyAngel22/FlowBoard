using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Core.Models;
using MongoDB.Bson;

namespace backend.Core.IRepositories
{
    public interface IKanbanBoardRepository
    {
        Task<ListTask> CreateListTasks(ObjectId projectId, ListTask listTask);
        Task UpdateListTasks(ObjectId projectId, ObjectId id, ListTask listTask);
        Task DeleteListTasks(ObjectId projectId, ObjectId id);

        Task<KanbanTask> GetKanbanTask(ObjectId projectId, ObjectId listTaskId, ObjectId kanbanTaskId);
        Task CreateKanbanTask(ObjectId projectId, ObjectId listTaskId, KanbanTask kanbanTask);
        Task UpdateKanbanTask(ObjectId projectId, ObjectId listTaskId, ObjectId kanbanTaskId, KanbanTask kanbanTask);
        Task DeleteKanbanTask(ObjectId projectId, ObjectId listTaskId, ObjectId kanbanTaskId);
        // Task MoveKanbanTask(ObjectId projectId, ObjectId listTaskId, ObjectId kanbanTaskId, int position);
        Task<KanbanTask> GetKanbanTaskByPosition(ObjectId projectId, ObjectId listTaskId, int position);

        Task ChangePositionToTask(ObjectId projectId, ObjectId listTaskId, ObjectId kanbanTaskId, int position);
        Task ChangePositionToTaskInOtherColumn(ObjectId projectId, ObjectId currentListTaskId, ObjectId newListTaskId, ObjectId kanbanTaskId, int position);

        Task ChangePositionToColumn(ObjectId projectId, ObjectId listTaskId, int position);

        Task<ListTask> GetListTaskById(ObjectId projectId, ObjectId id);
        Task<List<ListTask>> GetListTasks(ObjectId projectId);
    }
}