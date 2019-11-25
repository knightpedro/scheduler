using Scheduler.Domain.Entities;

namespace Scheduler.Application.JobTasks.Queries.GetJobTaskDetail
{
    public class WorkerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public WorkerDto(Worker worker)
        {
            Id = worker.Id;
            Name = worker.Name;
        }
    }
}