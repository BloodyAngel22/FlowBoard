using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using backend.Core.Converters;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Core.Models;

public class KanbanTask
{
    // Идентификатор
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [JsonConverter(typeof(ObjectIdToStringConverter))]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();
    // Имя задачи
    public required string Name { get; set; }
    // Приоритет задачи
    public Priority Priority { get; set; } = Priority.Medium;
    // Позиция в списке задач, чтобы хранить состояние 
    public required int Position { get; set; }

    // Описание
    [BsonIgnoreIfNull]
    public string? Description { get; set; }
    // Дата начала
    [BsonIgnoreIfNull]
    public DateTime? StartDate { get; set; }
    // Дата окончания
    [BsonIgnoreIfNull]
    public DateTime? EndDate { get; set; }
    // Категория
    [BsonIgnoreIfNull]
    [JsonConverter(typeof(ObjectIdToStringConverter))]
    public ObjectId? CategoryId { get; set; }
}