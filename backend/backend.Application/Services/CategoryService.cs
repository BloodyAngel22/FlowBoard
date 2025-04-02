using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.DTOs;
using backend.Application.Entities;
using backend.Core.IRepositories;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;

using MCategory = backend.Core.Models.Category;

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

        public async Task<ServiceResult<List<MCategory>>> GetCategories()
        {
            try
            {
                var categories = await _categoryRepository.GetAllCategories();

                return ServiceResult<List<MCategory>>.Ok(categories);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting categories");
                return ServiceResult<List<MCategory>>.Fail();
            }
        }

        public async Task<ServiceResult<MCategory>> GetCategory(ObjectId id)
        {
            try
            {
                var category = await _categoryRepository.GetCategory(id);

                if (category == null)
                {
                    _logger.LogError("MCategory not found");
                    return ServiceResult<MCategory>.Fail();
                }

                return ServiceResult<MCategory>.Ok(category);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting category");
                return ServiceResult<MCategory>.Fail();
            }
        }

        public async Task<ServiceResult<string>> CreateCategory(CategoryDTO category)
        {
            var newCategory = new MCategory
            {
                Name = category.Name
            };

            try
            {
                await _categoryRepository.CreateCategory(newCategory);

                return ServiceResult<string>.Ok("MCategory created");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating category");
                return ServiceResult<string>.Fail();
            }
        }

        public async Task<ServiceResult<string>> UpdateCategory(ObjectId id, CategoryDTO category)
        {
            var categoryToUpdate = new MCategory
            {
                Id = id,
                Name = category.Name
            };

            try
            {
                await _categoryRepository.UpdateCategory(id, categoryToUpdate);

                return ServiceResult<string>.Ok("MCategory updated");
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

                return ServiceResult<string>.Ok("MCategory deleted");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting category");
                return ServiceResult<string>.Fail();
            }
        }
    }
}