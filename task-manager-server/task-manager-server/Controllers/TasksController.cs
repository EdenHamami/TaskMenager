using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using task_manager_server.Data;
using task_manager_server.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Threading.Tasks;

namespace task_manager_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public TasksController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/tasks?date=2024-05-15
        [HttpGet]
        public async Task<ActionResult<List<TaskModel>>> GetTasksByDate([FromQuery] string date)
        {
            if (!DateTime.TryParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime parsedDate))
            {
                return BadRequest("Invalid date format. Please use YYYY-MM-DD.");
            }

            var filter = Builders<TaskModel>.Filter.Eq(t => t.Date, parsedDate.Date);
            var tasks = await _context.Tasks.Find(filter).ToListAsync();
            return Ok(tasks);
        }

        // GET: api/tasks/{taskId} -> get task by id
        [HttpGet("{taskId:length(24)}", Name = "GetTaskById")]
        public async Task<ActionResult<TaskModel>> GetTaskById(string taskId)
        {
            var task = await _context.Tasks.Find(t => t.Id == taskId).FirstOrDefaultAsync();
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        // POST: api/tasks -> create new task
        [HttpPost]
        public async Task<ActionResult<TaskModel>> CreateTask([FromBody] TaskModel task)
        {
            task.Id = null; // Ensure the ID is null so MongoDB generates a new one
            task.Date = task.Date.Date; // Ensure only the date part is saved
            await _context.Tasks.InsertOneAsync(task);
            return CreatedAtRoute("GetTaskById", new { taskId = task.Id }, task);
        }

        // PUT: api/tasks/{taskId} -> update task
        [HttpPut("{taskId:length(24)}")]
        public async Task<IActionResult> EditTask(string taskId, [FromBody] TaskModel updatedTask)
        {
            if (updatedTask.Id != taskId)
            {
                return BadRequest("Task ID mismatch");
            }

            if (!DateTime.TryParseExact(updatedTask.Date.ToString("yyyy-MM-dd"), "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime parsedDate))
            {
                return BadRequest("Invalid date format. Please use YYYY-MM-DD.");
            }

            var task = await _context.Tasks.Find(t => t.Id == taskId).FirstOrDefaultAsync();
            if (task == null)
            {
                return NotFound();
            }

            updatedTask.Date = parsedDate.Date; // Ensure the date is correctly parsed
            updatedTask.Id = taskId; // Ensure the task ID is consistent
            await _context.Tasks.ReplaceOneAsync(t => t.Id == taskId, updatedTask);
            return NoContent();
        }

        // DELETE: api/tasks/{taskId} -> delete task by id
        [HttpDelete("{taskId:length(24)}")]
        public async Task<IActionResult> DeleteTask(string taskId)
        {
            var result = await _context.Tasks.DeleteOneAsync(t => t.Id == taskId);
            if (result.DeletedCount == 0)
            {
                return NotFound();
            }
            return NoContent();
        }

        // PATCH: api/tasks/{taskId}/toggle -> toggle task completion status
        [HttpPatch("{taskId:length(24)}/toggle")]
        public async Task<IActionResult> ToggleTaskCompletion(string taskId)
        {
            var task = await _context.Tasks.Find(t => t.Id == taskId).FirstOrDefaultAsync();
            if (task == null)
            {
                return NotFound();
            }

            task.IsCompleted = !task.IsCompleted; // Toggle the completion status
            await _context.Tasks.ReplaceOneAsync(t => t.Id == taskId, task);

            return Ok(task);
        }
    }
}
