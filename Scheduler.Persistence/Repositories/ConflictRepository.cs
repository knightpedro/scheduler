using Microsoft.EntityFrameworkCore;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Application.Conflicts.Queries;
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

        bool Overlaps(IAppointment a, IAppointment b)
        {
            return a.Start < b.End && b.Start < a.End;
        }

        List<IAppointment> GetConflicts(List<IAppointment> appointments)
        {
            var conflicts = new List<IAppointment>();
            appointments.OrderBy(a => a.Start);
            for (int i = 0; i < appointments.Count - 1; i++)
            {
                if (Overlaps(appointments[i], appointments[i + 1]))
                {
                    if (!conflicts.Contains(appointments[i]))
                        conflicts.Add(appointments[i]);
                    conflicts.Add(appointments[i + 1]);
                }
            }
            return conflicts;
        }
        
        public async Task<IEnumerable<ResourceConflictDto>> GetJobTaskConflictsForResource(int resourceId, DateTimeRange period)
        {
            return await context.ResourceShifts
                .AsNoTracking()
                .Where(rs => rs.ResourceId == resourceId && rs.JobTask.TaskPeriod.Start < period.End && period.Start < rs.JobTask.TaskPeriod.End)
                .Select(rs => new ResourceConflictDto(rs.JobTask))
                .ToListAsync();
        }

        public async Task<IEnumerable<WorkerConflictDto>> GetJobTaskConflictsForWorker(int workerId, DateTimeRange period)
        {
            return await context.WorkerShifts
                .AsNoTracking()
                .Where(ws => ws.WorkerId == workerId && ws.JobTask.TaskPeriod.Start < period.End && period.Start < ws.JobTask.TaskPeriod.End)
                .Select(ws => new WorkerConflictDto(ws.JobTask))
                .ToListAsync();
        }

        public async Task<IEnumerable<WorkerConflictDto>> GetWorkerConflicts(int workerId)
        {
            var appointments = new List<IAppointment>();

            var leave = await context.Leave
                .AsNoTracking()
                .Where(l => l.WorkerId == workerId)
                .Select(l => new WorkerConflictDto(l))
                .ToListAsync();

            var jobTasks = await context.WorkerShifts
                .AsNoTracking()
                .Where(ws => ws.WorkerId == workerId)
                .Select(ws => new WorkerConflictDto(ws.JobTask))
                .ToListAsync();

            var training = await context.WorkerTraining
                .AsNoTracking()
                .Where(wt => wt.WorkerId == workerId)
                .Select(wt => new WorkerConflictDto(wt.Training))
                .ToListAsync();

            appointments.AddRange(leave);
            appointments.AddRange(jobTasks);
            appointments.AddRange(training);

            return GetConflicts(appointments).Cast<WorkerConflictDto>();
        }

        public async Task<IEnumerable<WorkerConflictDto>> GetWorkerConflicts(int workerId , DateTimeRange period)
        {
            var conflicts = new List<WorkerConflictDto>();
            var leaveConflicts = await GetLeaveConflicts(workerId, period);
            var jobTaskConflicts = await GetJobTaskConflictsForWorker(workerId, period);
            var trainingConflicts = await GetTrainingConflicts(workerId, period);
            conflicts.AddRange(leaveConflicts);
            conflicts.AddRange(jobTaskConflicts);
            conflicts.AddRange(trainingConflicts);
            return conflicts;
        }

        public async Task<IEnumerable<WorkerConflictDto>> GetLeaveConflicts(int workerId, DateTimeRange period)
        {
            return await context.Leave
                .AsNoTracking()
                .Where(l => l.WorkerId == workerId && l.LeavePeriod.Start < period.End && period.Start < l.LeavePeriod.End)
                .Select(l => new WorkerConflictDto(l))
                .ToListAsync();
        }

        public async Task<IEnumerable<ResourceConflictDto>> GetResourceOutOfServiceConflicts(int resourceId, DateTimeRange period)
        {
            return await context.ResourceOutOfService
                .AsNoTracking()
                .Where(o => o.ResourceId == resourceId && o.Period.Start < period.End && period.Start < o.Period.End)
                .Select(o => new ResourceConflictDto(o))
                .ToListAsync();
        }

        public async Task<IEnumerable<WorkerConflictDto>> GetTrainingConflicts(int workerId, DateTimeRange period)
        {
            return await context.WorkerTraining
                .AsNoTracking()
                .Where(wt => wt.WorkerId == workerId && wt.Training.TrainingPeriod.Start < period.End && period.Start < wt.Training.TrainingPeriod.End)
                .Select(wt => new WorkerConflictDto(wt.Training))
                .ToListAsync();
        }

        public async Task<IEnumerable<ResourceConflictsVm>> GetResourceConflicts()
        {
            var conflicts = new List<ResourceConflictsVm>();
            var resourceIds = await context.Resources.Select(r => r.Id).ToListAsync();
            foreach (var id in resourceIds)
            {
                var resourceConflicts = await GetResourceConflicts(id);
                conflicts.Add(new ResourceConflictsVm(id, resourceConflicts));
            }
            return conflicts;
        }

        public async Task<IEnumerable<ResourceConflictDto>> GetResourceConflicts(int resourceId)
        {
            var appointments = new List<IAppointment>();

            var oos = await context.ResourceOutOfService
                .AsNoTracking()
                .Where(o => o.ResourceId == resourceId)
                .Select(o => new ResourceConflictDto(o))
                .ToListAsync();

            var jobTasks = await context.ResourceShifts
                .AsNoTracking()
                .Where(rs => rs.ResourceId == resourceId)
                .Select(rs => new ResourceConflictDto(rs.JobTask))
                .ToListAsync();

            appointments.AddRange(oos);
            appointments.AddRange(jobTasks);

            var conflicts = GetConflicts(appointments);
            return conflicts.Cast<ResourceConflictDto>();
        }

        public async Task<IEnumerable<ResourceConflictDto>> GetResourceConflicts(int resourceId, DateTimeRange period)
        {
            var conflicts = new List<ResourceConflictDto>();
            var outOfServiceConflicts = await GetResourceOutOfServiceConflicts(resourceId, period);
            var jobTaskConflicts = await GetJobTaskConflictsForResource(resourceId, period);
            conflicts.AddRange(outOfServiceConflicts);
            conflicts.AddRange(jobTaskConflicts);
            return conflicts;
        }

        public async Task<IEnumerable<WorkerConflictsVm>> GetWorkerConflicts()
        {
            var conflicts = new List<WorkerConflictsVm>();
            var workerIds = await context.Workers.Select(w => w.Id).ToListAsync();
            foreach(var id in workerIds)
            {
                var workerConflicts = await GetWorkerConflicts(id);
                conflicts.Add(new WorkerConflictsVm(id, workerConflicts));
            }
            return conflicts;
        }
    }
}
