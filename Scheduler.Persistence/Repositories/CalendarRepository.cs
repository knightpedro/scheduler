using Microsoft.EntityFrameworkCore;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.ValueObjects;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scheduler.Application.Calendar.Queries;
using Scheduler.Application.Common.Models;
using Scheduler.Persistence.Common;

namespace Scheduler.Persistence.Repositories
{
    public class CalendarRepository : ICalendarRepository
    {
        private readonly SchedulerDbContext context;

        public CalendarRepository(SchedulerDbContext context)
        {
            this.context = context;
        }

        public async Task<ResourceCalendarDto> GetResourceCalendar(int resourceId)
        {
            var resource = await context.Resources
                .AsNoTracking()
                .Include(r => r.OutOfServices)
                .Include(r => r.ResourceShifts)
                .ThenInclude(rs => rs.JobTask)
                .SingleOrDefaultAsync(r => r.Id == resourceId);

            var appointments = new List<Appointment>();
            appointments.AddRange(resource.OutOfServices.Select(o => new Appointment(o)));
            appointments.AddRange(resource.ResourceShifts.Select(rs => new Appointment(rs.JobTask)));
            Conflicts.GetConflicts(appointments);

            var resourceDto = new ResourceCalendarDto
            {
                Id = resource.Id,
                Name = resource.Name,
                IsActive = resource.IsActive,
                Description = resource.Description,
                Appointments = appointments
            };

            return resourceDto;
        }

        public async Task<ResourceCalendarDto> GetResourceCalendar(int resourceId, DateTimeRange period)
        {
            var outOfServices = await context.ResourceOutOfService
                .AsNoTracking()
                .Where(o => o.ResourceId == resourceId)
                .Where(o => o.Period.Start < period.End && period.Start < o.Period.End)
                .Select(o => new Appointment(o))
                .ToListAsync();

            var jobTasks = await context.ResourceShifts
                .AsNoTracking()
                .Include(rs => rs.JobTask)
                .Where(rs => rs.ResourceId == resourceId)
                .Where(rs => rs.JobTask.TaskPeriod.Start < period.End && period.Start < rs.JobTask.TaskPeriod.End)
                .Select(rs => new Appointment(rs.JobTask))
                .ToListAsync();

            var appointments = new List<Appointment>();
            appointments.AddRange(outOfServices);
            appointments.AddRange(jobTasks);
            Conflicts.GetConflicts(appointments);

            var resource = await context.Resources
                .AsNoTracking()
                .SingleOrDefaultAsync(r => r.Id == resourceId);

            return new ResourceCalendarDto
            {
                Id = resource.Id,
                Name = resource.Name,
                IsActive = resource.IsActive,
                Description = resource.Description,
                Appointments = appointments
            };
        }

        public async Task<IEnumerable<ResourceCalendarDto>> GetResourcesCalendar(DateTimeRange period)
        {
            var outOfServices = await context.ResourceOutOfService
                .AsNoTracking()
                .Where(o => o.Period.Start < period.End && period.Start < o.Period.End)
                .ToListAsync();

            var resourceShifts = await context.ResourceShifts
                .AsNoTracking()
                .Include(rs => rs.JobTask)
                .Where(rs => rs.JobTask.TaskPeriod.Start < period.End && period.Start < rs.JobTask.TaskPeriod.End)
                .ToListAsync();

            var resources = await context.Resources
                .AsNoTracking()
                .Where(r => r.IsActive)
                .ToListAsync();

            var calendar = new List<ResourceCalendarDto>();

            foreach(var resource in resources)
            {
                var appointments = new List<Appointment>();

                var resourceOutOfServices = outOfServices
                    .Where(o => o.ResourceId == resource.Id)
                    .Select(o => new Appointment(o));

                var resourceJobTasks = resourceShifts.Where(rs => rs.ResourceId == resource.Id)
                    .Select(rs => new Appointment(rs.JobTask));

                appointments.AddRange(resourceOutOfServices);
                appointments.AddRange(resourceJobTasks);
                Conflicts.GetConflicts(appointments);

                var resourceDto = new ResourceCalendarDto
                {
                    Id = resource.Id,
                    Description = resource.Description,
                    Name = resource.Name,
                    IsActive = resource.IsActive,
                    Appointments = appointments
                };

                calendar.Add(resourceDto);
            }

            return calendar;
        }

