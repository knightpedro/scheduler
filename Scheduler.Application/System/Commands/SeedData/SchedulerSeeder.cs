using Bogus;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.System.Commands.SeedData
{
    public class SchedulerSeeder
    {
        private readonly ISchedulerDbContext _context;
        private readonly DateTime _start = new DateTime(2019, 10, 1);
        private readonly DateTime _end = DateTime.Now.AddMonths(2);
        private readonly TimeSpan _scheduleSpan;
        private readonly Randomizer _randomizer;
 

        public SchedulerSeeder(ISchedulerDbContext context)
        {
            _context = context;
            _scheduleSpan = _end - _start;
            _randomizer = new Randomizer();
        }

        public static string CapitaliseFirstLetter(string s)
        {
            if (string.IsNullOrEmpty(s))
                return string.Empty;

            char[] a = s.ToCharArray();
            a[0] = char.ToUpper(a[0]);
            return new string(a);
        }

        public async Task SeedAll(CancellationToken cancellationToken)
        {
            if (_context.Workers.Any())
            {
                return;
            }
            await SeedCoordinators(cancellationToken);
            await SeedResources(cancellationToken);
            await SeedResourceOutOfService(cancellationToken);
            await SeedWorkers(cancellationToken);
            await SeedWorkerLeave(cancellationToken);
            await SeedJobs(cancellationToken);
            await SeedJobTasks(cancellationToken);
            await SeedTraining(cancellationToken);
            await SeedWorkerTraining(cancellationToken);
            await SeedResourceShifts(cancellationToken);
            await SeedWorkerShifts(cancellationToken);
        }

        private async Task SeedCoordinators(CancellationToken cancellationToken)
        {
            var coordinatorFaker = new Faker<Coordinator>()
                .RuleFor(c => c.Name, f => f.Name.FullName())
                .RuleFor(c => c.Email, (f, c) => $"{c.Name.Split()[0].ToLower()}{c.Name.Split()[1].ToLower()}@scheduler.test")
                .RuleFor(c => c.IsActive, f => true);

            var coordinators = coordinatorFaker.Generate(3);
            _context.Coordinators.AddRange(coordinators);
            await _context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedJobs(CancellationToken cancellationToken)
        {
            var coordinatorIds = _context.Coordinators.Select(c => c.Id).ToList();
            var jobNumber = 1;
            var jobFaker = new Faker<Job>()
                .RuleFor(j => j.JobNumber, f => string.Format("J{0:D3}", jobNumber++))
                .RuleFor(j => j.Description, f => f.Lorem.Sentence().Trim('.'))
                .RuleFor(j => j.Location, f => f.Address.StreetAddress())
                .RuleFor(j => j.CoordinatorId, f => f.PickRandom(coordinatorIds))
                .RuleFor(j => j.DateReceived, f => f.Date.Between(_start, DateTime.Now))
                .RuleFor(j => j.DateScheduled, (f, j) => j.DateReceived + f.Date.Timespan())
                .RuleFor(j => j.IsComplete, f => f.Random.Bool(0.7f));

            var jobsCount = _scheduleSpan.Days / 10;
            var jobs = jobFaker.Generate(jobsCount);
            _context.Jobs.AddRange(jobs);
            await _context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedJobTasks(CancellationToken cancellationToken)
        {
            var tasks = new List<JobTask>();
            var jobs = _context.Jobs.ToList();

            jobs.ForEach(j =>
            {
                var taskFaker = new Faker<JobTask>()
                    .RuleFor(t => t.Description, f => CapitaliseFirstLetter(string.Join(" ", f.Lorem.Words(f.Random.Int(2, 5)))))
                    .RuleFor(t => t.JobId, f => j.Id)
                    .RuleFor(t => t.TaskPeriod, f =>
                    {
                        var start = j.DateReceived.GetValueOrDefault(f.Date.Between(_start, _end)) + f.Date.Timespan(new TimeSpan(20, 0, 0, 0));
                        var duration = f.Date.Timespan();
                        var end = start + duration;
                        return new DateTimeRange(start, end);
                    });
                var taskCount = _randomizer.Int(1, 5);
                _context.JobTasks.AddRange(taskFaker.Generate(taskCount));
            });
            await _context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedWorkers(CancellationToken cancellationToken)
        {
            var workerFaker = new Faker<Worker>().RuleFor(w => w.Name, f => f.Name.FullName()).RuleFor(w => w.IsActive, f => f.Random.Bool(0.8f));
            var workers = workerFaker.Generate(10);
            _context.Workers.AddRange(workers);
            await _context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedWorkerLeave(CancellationToken cancellationToken)
        {
            var workerIds = _context.Workers.Select(w => w.Id).ToList();
            var leaveFaker = new Faker<Leave>()
                .RuleFor(l => l.LeaveCategory, f => f.PickRandom<LeaveType>())
                .RuleFor(l => l.WorkerId, f => f.PickRandom(workerIds))
                .RuleFor(l => l.LeavePeriod, f => {
                    var startDate = f.Date.Between(_start, _end);
                    var start = new DateTime(startDate.Year, startDate.Month, startDate.Day, 8, 0, 0);
                    var duration = f.Date.Timespan(new TimeSpan(5, 0, 0, 0));
                    var end = start.AddDays(duration.Days).AddHours(9);
                    return new DateTimeRange(start, end);
                    });
            var leaveCount = 5 * workerIds.Count * _scheduleSpan.Days / 365;
            var leave = leaveFaker.Generate(leaveCount);
            _context.Leave.AddRange(leave);
            await _context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedWorkerShifts(CancellationToken cancellationToken)
        {
            var jobTasksIds = _context.JobTasks.Select(t => t.Id).ToList();
            var workerIds = _context.Workers.Select(w => w.Id).ToList();

            jobTasksIds.ForEach(jobTaskId =>
            {
                var workerCount = _randomizer.Int(1, Math.Min(4, workerIds.Count));
                var workers = _randomizer.ListItems(workerIds, workerCount).ToList();
                _context.WorkerShifts.AddRange(workers.Select(workerId => new WorkerShift { JobTaskId = jobTaskId, WorkerId = workerId }));
            });
            await _context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedWorkerTraining(CancellationToken cancellationToken)
        {
            var trainingIds = _context.Training.Select(t => t.Id).ToList();
            var workerIds = _context.Workers.Select(w => w.Id).ToList();
            trainingIds.ForEach(trainingId =>
            {

                var workerCount = _randomizer.Int(1, workerIds.Count);
                var workers = _randomizer.ListItems(workerIds, workerCount).ToList();
                _context.WorkerTraining.AddRange(workers.Select(workerId => new WorkerTraining { TrainingId = trainingId, WorkerId = workerId }));
            });
            await _context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedResources(CancellationToken cancellationToken)
        {
            var resourceTypes = new[] { "Ute", "Trailer", "Van" };
            var resourceFaker = new Faker<Resource>()
                .RuleFor(r => r.Name, f => $"V{f.Random.Int(1, 99)}")
                .RuleFor(r => r.Description, f => f.PickRandom(resourceTypes))
                .RuleFor(r => r.IsActive, f => f.Random.Bool(0.9f));
            var resources = resourceFaker.Generate(6);
            _context.Resources.AddRange(resources);
            await _context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedResourceOutOfService(CancellationToken cancellationToken)
        {
            var resourceIds = _context.Resources.Select(r => r.Id).ToList();
            var oosFaker = new Faker<ResourceOutOfService>()
                .RuleFor(o => o.ResourceId, f => f.PickRandom(resourceIds))
                .RuleFor(o => o.Reason, f => f.PickRandom<ResourceOutOfServiceReason>())
                .RuleFor(o => o.Description, f => CapitaliseFirstLetter(string.Join(" ", f.Lorem.Words(f.Random.Int(2, 5)))))
                .RuleFor(o => o.Period, f => {
                    var start = f.Date.Between(_start, _end);
                    var duration = f.Date.Timespan(new TimeSpan(3, 0, 0, 0));
                    var end = start + duration;
                    return new DateTimeRange(start, end);
                });

            var oosCount = resourceIds.Count * _scheduleSpan.Days / 180;
            var oos = oosFaker.Generate(oosCount);
            _context.ResourceOutOfService.AddRange(oos);
            await _context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedResourceShifts(CancellationToken cancellationToken)
        {
            var jobTasksIds = _context.JobTasks.Select(t => t.Id).ToList();
            var resourceIds = _context.Resources.Select(r => r.Id).ToList();

            jobTasksIds.ForEach(jobTaskId =>
            {
                var resourceCount = _randomizer.Int(0, Math.Min(3, resourceIds.Count));
                var resources = _randomizer.ListItems(resourceIds, resourceCount).ToList();
                _context.ResourceShifts.AddRange(resources.Select(resourceId => new ResourceShift { JobTaskId = jobTaskId, ResourceId = resourceId }));
            });

            await _context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedTraining(CancellationToken cancellationToken)
        {
            var trainingFaker = new Faker<Training>()
                .RuleFor(t => t.Description, f => CapitaliseFirstLetter(string.Join(" ", f.Lorem.Words(f.Random.Int(2, 5)))))
                .RuleFor(t => t.Location, f => f.Address.City())
                .RuleFor(t => t.TrainingPeriod, f =>
                {
                    var start = f.Date.Between(_start, _end);
                    var duration = f.Date.Timespan(new TimeSpan(2, 0, 0, 0));
                    var end = start + duration;
                    return new DateTimeRange(start, end);
                });

            var trainingCount = _scheduleSpan.Days / 21;
            var training = trainingFaker.Generate(trainingCount);
            _context.Training.AddRange(training);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
