using MediatR;

namespace Scheduler.Application.Trainings.Queries.GetTrainingList
{
    public class GetTrainingListQuery : IRequest<TrainingListVm>
    { 
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}
