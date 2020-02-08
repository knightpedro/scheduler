using Microsoft.EntityFrameworkCore;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Application.Common.Models;
using Scheduler.Application.Conflicts.Queries;
using Scheduler.Domain.ValueObjects;
using Scheduler.Persistence.Common;
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
        
        public async Task<IEnumerable<Appointment>> GetJobTaskConflictsForResource(int resourceId, DateTimeRange period)
        {
            var conflicts = await context.ResourceShifts
                .AsNoTracking()
                .Where(rs => rs.ResourceId == resourceId && rs.JobTask.TaskPeriod.Start < period.End && period.Start < rs.JobTask.TaskPeriod.End)
                .Select(rs => new Appointment(rs.JobTask))
                .ToListAsync();

            conflicts.ForEach(c => c.IsConflicting = true);
            return conflicts;
        }

        public async Task<IEnumerable<Appointment>> GetJobTaskConflictsForWorker(int workerId, DateTimeRange period)
        {
            var conflicts = await context.WorkerShifts
                .AsNoTracking()
                .Where(ws => ws.WorkerId == workerId && ws.JobTask.TaskPeriod.Start < period.End && period.Start < ws.JobTask.TaskPeriod.End)
                .Select(ws => new Appointment(ws.JobTask))
                .ToListAsync();

            conflicts.ForEach(c => c.IsConflicting = true);
            return conflicts;
        }

        public async Task<IEnumerable<Appointment>> GetWorkerConflicts(int workerId)
        {
            var appointments = new List<Appointment>();

            var leave = await context.Leave
                .AsNoTracking()
                .Where(l => l.WorkerId == workerId)
                .Select(l => new Appointment(l))
                .ToListAsync();

            var jobTasks = await context.WorkerShifts
                .AsNoTracking()
                .Where(ws => ws.WorkerId == workerId)
                .Select(ws => new Appointment(ws.JobTask))
                .ToListAsync();

            var training = await context.WorkerTraining
                .AsNoTracking()
                .Where(wt => wt.WorkerId == workerId)
                .Select(wt => new Appointment(wt.Training))
                .ToListAsync();

            appointments.AddRange(leave);
            appointments.AddRange(jobTasks);
            appointments.AddRange(training);

            Conflicts.GetConflicts(appointments);
            return appointments.Where(a => a.IsConflicting);
        }

        public async Task<IEnumerable<Appointment>> GetWorkerConflicts(int workerId, DateTimeRange period)
        {
            var conflicts = new List<Appointment>();
            var leaveConflicts = await GetLeaveConflicts(workerId, period);
            var jobTaskConflicts = await GetJobTaskConflictsForWorker(workerId, period);
            var trainingConflicts = await GetTrainingConflicts(workerId, period);
            conflicts.AddRange(leaveConflicts);
            conflicts.AddRange(jobTaskConflicts);
            conflicts.AddRange(trainingConflicts);
            return conflicts;
        }

        public async Task<IEnumerable<Appointment>> GetLeaveConflicts(int workerId, DateTimeRange period)
        {
            var conflicts = await context.Leave
                .AsNoTracking()
                .Where(l => l.WorkerId == workerId && l.LeavePeriod.Start < period.End && period.Start < l.LeavePeriod.End)
                .Select(l => new Appointment(l))
                .ToListAsync();

            conflicts.ForEach(c => c.IsConflicting = true);
            return conflicts;
        }

        public async Task<IEnumerable<Appointment>> GetResourceOutOfServiceConflicts(int resourceId, DateTimeRange period)
        {
            var conflicts = await context.ResourceOutOfService
                .AsNoTracking()
                .Where(o => o.ResourceId == resourceId && o.Period.Start < period.End && period.Start < o.Period.End)
                .Select(o => new Appointment(o))
                .ToListAsync();

            conflicts.ForEach(c => c.IsConflicting = true);
            return conflicts;
        }

        public async Task<IEnumerable<Appointment>> GetTrainingConflicts(int workerId, DateTimeRange period)
        {
            var conflicts = await context.WorkerTraining
                .AsNoTracking()
                .Where(wt => wt.WorkerId == workerId && wt.Training.TrainingPeriod.Start < period.End && period.Start < wt.Training.TrainingPeriod.End)
                .Select(wt => new Appointment(wt.Training))
                .ToListAsync();

            conflicts.ForEach(c => c.IsConflicting = true);
            return conflicts;
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

        public async Task<IEnumerable<Appointment>> GetResourceConflicts(int resourceId)
        {
            var appointments = new List<Appointment>();

            var oos = await context.ResourceOutOfService
                .AsNoTracking()
                .Where(o => o.ResourceId == resourceId)
                .Select(o => new Appointment(o))
                .ToListAsync();

            var jobTasks = await context.ResourceShifts
                .AsNoTracking()
                .Where(rs => rs.ResourceId == resourceId)
                .Select(rs => new Appointment(rs.JobTask))
                .ToListAsync();

            appointments.AddRange(oos);
            appointments.AddRange(jobTasks);

            Conflicts.GetConflicts(appointments);
            return appointments;
        }

        public async Task<IEnumerable<Appointment>> GetResourceConflicts(int resourceId, DateTimeRange period)
        {
            var conflicts = new List<Appointment>();
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
