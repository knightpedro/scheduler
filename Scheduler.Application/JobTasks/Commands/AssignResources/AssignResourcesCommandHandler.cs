using MediatR;
using Scheduler.Application.Common.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.JobTasks.Commands.AssignResources
{
    public class AssignResourcesCommandHandler : IRequestHandler<AssignResourcesCommand>
    {
        private readonly IJobTaskRepository _repo;

        public AssignResourcesCommandHandler(IJobTaskRepository repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(AssignResourcesCommand request, CancellationToken cancellationToken)
        {
            await _repo.AddResources(request.JobTaskId, request.ResourceIds);
            return Unit.Value;
        }
    }
}
