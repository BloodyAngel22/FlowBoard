using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;

using MColumn = backend.Core.Models.Column;
using MTask = backend.Core.Models.Task;

namespace backend.Core.IRepositories
{
    public interface IKanbanBoardRepository
    {
        Task<MColumn> CreateColumn(ObjectId projectId, MColumn column);
        Task UpdateColumn(ObjectId projectId, ObjectId id, MColumn column);
        Task DeleteColumn(ObjectId projectId, ObjectId id);

        Task<MTask> GetTask(ObjectId projectId, ObjectId columnId, ObjectId taskId);
        Task CreateTask(ObjectId projectId, ObjectId columnId, MTask task);
        Task UpdateTask(ObjectId projectId, ObjectId columnId, ObjectId taskId, MTask task);
        Task DeleteTask(ObjectId projectId, ObjectId columnId, ObjectId taskId);
        Task<MTask> GetTaskByPosition(ObjectId projectId, ObjectId columnId, int position);

        Task ChangePositionToTask(ObjectId projectId, ObjectId columnId, ObjectId taskId, int position);
        Task ChangePositionToTaskInOtherColumn(ObjectId projectId, ObjectId currentColumnId, ObjectId newColumnId, ObjectId taskId, int position);

        Task ChangePositionToColumn(ObjectId projectId, ObjectId columnId, int position);

        Task<MColumn> GetColumnById(ObjectId projectId, ObjectId id);
        Task<List<MColumn>> GetColumns(ObjectId projectId);
    }
}