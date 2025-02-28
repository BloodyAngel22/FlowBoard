using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Core.Models;
using MongoDB.Bson;

namespace backend.Core.IRepositories
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllCategories();
        Task<Category?> GetCategory(ObjectId id);
        Task CreateCategory(Category category);
        Task UpdateCategory(ObjectId id, Category category);
        Task DeleteCategory(ObjectId id);
    }
}