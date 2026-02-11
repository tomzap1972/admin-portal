using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AdminPortal.API.Models;

public class ContentItem
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("title")]
    public string Title { get; set; } = string.Empty;

    [BsonElement("body")]
    public string Body { get; set; } = string.Empty;

    [BsonElement("platform")]
    public string Platform { get; set; } = "all";

    [BsonElement("status")]
    public string Status { get; set; } = "draft";

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updatedAt")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
