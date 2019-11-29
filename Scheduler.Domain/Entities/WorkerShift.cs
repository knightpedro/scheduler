namespace Scheduler.Domain.Entities
{
    public class WorkerShift
    {
        public int JobTaskId { get; set; }
        public JobTask JobTask { get; set; }

        public int WorkerId { get; set; }
        public Worker Worker { get; set; }
    }
}
