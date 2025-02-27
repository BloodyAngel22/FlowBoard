using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using backend.Application.DTOs;
using backend.Application.Entities;
using backend.Core.IRepositories;
using backend.Core.Models;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;

namespace backend.Application.Services
{
    public class KanbanProjectsService
    (
        IKanbanProjectRepository kanbanProjectRepository,
        ILogger<KanbanProjectsService> logger
    )
    {
        private readonly IKanbanProjectRepository _kanbanProjectRepository = kanbanProjectRepository;
        private readonly ILogger<KanbanProjectsService> _logger = logger;

        public async Task<ServiceResult<List<Project>>> GetAllProjects()
        {
            var projects = await _kanbanProjectRepository.GetAll();

            return ServiceResult<List<Project>>.Ok(projects);
        }

        public async Task<ServiceResult<Project>> GetProject(ObjectId id)
        {
            var project = await _kanbanProjectRepository.Get(id);

            if (project == null)
            {
                _logger.LogError("Project not found");
                return ServiceResult<Project>.Fail();
            }

            return ServiceResult<Project>.Ok(project);
        }

        public async Task<ServiceResult<Project>> CreateProject(ProjectDTO project)
        {
            var newProject = new Project
            {
                Name = project.Name,
                Description = project.Description
            };

            try
            {
                var createdProject = await _kanbanProjectRepository.Create(newProject);

                return ServiceResult<Project>.Ok(createdProject);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating project");
                return ServiceResult<Project>.Fail();
            }
        }

        public async Task<ServiceResult<string>> UpdateProject(ObjectId id, ProjectDTO project)
        {
            var newProject = new Project
            {
                Id = id,
                Name = project.Name,
                Description = project.Description
            };

            try
            {
                await _kanbanProjectRepository.Update(id, newProject);

                return ServiceResult<string>.Ok("Project updated successfully");
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
                await _kanbanProjectRepository.Delete(id);

                return ServiceResult<string>.Ok("Project deleted successfully");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting project");
                return ServiceResult<string>.Fail();
            }
        }
    }
}