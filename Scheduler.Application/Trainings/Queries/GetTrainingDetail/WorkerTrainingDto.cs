using Scheduler.Domain.Entities;

namespace Scheduler.Application.Trainings.Queries.GetTrainingDetail
{
    public class WorkerTrainingDto
    {
        public int WorkerId { get; set; }
        public string WorkerName { get; set; }

        public WorkerTrainingDto(WorkerTraining workerTraining)
        {
            WorkerId = workerTraining.WorkerId;
            WorkerName = workerTraining.Worker.Name;
        }
    }
}
