using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AdminPortal.API.Models;

public class AppConfig
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("key")]
    public string Key { get; set; } = string.Empty;

    [BsonElement("value")]
    public string Value { get; set; } = string.Empty;

    [BsonElement("platform")]
    public string Platform { get; set; } = "all";

    [BsonElement("description")]
    public string Description { get; set; } = string.Empty;

    [BsonElement("updatedAt")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
