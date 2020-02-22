using Scheduler.Domain.Entities;

namespace Scheduler.Application.JobTasks.Queries.GetJobTaskDetail
{
    public class JobDto
    {
        public int Id { get; set; }
        public string JobNumber { get; set; }

        public JobDto(Job job)
        {
            Id = job.Id;
            JobNumber = job.JobNumber;
        }
    }
}
