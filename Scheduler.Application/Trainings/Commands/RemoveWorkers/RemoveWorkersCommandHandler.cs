using MediatR;
using Scheduler.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Trainings.Commands.RemoveWorkers
{
    public class RemoveWorkersCommandHandler : IRequestHandler<RemoveWorkersCommand>
    {
        private readonly ITrainingRepository _repo;

        public RemoveWorkersCommandHandler(ITrainingRepository repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(RemoveWorkersCommand request, CancellationToken cancellationToken)
        {
            await _repo.RemoveWorkers(request.TrainingId, request.WorkerIds);
            return Unit.Value;
        }
    }
}
