using MongoDB.Driver;
using AdminPortal.API.Data;
using AdminPortal.API.Models;

namespace AdminPortal.API.Services;

public class ConfigService
{
    private readonly IMongoCollection<AppConfig> _configs;

    public ConfigService(MongoDbContext context)
    {
        _configs = context.Configs;
    }

    public async Task<List<AppConfig>> GetAllAsync() =>
        await _configs.Find(_ => true).ToListAsync();

    public async Task<AppConfig?> GetByIdAsync(string id) =>
        await _configs.Find(c => c.Id == id).FirstOrDefaultAsync();

    public async Task<AppConfig> CreateAsync(AppConfig config)
    {
        config.UpdatedAt = DateTime.UtcNow;
        await _configs.InsertOneAsync(config);
        return config;
    }

    public async Task UpdateAsync(string id, AppConfig config)
    {
        config.UpdatedAt = DateTime.UtcNow;
        await _configs.ReplaceOneAsync(c => c.Id == id, config);
    }

    public async Task DeleteAsync(string id) =>
        await _configs.DeleteOneAsync(c => c.Id == id);
}
