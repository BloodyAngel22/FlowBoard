using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using backend.Core.Converters;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Core.Models;

// bug
// todo
// research
public class Category
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [JsonConverter(typeof(ObjectIdToStringConverter))]
    public ObjectId Id { get; set; }
    public required string Name { get; set; }
}