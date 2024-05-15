using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace task_manager_server.Models
{
    public class TaskModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public bool IsCompleted { get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        public DateTime Date { get; set; } // Store date as DateTime
    }
}
