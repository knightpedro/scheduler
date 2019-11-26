using MediatR;
using Scheduler.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.JobTasks.Commands.AssignWorkers
{
    public class AssignWorkersCommandHandler : IRequestHandler<AssignWorkersCommand>
    {
        private readonly IJobTaskRepository _repo;

        public AssignWorkersCommandHandler(IJobTaskRepository repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(AssignWorkersCommand request, CancellationToken cancellationToken)
        {
            await _repo.AddWorkers(request.JobTaskId, request.WorkerIds);
            return Unit.Value;
        }
    }
}
