using MongoDB.Driver;
using AdminPortal.API.Models;

namespace AdminPortal.API.Data;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(IConfiguration configuration)
    {
        var connectionString = configuration.GetValue<string>("MongoDB:ConnectionString")!;
        var databaseName = configuration.GetValue<string>("MongoDB:DatabaseName")!;
        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(databaseName);
    }

    public IMongoCollection<User> Users => _database.GetCollection<User>("users");
    public IMongoCollection<ContentItem> Content => _database.GetCollection<ContentItem>("content");
    public IMongoCollection<AppConfig> Configs => _database.GetCollection<AppConfig>("configs");
}
