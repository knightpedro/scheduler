using Scheduler.Domain.Entities;

namespace Scheduler.Application.Trainings.Queries.GetTrainingDetail
{
    public class WorkerTrainingDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public WorkerTrainingDto(WorkerTraining workerTraining)
        {
            Id = workerTraining.WorkerId;
            Name = workerTraining.Worker.Name;
        }
    }
}
