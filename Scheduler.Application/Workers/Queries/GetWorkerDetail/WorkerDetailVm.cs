using Scheduler.Domain.Entities;

namespace Scheduler.Application.Workers.Queries.GetWorkerDetail
{
    public class WorkerDetailVm
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }

        public WorkerDetailVm(Worker worker)
        {
            Id = worker.Id;
            Name = worker.Name;
            IsActive = worker.IsActive;
        }
    }
}
