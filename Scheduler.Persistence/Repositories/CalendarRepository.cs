using Microsoft.EntityFrameworkCore;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Application.Workers.Queries.GetWorkersCalendar;
using Scheduler.Domain.ValueObjects;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.Persistence.Repositories
{
    public class CalendarRepository : ICalendarRepository
    {
        private readonly SchedulerDbContext context;

        public CalendarRepository(SchedulerDbContext context)
        {
            this.context = context;
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
