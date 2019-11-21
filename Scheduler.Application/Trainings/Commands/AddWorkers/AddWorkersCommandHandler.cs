using MediatR;
using Scheduler.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Trainings.Commands.AddWorkers
{
    public class AddWorkersCommandHandler : IRequestHandler<AddWorkersCommand>
    {
        private readonly ITrainingRepository _repo;

        public AddWorkersCommandHandler(ITrainingRepository repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(AddWorkersCommand request, CancellationToken cancellationToken)
        {
            await _repo.AddWorkers(request.TrainingId, request.WorkerIds);
            return Unit.Value;
        }
    }
}
