using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Trainings.Queries.GetTrainingDetail
{
    public class GetTrainingDetailQueryHandler : IRequestHandler<GetTrainingDetailQuery, TrainingDetailVm>
    {
        private readonly ITrainingRepository _repo;

        public GetTrainingDetailQueryHandler(ITrainingRepository repo)
        {
            _repo = repo;
        }

        public async Task<TrainingDetailVm> Handle(GetTrainingDetailQuery request, CancellationToken cancellationToken)
        {
            var training = await _repo.GetTrainingWithWorkers(request.Id);

            if (training is null)
                throw new NotFoundException(nameof(Training), request.Id);

            return new TrainingDetailVm(training);
        }
    }
}
