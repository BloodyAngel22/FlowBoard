using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using backend.Core.Converters;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Core.Models;

public class Column
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [JsonConverter(typeof(ObjectIdToStringConverter))]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();
    public required string Name { get; set; }
    public required int Position { get; set; }
    public required bool IsFinished { get; set; }
    public List<Task> Tasks { get; set; } = [];

    [BsonIgnoreIfNull]
    public string? Color { get; set; }
}