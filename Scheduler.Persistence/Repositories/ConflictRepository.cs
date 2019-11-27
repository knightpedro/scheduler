using Microsoft.EntityFrameworkCore;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Dtos;
using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Persistence.Repositories
{
    public class ConflictRepository : IConflictRepository
    {
        private readonly SchedulerDbContext context;

        public ConflictRepository(SchedulerDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<ConflictDto>> GetResourceConflicts(int resourceId, DateTimeRange period)
        {
            var conflicts = new List<ConflictDto>();

            var outOfServiceConflicts = await context.ResourceOutOfService
                .Where(o => o.ResourceId == resourceId && o.Period.OverlapsWith(period))
                .Select(o => new ConflictDto { ConflictsWithId = resourceId, Period = o.Period, ConflictType = nameof(ResourceOutOfService) })
                .ToListAsync();

            var jobTaskConflicts = await context.ResourceShifts
                .Where(rs => rs.ResourceId == resourceId && rs.JobTask.TaskPeriod.OverlapsWith(period))
                .Select(rs => new ConflictDto { ConflictsWithId = resourceId, Period = rs.JobTask.TaskPeriod, ConflictType = nameof(JobTask) })
                .ToListAsync();

            conflicts.AddRange(outOfServiceConflicts);
            conflicts.AddRange(jobTaskConflicts);
            return conflicts;
        }

        public async Task<IEnumerable<ConflictDto>> GetWorkerConflicts(int workerId, DateTimeRange period)
        {
            var conflicts = new List<ConflictDto>();

            var leaveConflicts = await context.Leave
                .Where(l => l.WorkerId == workerId && l.LeavePeriod.OverlapsWith(period))
                .Select(l => new ConflictDto {ConflictsWithId = workerId, Period = l.LeavePeriod, ConflictType = nameof(Leave) })
                .ToListAsync();

            var jobTaskConflicts = await context.WorkerShifts
                .Where(ws => ws.WorkerId == workerId && ws.JobTask.TaskPeriod.OverlapsWith(period))
                .Select(ws => new ConflictDto { ConflictsWithId = workerId, Period = ws.JobTask.TaskPeriod, ConflictType = nameof(JobTask) })
                .ToListAsync();

            var trainingConflicts = await context.WorkerTraining
                .Where(wt => wt.WorkerId == workerId && wt.Training.TrainingPeriod.OverlapsWith(period))
                .Select(wt => new ConflictDto { ConflictsWithId = workerId, Period = wt.Training.TrainingPeriod, ConflictType = nameof(Training) })
                .ToListAsync();

            conflicts.AddRange(leaveConflicts);
            conflicts.AddRange(jobTaskConflicts);
            conflicts.AddRange(trainingConflicts);
            return conflicts;
        }
    }
}
