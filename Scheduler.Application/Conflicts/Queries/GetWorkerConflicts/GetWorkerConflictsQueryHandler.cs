using MediatR;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.ValueObjects;
using System.Collections.Generic;
using System.Linq;
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
            var conflictPeriod = new DateTimeRange(request.Start, request.End);
            var conflicts = new List<WorkerConflictDto>();

            var conflictingJobTasks = await _repo.GetJobTaskConflictsForWorker(request.WorkerId, conflictPeriod);
            conflicts.AddRange(conflictingJobTasks.Select(jt => new WorkerConflictDto 
            { 
                Id = jt.Id, 
                ConflictType = WorkerConflictType.JobTask, 
                Start = jt.TaskPeriod.Start, 
                End = jt.TaskPeriod.End
            }));

            var conflictingLeave = await _repo.GetLeaveConflicts(request.WorkerId, conflictPeriod);
            conflicts.AddRange(conflictingLeave.Select(l => new WorkerConflictDto
            {
                Id = l.Id,
                ConflictType = WorkerConflictType.Leave,
                Start = l.LeavePeriod.Start,
                End = l.LeavePeriod.End,
            }));

            var conflictingTraining = await _repo.GetTrainingConflicts(request.WorkerId, conflictPeriod);
            conflicts.AddRange(conflictingTraining.Select(t => new WorkerConflictDto
            {
                Id = t.Id,
                ConflictType = WorkerConflictType.Training,
                Start = t.TrainingPeriod.Start,
                End = t.TrainingPeriod.End
            }));

            return new WorkerConflictsVm(conflicts);
        }
    }
}
