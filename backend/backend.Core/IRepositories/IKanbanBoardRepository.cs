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
    }
}