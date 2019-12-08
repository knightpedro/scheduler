using Scheduler.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Scheduler.Application.Jobs.Queries.GetJobDetail
{
    public class JobDetailVm
    {
        public int Id { get; set; }
        public string JobNumber { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public bool IsComplete { get; set; }
        public DateTime? DateReceived { get; set; }
        public DateTime? DateScheduled { get; set; }

        public string Coordinator { get; set; }

        public IEnumerable<JobTaskDto> JobTasks { get; set; }

        public JobDetailVm(Job job)
        {
            Id = job.Id;
            JobNumber = job.JobNumber;
            Description = job.Description;
            Location = job.Location;
            IsComplete = job.IsComplete;
            DateReceived = job.DateReceived;
            DateScheduled = job.DateScheduled;
            Coordinator = job.Coordinator is null ? string.Empty : job.Coordinator.Name; 
            JobTasks = job.JobTasks.Select(t => new JobTaskDto(t));
        }
    }
}
