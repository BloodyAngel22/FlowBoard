using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Core.IRepositories;
using MongoDB.Bson;
using MongoDB.Driver;

using MCategory = backend.Core.Models.Category;

namespace backend.Infrastructure.Repositories
{
    public class CategoryRepository(AppDbContext context) : ICategoryRepository
    {
        private readonly AppDbContext _context = context;

        public async Task CreateCategory(MCategory category)
        {
            await _context.Categories.InsertOneAsync(category);
        }

        public async Task DeleteCategory(ObjectId id)
        {
            var category = await _context.Categories.Find(category => category.Id == id).FirstOrDefaultAsync() ?? throw new Exception("MCategory not found");

            await _context.Categories.DeleteOneAsync(category => category.Id == id);
        }

        public async Task<List<MCategory>> GetAllCategories()
        {
            var categories = await _context.Categories.Find(_ => true).ToListAsync();

            return categories;
        }

        public async Task<MCategory?> GetCategory(ObjectId id)
        {
            var category = await _context.Categories.Find(category => category.Id == id).FirstOrDefaultAsync();

            return category;
        }

        public async Task UpdateCategory(ObjectId id, MCategory category)
        {
            var existingCategory = await _context.Categories.Find(category => category.Id == id).FirstOrDefaultAsync() ?? throw new Exception("MCategory not found");

            existingCategory.Name = category.Name;

            await _context.Categories.ReplaceOneAsync(category => category.Id == id, existingCategory);
        }
    }
}