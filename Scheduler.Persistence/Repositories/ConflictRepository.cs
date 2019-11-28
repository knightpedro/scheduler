using Microsoft.EntityFrameworkCore;
using Scheduler.Application.Common.Interfaces;
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

        public async Task<IEnumerable<JobTask>> GetJobTaskConflictsForResource(int resourceId, DateTimeRange period)
        {
            return await context.ResourceShifts
                .Where(rs => rs.ResourceId == resourceId && rs.JobTask.TaskPeriod.Start < period.End && period.Start < rs.JobTask.TaskPeriod.End)
                .Select(rs => rs.JobTask)
                .ToListAsync();
        }

        public async Task<IEnumerable<JobTask>> GetJobTaskConflictsForWorker(int workerId, DateTimeRange period)
        {
            return await context.WorkerShifts
                .Where(ws => ws.WorkerId == workerId && ws.JobTask.TaskPeriod.Start < period.End && period.Start < ws.JobTask.TaskPeriod.End)
                .Select(ws => ws.JobTask)
                .ToListAsync();
        }

        public async Task<IEnumerable<Leave>> GetLeaveConflicts(int workerId, DateTimeRange period)
        {
            return await context.Leave
                .Where(l => l.WorkerId == workerId && l.LeavePeriod.Start < period.End && period.Start < l.LeavePeriod.End)
                .ToListAsync();
        }

        public async Task<IEnumerable<ResourceOutOfService>> GetResourceOutOfServiceConflicts(int resourceId, DateTimeRange period)
        {
            return await context.ResourceOutOfService
                .Where(o => o.ResourceId == resourceId && o.Period.Start < period.End && period.Start < o.Period.End)
                .ToListAsync();
        }

        public async Task<IEnumerable<Training>> GetTrainingConflicts(int workerId, DateTimeRange period)
        {
            return await context.WorkerTraining
                .Where(wt => wt.WorkerId == workerId && wt.Training.TrainingPeriod.Start < period.End && period.Start < wt.Training.TrainingPeriod.End)
                .Select(wt => wt.Training)
                .ToListAsync();
        }
    }
}
