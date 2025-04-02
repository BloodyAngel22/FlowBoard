using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;

using MProject = backend.Core.Models.Project;

namespace backend.Core.IRepositories
{
    public interface IKanbanProjectRepository
    {
        Task<List<MProject>> GetAllProjects();
        Task<MProject?> GetProject(ObjectId id);
        Task<MProject> CreateProject(MProject project);
        Task UpdateProject(ObjectId id, MProject project);
        Task DeleteProject(ObjectId id);
    }
}