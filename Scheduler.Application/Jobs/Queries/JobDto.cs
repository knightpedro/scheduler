using Scheduler.Domain.Entities;
using System;

namespace Scheduler.Application.Jobs.Queries
{
    public class JobDto
    {
        public int Id { get; set; }
        public int? CoordinatorId { get; set; }
        public string JobNumber { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public bool IsComplete { get; set; }
        public DateTime? DateReceived { get; set; }
        public DateTime? DateScheduled { get; set; }

        public JobDto(Job job)
        {
            Id = job.Id;
            CoordinatorId = job.CoordinatorId;
            JobNumber = job.JobNumber;
            Description = job.Description;
            Location = job.Location;
            IsComplete = job.IsComplete;
            DateReceived = job.DateReceived;
            DateScheduled = job.DateScheduled;
        }
    }
}
