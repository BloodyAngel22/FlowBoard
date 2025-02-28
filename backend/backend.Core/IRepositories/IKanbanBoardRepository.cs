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
        Task<List<ListTask>> GetAllListTasks(ObjectId projectId);
        Task<ListTask> GetListTasks(ObjectId projectId, ObjectId id);
        Task<ListTask> CreateListTasks(ObjectId projectId, ListTask listTask);
        Task UpdateListTasks(ObjectId projectId, ObjectId id, ListTask listTask);
        Task DeleteListTasks(ObjectId projectId, ObjectId id);

        Task<List<KanbanTask>> GetAllKanbanTasks(ObjectId projectId, ObjectId listTaskId);
        Task<KanbanTask> GetKanbanTask(ObjectId projectId, ObjectId listTaskId, ObjectId kanbanTaskId);
        Task CreateKanbanTask(ObjectId projectId, ObjectId listTaskId, KanbanTask kanbanTask);
        Task UpdateKanbanTask(ObjectId projectId, ObjectId listTaskId, ObjectId kanbanTaskId, KanbanTask kanbanTask);
        Task DeleteKanbanTask(ObjectId projectId, ObjectId listTaskId, ObjectId kanbanTaskId);
    }
}