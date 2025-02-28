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
        Task<List<Project>> GetAllProjects();
        Task<Project?> GetProject(ObjectId id);
        Task<Project> CreateProject(Project project);
        Task UpdateProject(ObjectId id, Project project);
        Task DeleteProject(ObjectId id);
    }
}