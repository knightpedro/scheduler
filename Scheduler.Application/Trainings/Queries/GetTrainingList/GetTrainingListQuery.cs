using MediatR;

namespace Scheduler.Application.Trainings.Queries.GetTrainingList
{
    public class GetTrainingListQuery : IRequest<TrainingListVm>
    {
    }
}
