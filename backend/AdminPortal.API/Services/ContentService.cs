using MongoDB.Driver;
using AdminPortal.API.Data;
using AdminPortal.API.Models;

namespace AdminPortal.API.Services;

public class ContentService
{
    private readonly IMongoCollection<ContentItem> _content;

    public ContentService(MongoDbContext context)
    {
        _content = context.Content;
    }

    public async Task<List<ContentItem>> GetAllAsync() =>
        await _content.Find(_ => true).ToListAsync();

    public async Task<ContentItem?> GetByIdAsync(string id) =>
        await _content.Find(c => c.Id == id).FirstOrDefaultAsync();

    public async Task<ContentItem> CreateAsync(ContentItem item)
    {
        item.CreatedAt = DateTime.UtcNow;
        item.UpdatedAt = DateTime.UtcNow;
        await _content.InsertOneAsync(item);
        return item;
    }

    public async Task UpdateAsync(string id, ContentItem item)
    {
        item.UpdatedAt = DateTime.UtcNow;
        await _content.ReplaceOneAsync(c => c.Id == id, item);
    }

    public async Task DeleteAsync(string id) =>
        await _content.DeleteOneAsync(c => c.Id == id);
}
