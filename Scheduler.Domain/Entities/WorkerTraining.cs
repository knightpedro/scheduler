namespace Scheduler.Domain.Entities
{
    public class WorkerTraining
    {
        public int TrainingId { get; set; }
        public Training Training { get; set; }

        public int WorkerId { get; set; }
        public Worker Worker { get; set; }
    }
}