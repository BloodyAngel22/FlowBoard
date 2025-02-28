using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using backend.Core.Converters;
using backend.Core.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Application.DTOs
{
    public class KanbanTaskDTO
    {
        public required string Name { get; set; }
        public Priority Priority { get; set; } = Priority.Medium;
        public required int Position { get; set; }

        public string? Description { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? CategoryId { get; set; }
    }
}