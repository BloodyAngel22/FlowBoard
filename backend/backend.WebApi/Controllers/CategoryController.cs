using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Application.DTOs;
using backend.Application.Services;
using backend.WebApi.Helpers.Response;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace backend.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController
    (
        CategoryService categoryService
    ) : ControllerBase
    {
        private readonly CategoryService _categoryService = categoryService;

        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var result = await _categoryService.GetCategories();

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(ObjectId id)
        {
            var result = await _categoryService.GetCategory(id);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] CategoryDTO category)
        {
            var result = await _categoryService.CreateCategory(category);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(ObjectId id, [FromBody] CategoryDTO category)
        {
            var result = await _categoryService.UpdateCategory(id, category);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(ObjectId id)
        {
            var result = await _categoryService.DeleteCategory(id);

            return result.Success
                ? ResponseHelper.Ok(result.Data)
                : ResponseHelper.Error();
        }
    }
}