        public async Task<WorkerCalendarDto> GetWorkerCalendar(int workerId)
        {
            var worker = await context.Workers
                .AsNoTracking()
                .Include(w => w.Leave)
                .Include(w => w.WorkerTraining)
                .ThenInclude(wt => wt.Training)
                .Include(w => w.WorkerShifts)
                .ThenInclude(ws => ws.JobTask)
                .SingleOrDefaultAsync(w => w.Id == workerId);

            var appointments = new List<Appointment>();
            appointments.AddRange(worker.Leave.Select(l => new Appointment(l)));
            appointments.AddRange(worker.WorkerShifts.Select(ws => new Appointment(ws.JobTask)));
            appointments.AddRange(worker.WorkerTraining.Select(wt => new Appointment(wt.Training)));
            Conflicts.GetConflicts(appointments);

            return new WorkerCalendarDto
            {
                Id = worker.Id,
                Name = worker.Name,
                IsActive = worker.IsActive,
                Appointments = appointments
            };
        }

        public async Task<WorkerCalendarDto> GetWorkerCalendar(int workerId, DateTimeRange period)
        {
            var leave = await context.Leave
                .AsNoTracking()
                .Where(l => l.WorkerId == workerId)
                .Where(l => l.LeavePeriod.Start < period.End && period.Start < l.LeavePeriod.End)
                .Select(l => new Appointment(l))
                .ToListAsync();

            var training = await context.WorkerTraining
                .AsNoTracking()
                .Include(wt => wt.Training)
                .Where(wt => wt.WorkerId == workerId)
                .Where(wt => wt.Training.TrainingPeriod.Start < period.End && period.Start < wt.Training.TrainingPeriod.End)
                .Select(wt => new Appointment(wt.Training))
                .ToListAsync();

            var jobTasks = await context.WorkerShifts
                .AsNoTracking()
                .Include(ws => ws.JobTask)
                .Where(ws => ws.WorkerId == workerId)
                .Where(ws => ws.JobTask.TaskPeriod.Start < period.End && period.Start < ws.JobTask.TaskPeriod.End)
                .Select(ws => new Appointment(ws.JobTask))
                .ToListAsync();

            var worker = await context.Workers
                .AsNoTracking()
                .SingleOrDefaultAsync(w => w.Id == workerId);

            var appointments = new List<Appointment>();
            appointments.AddRange(leave);
            appointments.AddRange(jobTasks);
            appointments.AddRange(training);
            Conflicts.GetConflicts(appointments);

            return new WorkerCalendarDto
            {
                Id = worker.Id,
                Name = worker.Name,
                IsActive = worker.IsActive,
                Appointments = appointments
            };
        }

        public async Task<IEnumerable<WorkerCalendarDto>> GetWorkersCalendar(DateTimeRange period)
        {
            var leave = await context.Leave
                .AsNoTracking()
                .Where(l => l.LeavePeriod.Start < period.End && period.Start < l.LeavePeriod.End)
                .ToListAsync();

            var workerTraining = await context.WorkerTraining
                .AsNoTracking()
                .Include(wt => wt.Training)
                .Where(wt => wt.Training.TrainingPeriod.Start < period.End && period.Start < wt.Training.TrainingPeriod.End)
                .ToListAsync();

            var workerShifts = await context.WorkerShifts
                .AsNoTracking()
                .Include(ws => ws.JobTask)
                .Where(ws => ws.JobTask.TaskPeriod.Start < period.End && period.Start < ws.JobTask.TaskPeriod.End)
                .ToListAsync();

            var workers = await context.Workers
                .AsNoTracking()
                .Where(w => w.IsActive)
                .ToListAsync();

            var calendar = new List<WorkerCalendarDto>();

            foreach (var worker in workers)
            {
                var workerLeave = leave
                    .Where(l => l.WorkerId == worker.Id)
                    .Select(l => new Appointment(l));

                var workerJobTasks = workerShifts
                    .Where(ws => ws.WorkerId == worker.Id)
                    .Select(ws => new Appointment(ws.JobTask));

                var training = workerTraining
                    .Where(wt => wt.WorkerId == worker.Id)
                    .Select(wt => new Appointment(wt.Training));

                var appointments = new List<Appointment>();
                appointments.AddRange(workerLeave);
                appointments.AddRange(workerJobTasks);
                appointments.AddRange(training);
                Conflicts.GetConflicts(appointments);

                var workerDto = new WorkerCalendarDto 
                { 
                    Id = worker.Id,
                    Name = worker.Name,
                    IsActive = worker.IsActive,
                    Appointments = appointments
                };

                calendar.Add(workerDto);
            }

            return calendar;
        }
    }
}
