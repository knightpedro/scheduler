using Scheduler.Domain.Entities;
using System;

namespace Scheduler.Application.Workers.Queries.GetWorkersCalendar
{
    public class JobTaskDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        public JobTaskDto(JobTask task)
        {
            Id = task.Id;
            Description = task.Description;
            Start = task.TaskPeriod.Start;
            End = task.TaskPeriod.End;
        }
    }
}
