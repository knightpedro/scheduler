using MediatR;
using Scheduler.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Jobs.Commands.AssignCoordinator
{
    public class AssignCoordinatorCommandHandler : IRequestHandler<AssignCoordinatorCommand>
    {
        private readonly IJobRepository _repo;

        public AssignCoordinatorCommandHandler(IJobRepository repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(AssignCoordinatorCommand request, CancellationToken cancellationToken)
        {
            var job = await _repo.GetById(request.JobId);
            job.CoordinatorId = request.CoordinatorId;
            await _repo.Update(job);
            return Unit.Value;
        }
    }
}
