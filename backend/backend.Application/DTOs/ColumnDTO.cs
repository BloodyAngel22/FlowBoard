using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using backend.Core.Converters;
using MongoDB.Bson;

namespace backend.Application.DTOs
{
    public class ColumnDTO
    {
        public required string Name { get; set; }
        public required int Position { get; set; }
        public required bool IsFinished { get; set; } = false;
    }

    public class ColumnResponseWithoutTasks
    {
        [JsonConverter(typeof(ObjectIdToStringConverter))]
        public required ObjectId Id { get; set; }
        public required string Name { get; set; }
        public required int Position { get; set; }
        public required bool IsFinished { get; set; }
    }

    public class ColumnMoveEventDTO
    {
        public required string ColumnId { get; set; }
        public required int FromPosition { get; set; }
        public required int ToPosition { get; set; }
    }
}