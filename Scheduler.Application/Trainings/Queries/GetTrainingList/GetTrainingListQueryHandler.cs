using MediatR;
using Scheduler.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Trainings.Queries.GetTrainingList
{
    public class GetTrainingListQueryHandler : IRequestHandler<GetTrainingListQuery, TrainingListVm>
    {
        private readonly ITrainingRepository _repo;

        public GetTrainingListQueryHandler(ITrainingRepository repo)
        {
            _repo = repo;
        }

        public async Task<TrainingListVm> Handle(GetTrainingListQuery request, CancellationToken cancellationToken)
        {
            var training = await _repo.GetAll();
            return new TrainingListVm(training);
        }
    }
}
