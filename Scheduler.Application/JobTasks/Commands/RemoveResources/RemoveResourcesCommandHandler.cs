using MediatR;
using Scheduler.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.JobTasks.Commands.RemoveResources
{
    class RemoveResourcesCommandHandler : IRequestHandler<RemoveResourcesCommand>
    {
        private readonly IJobTaskRepository _repo;

        public RemoveResourcesCommandHandler(IJobTaskRepository repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(RemoveResourcesCommand request, CancellationToken cancellationToken)
        {
            await _repo.RemoveResources(request.JobTaskId, request.ResourceIds);
            return Unit.Value;
        }
    }
}
