using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using backend.Core.Converters;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Core.Models;

public class Task
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [JsonConverter(typeof(ObjectIdToStringConverter))]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();
    public required string Name { get; set; }
    public Priority Priority { get; set; } = Priority.Medium;
    public required int Position { get; set; }

    [BsonIgnoreIfNull]
    public string? Description { get; set; }
    [BsonIgnoreIfNull]
    public DateTime? StartDate { get; set; }
    [BsonIgnoreIfNull]
    public DateTime? EndDate { get; set; }
    [BsonIgnoreIfNull]
    [JsonConverter(typeof(ObjectIdToStringConverter))]
    public ObjectId? CategoryId { get; set; }
}