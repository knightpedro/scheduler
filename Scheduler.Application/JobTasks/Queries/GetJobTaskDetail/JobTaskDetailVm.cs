using Scheduler.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Scheduler.Application.JobTasks.Queries.GetJobTaskDetail
{
    public class JobTaskDetailVm
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public IEnumerable<WorkerDto> Workers { get; set; }
        public IEnumerable<ResourceDto> Resources { get; set; }

        public JobTaskDetailVm(JobTask task)
        {
            Id = task.Id;
            Description = task.Description;
            Start = task.TaskPeriod.Start;
            End = task.TaskPeriod.End;
            Workers = task.WorkerShifts.Select(ws => new WorkerDto(ws.Worker));
            Resources = task.ResourceShifts.Select(rs => new ResourceDto(rs.Resource));
        }
    }
} 