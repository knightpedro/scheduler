using MediatR;

namespace Scheduler.Application.Training.Queries.GetTrainingList
{
    public class GetTrainingListQuery : IRequest<TrainingListVm>
    {
    }
}
