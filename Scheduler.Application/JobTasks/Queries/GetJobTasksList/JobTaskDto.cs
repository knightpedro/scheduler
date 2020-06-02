using Scheduler.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Scheduler.Application.JobTasks.Queries.GetJobTasksList
{
    public class JobTaskDto
    {
        public int Id { get; set; }
        public int JobId { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public IEnumerable<int> Workers { get; set; }
        public IEnumerable<int> Resources { get; set; }

        public JobTaskDto(JobTask jobTask)
        {
            Id = jobTask.Id;
            JobId = jobTask.JobId;
            Description = jobTask.Description;
            Start = jobTask.TaskPeriod.Start;
            End = jobTask.TaskPeriod.End;
            Workers = jobTask.WorkerShifts.Select(ws => ws.WorkerId);
            Resources = jobTask.ResourceShifts.Select(rs => rs.ResourceId);
        }
    }
}
