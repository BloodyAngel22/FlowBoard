using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;

using MCategory = backend.Core.Models.Category;

namespace backend.Core.IRepositories
{
    public interface ICategoryRepository
    {
        Task<List<MCategory>> GetAllCategories();
        Task<MCategory?> GetCategory(ObjectId id);
        Task CreateCategory(MCategory category);
        Task UpdateCategory(ObjectId id, MCategory category);
        Task DeleteCategory(ObjectId id);
    }
}