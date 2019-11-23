using Scheduler.Domain.Entities;
using System;

namespace Scheduler.Application.Jobs.Queries.GetJobsList
{
    public class JobDto
    {
        public int Id { get; set; }
        public string JobNumber { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public bool IsComplete { get; set; }
        public DateTime? DateReceived { get; set; }

        public JobDto(Job job)
        {
            Id = job.Id;
            JobNumber = job.JobNumber;
            Description = job.Description;
            Location = job.Location;
            IsComplete = job.IsComplete;
            DateReceived = job.DateReceived; 
        }
    }
}
