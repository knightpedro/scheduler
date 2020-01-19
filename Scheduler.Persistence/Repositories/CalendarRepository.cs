using Microsoft.EntityFrameworkCore;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.ValueObjects;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Scheduler.Application.Calendar.Queries;

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

            var resourceDto = new ResourceCalendarDto
            {
                Id = resource.Id,
                Name = resource.Name,
                Description = resource.Description,
                OutOfServices = resource.OutOfServices.Select(o => new OutOfServiceDto(o)),
                JobTasks = resource.ResourceShifts.Select(rs => new JobTaskDto(rs.JobTask))
            };

            return resourceDto;
        }

        public async Task<ResourceCalendarDto> GetResourceCalendar(int resourceId, DateTimeRange period)
        {
            var outOfServices = await context.ResourceOutOfService
                .AsNoTracking()
                .Where(o => o.ResourceId == resourceId)
                .Where(o => o.Period.Start < period.End && period.Start < o.Period.End)
                .Select(o => new OutOfServiceDto(o))
                .ToListAsync();

            var jobTasks = await context.ResourceShifts
                .AsNoTracking()
                .Include(rs => rs.JobTask)
                .Where(rs => rs.ResourceId == resourceId)
                .Where(rs => rs.JobTask.TaskPeriod.Start < period.End && period.Start < rs.JobTask.TaskPeriod.End)
                .Select(rs => new JobTaskDto(rs.JobTask))
                .ToListAsync();

            var resource = await context.Resources
                .AsNoTracking()
                .SingleOrDefaultAsync(r => r.Id == resourceId);

            return new ResourceCalendarDto
            {
                Id = resource.Id,
                Name = resource.Name,
                Description = resource.Description,
                OutOfServices = outOfServices,
                JobTasks = jobTasks
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
                var resourceDto = new ResourceCalendarDto
                {
                    Id = resource.Id,
                    Description = resource.Description,
                    Name = resource.Name
                };

                resourceDto.OutOfServices = outOfServices
                    .Where(o => o.ResourceId == resource.Id)
                    .Select(o => new OutOfServiceDto(o));

                resourceDto.JobTasks = resourceShifts.Where(rs => rs.ResourceId == resource.Id)
                    .Select(rs => new JobTaskDto(rs.JobTask));

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

            return new WorkerCalendarDto
            {
                Id = worker.Id,
                Name = worker.Name,
                Leave = worker.Leave.Select(l => new LeaveDto(l)),
                Training = worker.WorkerTraining.Select(wt => new TrainingDto(wt.Training)),
                JobTasks = worker.WorkerShifts.Select(ws => new JobTaskDto(ws.JobTask))
            };
        }

        public async Task<WorkerCalendarDto> GetWorkerCalendar(int workerId, DateTimeRange period)
        {
            var leave = await context.Leave
                .AsNoTracking()
                .Where(l => l.WorkerId == workerId)
                .Where(l => l.LeavePeriod.Start < period.End && period.Start < l.LeavePeriod.End)
                .Select(l => new LeaveDto(l))
                .ToListAsync();

            var training = await context.WorkerTraining
                .AsNoTracking()
                .Include(wt => wt.Training)
                .Where(wt => wt.WorkerId == workerId)
                .Where(wt => wt.Training.TrainingPeriod.Start < period.End && period.Start < wt.Training.TrainingPeriod.End)
                .Select(wt => new TrainingDto(wt.Training))
                .ToListAsync();

            var jobTasks = await context.WorkerShifts
                .AsNoTracking()
                .Include(ws => ws.JobTask)
                .Where(ws => ws.WorkerId == workerId)
                .Where(ws => ws.JobTask.TaskPeriod.Start < period.End && period.Start < ws.JobTask.TaskPeriod.End)
                .Select(ws => new JobTaskDto(ws.JobTask))
                .ToListAsync();

            var worker = await context.Workers
                .AsNoTracking()
                .SingleOrDefaultAsync(w => w.Id == workerId);

            return new WorkerCalendarDto
            {
                Id = worker.Id,
                Name = worker.Name,
                Leave = leave,
                Training = training,
                JobTasks = jobTasks
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
                var workerDto = new WorkerCalendarDto 
                { 
                    Id = worker.Id,
                    Name = worker.Name
                };

                workerDto.Leave = leave
                    .Where(l => l.WorkerId == worker.Id)
                    .Select(l => new LeaveDto(l));

                workerDto.Training = workerTraining
                    .Where(wt => wt.WorkerId == worker.Id)
                    .Select(wt => new TrainingDto(wt.Training));

                workerDto.JobTasks = workerShifts
                    .Where(ws => ws.WorkerId == worker.Id)
                    .Select(ws => new JobTaskDto(ws.JobTask));

                calendar.Add(workerDto);
            }

            return calendar;
        }
    }
}
