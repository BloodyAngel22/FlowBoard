using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using backend.Core.Converters;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Core.Models;

public class ListTask
{
    // Идентификатор
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [JsonConverter(typeof(ObjectIdToStringConverter))]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();
    // Имя
    public required string Name { get; set; }
    // Позиция списка, чтобы хранить состояние
    public required int Position { get; set; }
    // Является ли список завершающим, чтобы задачи с истекшим сроком не красились в красный
    public required bool IsFinished { get; set; }
    // Список задач внутри списка
    public List<KanbanTask> Tasks { get; set; } = [];
}