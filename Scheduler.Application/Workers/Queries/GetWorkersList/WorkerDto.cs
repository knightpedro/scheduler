using Scheduler.Domain.Entities;

namespace Scheduler.Application.Workers.Queries.GetWorkersList
{
    public class WorkerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }

        public WorkerDto(Worker w)
        {
            Id = w.Id;
            Name = w.Name;
            IsActive = w.IsActive;
        }
    }
}
