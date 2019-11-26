using MediatR;
using Scheduler.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.JobTasks.Commands.RemoveWorkers
{
    public class RemoveWorkersCommandHandler : IRequestHandler<RemoveWorkersCommand>
    {
        private readonly IJobTaskRepository _repo;

        public RemoveWorkersCommandHandler(IJobTaskRepository repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(RemoveWorkersCommand request, CancellationToken cancellationToken)
        {
            await _repo.RemoveWorkers(request.JobTaskId, request.WorkerIds);
            return Unit.Value;
        }
    }
}
