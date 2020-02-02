using MediatR;
using Scheduler.Application.Common.Interfaces;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Conflicts.Queries.GetAllWorkerConflicts
{
    public class GetAllWorkerConflictsQueryHandler : IRequestHandler<GetAllWorkerConflictsQuery, IEnumerable<WorkerConflictsVm>>
    {
        private readonly IConflictRepository _repo;

        public GetAllWorkerConflictsQueryHandler(IConflictRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<WorkerConflictsVm>> Handle(GetAllWorkerConflictsQuery request, CancellationToken cancellationToken)
        {
            return await _repo.GetWorkerConflicts();
        }
    }
}
