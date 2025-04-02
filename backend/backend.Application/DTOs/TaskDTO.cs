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
    public class TaskDTO
    {
        public required string Name { get; set; }
        public Priority Priority { get; set; } = Priority.Medium;
        public required int Position { get; set; }

        public string? Description { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        [JsonConverter(typeof(ObjectIdToStringConverter))]
        public ObjectId? CategoryId { get; set; }
    }

    public class TaskMoveEventDTO
    {
        public required string TaskId { get; set; }
        public required int FromPosition { get; set; }
        public required string FromColumnId { get; set; }
        public required int ToPosition { get; set; }
        public required string ToColumnId { get; set; }
    }
}