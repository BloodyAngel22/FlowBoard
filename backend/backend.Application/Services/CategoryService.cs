using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.DTOs;
using backend.Application.Entities;
using backend.Core.IRepositories;
using backend.Core.Models;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;

namespace backend.Application.Services
{
    public class CategoryService
    (
        ICategoryRepository categoryRepository,
        ILogger<CategoryService> logger
    )
    {
        private readonly ICategoryRepository _categoryRepository = categoryRepository;
        private readonly ILogger<CategoryService> _logger = logger;

        public async Task<ServiceResult<List<Category>>> GetCategories()
        {
            try
            {
                var categories = await _categoryRepository.GetAllCategories();

                return ServiceResult<List<Category>>.Ok(categories);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting categories");
                return ServiceResult<List<Category>>.Fail();
            }
        }

        public async Task<ServiceResult<Category>> GetCategory(ObjectId id)
        {
            try
            {
                var category = await _categoryRepository.GetCategory(id);

                if (category == null)
                {
                    _logger.LogError("Category not found");
                    return ServiceResult<Category>.Fail();
                }

                return ServiceResult<Category>.Ok(category);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting category");
                return ServiceResult<Category>.Fail();
            }
        }

        public async Task<ServiceResult<string>> CreateCategory(CategoryDTO category)
        {
            var newCategory = new Category
            {
                Name = category.Name
            };

            try
            {
                await _categoryRepository.CreateCategory(newCategory);

                return ServiceResult<string>.Ok("Category created");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating category");
                return ServiceResult<string>.Fail();
            }
        }

        public async Task<ServiceResult<string>> UpdateCategory(ObjectId id, CategoryDTO category)
        {
            var categoryToUpdate = new Category
            {
                Id = id,
                Name = category.Name
            };

            try
            {
                await _categoryRepository.UpdateCategory(id, categoryToUpdate);

                return ServiceResult<string>.Ok("Category updated");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating category");
                return ServiceResult<string>.Fail();
            }
        }

        public async Task<ServiceResult<string>> DeleteCategory(ObjectId id)
        {
            try
            {
                await _categoryRepository.DeleteCategory(id);

                return ServiceResult<string>.Ok("Category deleted");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting category");
                return ServiceResult<string>.Fail();
            }
        }
    }
}