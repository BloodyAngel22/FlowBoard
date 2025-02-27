using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Core.Models;

// bug
// todo
// research
public class Category
{
    [BsonId]
    public int Id { get; set; }
    public required string Name { get; set; }
}