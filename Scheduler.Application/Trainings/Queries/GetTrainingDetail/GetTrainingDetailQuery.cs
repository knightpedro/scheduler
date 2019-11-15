using MediatR;

namespace Scheduler.Application.Trainings.Queries.GetTrainingDetail
{
    public class GetTrainingDetailQuery : IRequest<TrainingDetailVm>
    {
        public int Id { get; set; }
    }
}
