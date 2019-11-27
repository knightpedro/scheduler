using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.ValueObjects;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Conflicts.Queries.GetWorkerConflicts
{
    public class GetWorkerConflictsQueryHandler : IRequestHandler<GetWorkerConflictsQuery, WorkerConflictsVm>
    {
        private readonly IConflictRepository _repo;

        public GetWorkerConflictsQueryHandler(IConflictRepository repo)
        {
            _repo = repo;
        }

        public async Task<WorkerConflictsVm> Handle(GetWorkerConflictsQuery request, CancellationToken cancellationToken)
        {
            var conflicts = await _repo.GetWorkerConflicts(request.WorkerId, new DateTimeRange(request.Start, request.End));
            return new WorkerConflictsVm(conflicts);
        }
    }
}
