using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using backend.Core.Converters;
using MongoDB.Bson;

namespace backend.Application.DTOs
{
    public class ListTaskDTO
    {
        public required string Name { get; set; }
        public required int Position { get; set; }
        public required bool IsFinished { get; set; } = false;
    }

    public class ListTaskResponseWithoutTasks
    {
        [JsonConverter(typeof(ObjectIdToStringConverter))]
        public required ObjectId Id { get; set; }
        public required string Name { get; set; }
        public required int Position { get; set; }
        public required bool IsFinished { get; set; }
    }

    public class ListTaskMoveEventDTO
    {
        public required string ColumnId { get; set; }
        public required int FromPosition { get; set; }
        public required int ToPosition { get; set; }
    }
}