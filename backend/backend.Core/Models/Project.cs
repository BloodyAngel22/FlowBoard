using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using backend.Core.Converters;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Core.Models;

public class Project
{
    // Идентификатор
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [JsonConverter(typeof(ObjectIdToStringConverter))]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();
    // Название
    public required string Name { get; set; }
    // Список списков
    public List<ListTask> ListTasks { get; set; } = [];

    // Описание
    [BsonIgnoreIfNull]
    public string? Description { get; set; }
}