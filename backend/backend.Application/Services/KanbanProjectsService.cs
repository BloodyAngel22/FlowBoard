using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using backend.Application.DTOs;
using backend.Application.Entities;
using backend.Application.Entities.Validation;
using backend.Core.IRepositories;
using FluentValidation;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;

using MProject = backend.Core.Models.Project;

namespace backend.Application.Services
{
    public class KanbanProjectsService
    (
        IKanbanProjectRepository kanbanProjectRepository,
        ILogger<KanbanProjectsService> logger,
        IValidator<ProjectDTO> projectValidator
    )
    {
        private readonly IKanbanProjectRepository _kanbanProjectRepository = kanbanProjectRepository;
        private readonly ILogger<KanbanProjectsService> _logger = logger;
        private readonly IValidator<ProjectDTO> _projectValidator = projectValidator;

        public async Task<ServiceResult<List<ProjectDTOWithoutColumns>>> GetAllProjects()
        {
            var projects = await _kanbanProjectRepository.GetAllProjects();

            var projectsWithoutColumns = projects.Select(project => new ProjectDTOWithoutColumns
            {
                Id = project.Id,
                Name = project.Name,
                Description = project.Description
            }).ToList();

            return ServiceResult<List<ProjectDTOWithoutColumns>>.Ok(projectsWithoutColumns);
        }

        public async Task<ServiceResult<MProject>> GetProject(ObjectId id)
        {
            var project = await _kanbanProjectRepository.GetProject(id);

            if (project == null)
            {
                _logger.LogError("MProject not found");
                return ServiceResult<MProject>.Fail();
            }

            return ServiceResult<MProject>.Ok(project);
        }

        public async Task<ServiceResult<MProject>> CreateProject(ProjectDTO project)
        {
            var validationResult = await _projectValidator.ValidateAsync(project);
            if (!validationResult.IsValid)
            {
                var errors = ValidatorError.GetErrors(validationResult);
                _logger.LogError("Validation failed {errors}", ValidatorError.GetErrorsString(errors));
                return ServiceResult<MProject>.Fail();
            }
            
            var newProject = new MProject
            {
                Name = project.Name,
                Description = project.Description
            };

            try
            {
                var createdProject = await _kanbanProjectRepository.CreateProject(newProject);

                return ServiceResult<MProject>.Ok(createdProject);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating project");
                return ServiceResult<MProject>.Fail();
            }
        }

        public async Task<ServiceResult<string>> UpdateProject(ObjectId id, ProjectDTO project)
        {
            var validationResult = await _projectValidator.ValidateAsync(project);
            if (!validationResult.IsValid)
            {
                var errors = ValidatorError.GetErrors(validationResult);
                _logger.LogError("Validation failed {errors}", ValidatorError.GetErrorsString(errors));
                return ServiceResult<string>.Fail();
            }

            try
            {
                var existingProject = await _kanbanProjectRepository.GetProject(id);

                var newProject = new MProject
                {
                    Id = id,
                    Name = project.Name,
                    Description = project.Description,
                    Columns = existingProject?.Columns ?? [],
                };

                await _kanbanProjectRepository.UpdateProject(id, newProject);

                return ServiceResult<string>.Ok("MProject updated successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating project");
                return ServiceResult<string>.Fail();
            }
        }

        public async Task<ServiceResult<string>> DeleteProject(ObjectId id)
        {
            try
            {
                await _kanbanProjectRepository.DeleteProject(id);

                return ServiceResult<string>.Ok("MProject deleted successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting project");
                return ServiceResult<string>.Fail();
            }
        }
    }
}