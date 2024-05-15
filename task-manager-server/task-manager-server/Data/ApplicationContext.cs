using Microsoft.Extensions.Options;
using MongoDB.Driver;
using task_manager_server.Configurations;
using task_manager_server.Models;

namespace task_manager_server.Data
{
    public class ApplicationContext
    {
        private readonly IMongoDatabase _database;
        public ApplicationContext(IOptions<MongoDBSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            _database = client.GetDatabase(settings.Value.DatabaseName);
        }
        public IMongoCollection<TaskModel> Tasks => _database.GetCollection<TaskModel>("tasks");

    }
}
