using Microsoft.EntityFrameworkCore;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Application.Common.Models;
using Scheduler.Application.Conflicts;
using Scheduler.Domain.Common;
using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Persistence.Repositories
{
    class ScheduleEvent
    {
        public int Id { get; set; }
        public DateTimeRange Period { get; set; }
        public string Type { get; set; }

        public ScheduleEvent(Leave leave)
        {
            Id = leave.Id;
            Period = leave.LeavePeriod;
            Type = AppointmentTypes.Leave.ToString();
        }

        public ScheduleEvent(ResourceOutOfService oos)
        {
            Id = oos.Id;
            Period = oos.Period;
            Type = AppointmentTypes.OutOfService.ToString();
        }

        public ScheduleEvent(ResourceShift resourceShift)
        {
            Id = resourceShift.JobTaskId;
            Period = resourceShift.JobTask.TaskPeriod;
            Type = AppointmentTypes.JobTask.ToString();
        }

        public ScheduleEvent(WorkerShift workerShift)
        {
            Id = workerShift.JobTaskId;
            Period = workerShift.JobTask.TaskPeriod;
            Type = AppointmentTypes.JobTask.ToString();
        }

        public ScheduleEvent(WorkerTraining workerTraining)
        {
            Id = workerTraining.TrainingId;
            Period = workerTraining.Training.TrainingPeriod;
            Type = AppointmentTypes.Training.ToString();
        }
    }


    public class ConflictRepository : IConflictRepository
    {
        private readonly SchedulerDbContext context;

        public ConflictRepository(SchedulerDbContext context)
        {
            this.context = context;
        }

        private IEnumerable<ScheduleEvent> SelectEvents(Entity entity)
        {
            Resource resource = entity as Resource;
            if (resource != null) 
                return SelectResourceEvents(resource);

            Worker worker = entity as Worker;
            if (worker != null)
                return SelectWorkerEvents(worker);

            return null;
        }

        private IEnumerable<EntityConflictsVm> SelectRangeConflicts<T>(List<T> entities, DateTimeRange period) where T: Entity
        {
            var conflictsRange = new List<EntityConflictsVm>();
            entities.ForEach(e =>
            {
                var conflicts = SelectConflicts(e, period);
                conflictsRange.Add(new EntityConflictsVm
                {
                    Id = e.Id,
                    Conflicts = conflicts
                });
            });
            return conflictsRange;
        }

        private IEnumerable<ConflictDto> SelectConflicts(Entity entity, DateTimeRange period)
        {
            var events = SelectEvents(entity);
            if (period != null)
            {
                events = events.Where(e => e.Period.OverlapsWith(period));
            }

            var orderedEvents = events.OrderBy(e => e.Period.Start).ToList();
            var conflicts = new List<ConflictDto>();
            for (var i = 0; i < orderedEvents.Count(); i++)
            {
                for (var j = i + 1; j < orderedEvents.Count(); j++)
                {
                    if (orderedEvents[i].Period.OverlapsWith(orderedEvents[j].Period))
                    {
                        var eventA = orderedEvents[i];
                        var eventB = orderedEvents[j];
                        var conflict = new ConflictDto
                        {
                            EventA = new ConflictingEventDto(eventA.Id, eventA.Type),
                            EventB = new ConflictingEventDto(eventB.Id, eventB.Type),
                            Start = new DateTime(Math.Max(eventA.Period.Start.Ticks, eventB.Period.Start.Ticks)),
                            End = new DateTime(Math.Min(eventA.Period.End.Ticks, eventB.Period.End.Ticks)),
                        };
                        conflicts.Add(conflict);
                    }
                    else
                    {
                        break;
                    }
                }
            }
            return conflicts;
        }

        private IEnumerable<ScheduleEvent> SelectResourceEvents(Resource resource)
        {
            var jobTaskEvents = resource.ResourceShifts.Select(rs => new ScheduleEvent(rs));
            var oosEvents = resource.OutOfServices.Select(o => new ScheduleEvent(o));

            return jobTaskEvents
                .Concat(oosEvents);
        }

        private IEnumerable<ScheduleEvent> SelectWorkerEvents(Worker worker)
        {
            var jobTaskEvents = worker.WorkerShifts.Select(ws => new ScheduleEvent(ws));
            var leaveEvents = worker.Leave.Select(l => new ScheduleEvent(l));
            var trainingEvents = worker.WorkerTraining.Select(wt => new ScheduleEvent(wt));

            return jobTaskEvents
                .Concat(leaveEvents)
                .Concat(trainingEvents);
        }

        public async Task<IEnumerable<ConflictDto>> GetConflictsForResource(int resourceId)
        {
            return await GetConflictsForResource(resourceId, null);
        }

        public async Task<IEnumerable<ConflictDto>> GetConflictsForResource(int resourceId, DateTimeRange period)
        {
            var resource = await context.Resources
                .AsNoTracking()
                .Include(r => r.ResourceShifts)
                .ThenInclude(rs => rs.JobTask)
                .Include(r => r.OutOfServices)
                .SingleOrDefaultAsync(r => r.Id == resourceId);

            return SelectConflicts(resource, period);
        }

        public async Task<IEnumerable<ConflictDto>> GetConflictsForWorker(int workerId)
        {
            return await GetConflictsForWorker(workerId, null);
        }
    

        public async Task<IEnumerable<ConflictDto>> GetConflictsForWorker(int workerId, DateTimeRange period)
        {
            var worker = await context.Workers
                .AsNoTracking()
                .Include(w => w.WorkerShifts)
                .ThenInclude(ws => ws.JobTask)
                .Include(w => w.Leave)
                .Include(w => w.WorkerTraining)
                .ThenInclude(wt => wt.Training)
                .SingleOrDefaultAsync(w => w.Id == workerId);

            return SelectConflicts(worker, period);
        }

        public async Task<IEnumerable<EntityConflictsVm>> GetResourcesConflicts()
        {
            return await GetResourcesConflicts(null);
        }

        public async Task<IEnumerable<EntityConflictsVm>> GetResourcesConflicts(DateTimeRange period)
        {
            var resources = await context.Resources
                .AsNoTracking()
                .Include(r => r.ResourceShifts)
                .ThenInclude(rs => rs.JobTask)
                .Include(r => r.OutOfServices)
                .ToListAsync();

            return SelectRangeConflicts(resources, period);
        }

        public async Task<IEnumerable<EntityConflictsVm>> GetWorkersConflicts()
        {
            return await GetWorkersConflicts(null);
        }

        public async Task<IEnumerable<EntityConflictsVm>> GetWorkersConflicts(DateTimeRange period)
        {
            var workers = await context.Workers
                .AsNoTracking()
                .Include(w => w.WorkerShifts)
                .ThenInclude(ws => ws.JobTask)
                .Include(w => w.Leave)
                .Include(w => w.WorkerTraining)
                .ThenInclude(wt => wt.Training)
                .ToListAsync();

            return SelectRangeConflicts(workers, period);
        }
    }
}
