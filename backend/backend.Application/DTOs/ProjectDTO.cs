using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Core.Models;

namespace backend.Application.DTOs
{
    public class ProjectDTO
    {
        public required string Name { get; set; }
        public string? Description { get; set; }
    }
}