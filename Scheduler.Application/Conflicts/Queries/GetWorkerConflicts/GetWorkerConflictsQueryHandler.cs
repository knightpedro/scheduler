using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Application.Common.Models;
using Scheduler.Domain.ValueObjects;
using System.Collections.Generic;
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
            IEnumerable<Appointment> conflicts;
            if (request.Start.HasValue && request.End.HasValue)
            {
                var conflictPeriod = new DateTimeRange(request.Start.Value, request.End.Value);
                conflicts = await _repo.GetWorkerConflicts(request.Id, conflictPeriod);
                
            }
            else
            {
                conflicts = await _repo.GetWorkerConflicts(request.Id);
            }
            return new WorkerConflictsVm(request.Id, conflicts);
        }
    }
}
