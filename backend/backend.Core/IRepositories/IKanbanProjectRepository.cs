using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Core.Models;
using MongoDB.Bson;

namespace backend.Core.IRepositories
{
    public interface IKanbanProjectRepository
    {
        Task<List<Project>> GetAll();
        Task<Project?> Get(ObjectId id);
        Task<Project> Create(Project project);
        Task Update(ObjectId id, Project project);
        Task Delete(ObjectId id);
    }
}