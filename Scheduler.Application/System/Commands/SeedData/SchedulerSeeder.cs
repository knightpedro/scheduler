using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.System.Commands.SeedData
{
    public class SchedulerSeeder
    {
        private readonly ISchedulerDbContext _context;

        public SchedulerSeeder(ISchedulerDbContext context)
        {
            _context = context;
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
            var coordinators = new[]
            {
                new Coordinator { Name = "Ashwin Simmonds", Email = "ashwins@scheduler.test" },
                new Coordinator { Name = "Yusra Sharp", Email = "yusras@scheduler.test" },
                new Coordinator { Name = "Helena Bowen", Email = "helenab@scheduler.test"},
                new Coordinator { Name = "Codie Kelly", Email = "codiek@scheduler.test" },
            };
            _context.Coordinators.AddRange(coordinators);
            await _context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedJobs(CancellationToken cancellationToken)
        {
            var jobs = new[]
            {
                new Job { JobNumber = "J001", Description = "Sample Job 1", Location = "4640 Filbert Street", CoordinatorId = 1, DateReceived = new DateTime(2019, 11, 4), DateScheduled = new DateTime(2019, 11, 6)},
                new Job { JobNumber = "J002", Description = "Sample Job 2", Location = "546 Lochmere Lane", CoordinatorId = 1, DateReceived = new DateTime(2019, 11, 6), DateScheduled = new DateTime(2019, 11, 6)},
                new Job { JobNumber = "J003", Description = "Sample Job 3", Location = "2041 Hall Place", CoordinatorId = 2, DateReceived = new DateTime(2019, 11, 14), DateScheduled = new DateTime(2019, 11, 15)},
                new Job { JobNumber = "J004", Description = "Sample Job 4", Location = "3283 Frank Avenue", CoordinatorId = 3, DateReceived = new DateTime(2019, 12, 4), DateScheduled = new DateTime(2019, 12, 5)},
                new Job { JobNumber = "J005", Description = "Sample Job 5", Location = "4538 Carter Street", CoordinatorId = 4, DateReceived = new DateTime(2019, 12, 17), DateScheduled = new DateTime(2019, 12, 19)},
            };
            _context.Jobs.AddRange(jobs);
            await _context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedJobTasks(CancellationToken cancellationToken)
        {
            var tasks = new[]
            {
                new JobTask {Description = "Task 1", JobId = 1,  TaskPeriod = new DateTimeRange(new DateTime(2019, 11, 18, 8, 0, 0), new DateTime(2019, 11, 18, 16, 0, 0)) },
                new JobTask {Description = "Task 2", JobId = 1,  TaskPeriod = new DateTimeRange(new DateTime(2019, 11, 19, 8, 0, 0), new DateTime(2019, 11, 19, 16, 0, 0)) },
                new JobTask {Description = "Task 3", JobId = 2,  TaskPeriod = new DateTimeRange(new DateTime(2019, 12, 2, 8, 0, 0), new DateTime(2019, 12, 2, 16, 0, 0)) },
                new JobTask {Description = "Task 4", JobId = 3,  TaskPeriod = new DateTimeRange(new DateTime(2019, 12, 3, 8, 0, 0), new DateTime(2019, 12, 3, 16, 0, 0)) },
                new JobTask {Description = "Task 5", JobId = 3,  TaskPeriod = new DateTimeRange(new DateTime(2019, 12, 5, 8, 0, 0), new DateTime(2019, 12, 5, 16, 0, 0)) },
                new JobTask {Description = "Task 6", JobId = 4,  TaskPeriod = new DateTimeRange(new DateTime(2019, 12, 6, 8, 0, 0), new DateTime(2019, 12, 6, 16, 0, 0)) },
                new JobTask {Description = "Task 7", JobId = 5,  TaskPeriod = new DateTimeRange(new DateTime(2019, 12, 9, 8, 0, 0), new DateTime(2019, 12, 9, 16, 0, 0)) },
                new JobTask {Description = "Task 8", JobId = 5,  TaskPeriod = new DateTimeRange(new DateTime(2019, 12, 10, 8, 0, 0), new DateTime(2019, 12, 10, 16, 0, 0)) },
                new JobTask {Description = "Task 9", JobId = 5,  TaskPeriod = new DateTimeRange(new DateTime(2019, 12, 11, 8, 0, 0), new DateTime(2019, 12, 11, 16, 0, 0)) },
                new JobTask {Description = "Task 10", JobId = 5,  TaskPeriod = new DateTimeRange(new DateTime(2019, 12, 12, 8, 0, 0), new DateTime(2019, 12, 12, 16, 0, 0)) },
                new JobTask {Description = "Task 11", JobId = 5,  TaskPeriod = new DateTimeRange(new DateTime(2019, 12, 13, 8, 0, 0), new DateTime(2019, 12, 13, 16, 0, 0)) },
            };
            _context.JobTasks.AddRange(tasks);
            await _context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedWorkers(CancellationToken cancellationToken)
        {
            var workers = new[]
            {
                new Worker{ Name = "Ronnie Feeney"},
                new Worker{ Name = "Jayden Poole"},
                new Worker{ Name = "Lilly Gibson"},
                new Worker{ Name = "Genevieve Bernard"},
                new Worker{ Name = "Abida Sparrow"},
                new Worker{ Name = "Mildred Riggs"},
                new Worker{ Name = "Misbah Ashton"},
                new Worker{ Name = "Mariana Yoder"},
                new Worker{ Name = "Alena Cunningham"},
                new Worker{ Name = "Montel Velez"},
            };
            _context.Workers.AddRange(workers);
            await _context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedWorkerLeave(CancellationToken cancellationToken)
        {
            var leave = new[]
            {
                new Leave { WorkerId = 1, LeaveCategory = LeaveType.Annual, LeavePeriod = new DateTimeRange(new DateTime(2019, 12, 16, 8, 0, 0), new DateTime(2019, 12, 20, 16, 0, 0)) },
                new Leave { WorkerId = 5, LeaveCategory = LeaveType.Annual, LeavePeriod = new DateTimeRange(new DateTime(2019, 11, 4, 8, 0, 0), new DateTime(2019, 11, 6, 16, 0, 0)) },
                new Leave { WorkerId = 7, LeaveCategory = LeaveType.Annual, LeavePeriod = new DateTimeRange(new DateTime(2019, 12, 17, 8, 0, 0), new DateTime(2019, 12, 17, 16, 0, 0)) },
            };
            _context.Leave.AddRange(leave);
            await _context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedWorkerShifts(CancellationToken cancellationToken)
        {
            var workerShifts = new[]
            {
                new WorkerShift {WorkerId = 1, JobTaskId = 1},
                new WorkerShift {WorkerId = 1, JobTaskId = 3},
                new WorkerShift {WorkerId = 1, JobTaskId = 5},
                new WorkerShift {WorkerId = 2, JobTaskId = 2},
                new WorkerShift {WorkerId = 2, JobTaskId = 4},
                new WorkerShift {WorkerId = 2, JobTaskId = 5},
                new WorkerShift {WorkerId = 2, JobTaskId = 3},
                new WorkerShift {WorkerId = 3, JobTaskId = 6},
                new WorkerShift {WorkerId = 3, JobTaskId = 7},
                new WorkerShift {WorkerId = 3, JobTaskId = 4},
                new WorkerShift {WorkerId = 4, JobTaskId = 5},
                new WorkerShift {WorkerId = 4, JobTaskId = 8},
                new WorkerShift {WorkerId = 4, JobTaskId = 1},
                new WorkerShift {WorkerId = 4, JobTaskId = 9},
                new WorkerShift {WorkerId = 5, JobTaskId = 10},
                new WorkerShift {WorkerId = 5, JobTaskId = 2},
                new WorkerShift {WorkerId = 5, JobTaskId = 7},
                new WorkerShift {WorkerId = 5, JobTaskId = 8},
                new WorkerShift {WorkerId = 6, JobTaskId = 3},
                new WorkerShift {WorkerId = 6, JobTaskId = 4},
                new WorkerShift {WorkerId = 6, JobTaskId = 6},
                new WorkerShift {WorkerId = 7, JobTaskId = 4},
                new WorkerShift {WorkerId = 7, JobTaskId = 8},
                new WorkerShift {WorkerId = 7, JobTaskId = 9},
                new WorkerShift {WorkerId = 8, JobTaskId = 2},
                new WorkerShift {WorkerId = 8, JobTaskId = 9},
                new WorkerShift {WorkerId = 8, JobTaskId = 11},
                new WorkerShift {WorkerId = 9, JobTaskId = 3},
                new WorkerShift {WorkerId = 9, JobTaskId = 4},
                new WorkerShift {WorkerId = 9, JobTaskId = 7},
                new WorkerShift {WorkerId = 10, JobTaskId = 1},
                new WorkerShift {WorkerId = 10, JobTaskId = 6},
                new WorkerShift {WorkerId = 10, JobTaskId = 8},
                new WorkerShift {WorkerId = 10, JobTaskId = 10},
            };
            _context.WorkerShifts.AddRange(workerShifts);
            await _context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedWorkerTraining(CancellationToken cancellationToken)
        {
            var training = new[]
            {
                new WorkerTraining {TrainingId = 1, WorkerId = 1},
                new WorkerTraining {TrainingId = 1, WorkerId = 2},
                new WorkerTraining {TrainingId = 1, WorkerId = 3},
                new WorkerTraining {TrainingId = 1, WorkerId = 4},
                new WorkerTraining {TrainingId = 1, WorkerId = 5},
                new WorkerTraining {TrainingId = 1, WorkerId = 6},
                new WorkerTraining {TrainingId = 1, WorkerId = 7},
                new WorkerTraining {TrainingId = 1, WorkerId = 8},
                new WorkerTraining {TrainingId = 1, WorkerId = 9},
                new WorkerTraining {TrainingId = 2, WorkerId = 3},
                new WorkerTraining {TrainingId = 2, WorkerId = 4},
                new WorkerTraining {TrainingId = 2, WorkerId = 5},
                new WorkerTraining {TrainingId = 2, WorkerId = 8},
                new WorkerTraining {TrainingId = 2, WorkerId = 10},
                new WorkerTraining {TrainingId = 3, WorkerId = 2},
                new WorkerTraining {TrainingId = 3, WorkerId = 4},
                new WorkerTraining {TrainingId = 3, WorkerId = 5},
                new WorkerTraining {TrainingId = 3, WorkerId = 6},
            };
            _context.WorkerTraining.AddRange(training);
            await _context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedResources(CancellationToken cancellationToken)
        {
            var resources = new[]
            {
                new Resource { Name = "T32", Description = "Ute" },
                new Resource { Name = "T33", Description = "Ute" },
                new Resource { Name = "T34", Description = "Ute" },
                new Resource { Name = "T91", Description = "Crane" },
                new Resource { Name = "T92", Description = "Bucket" },
                new Resource { Name = "T93", Description = "Trailer" },
            };
            _context.Resources.AddRange(resources);
            await _context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedResourceOutOfService(CancellationToken cancellationToken)
        {
            var oos = new[]
            {
                new ResourceOutOfService { ResourceId = 2, Description = "WOF", Reason = ResourceOutOfServiceReason.Certification, Period = new DateTimeRange(new DateTime(2019, 11, 12, 8, 0, 0), new DateTime(2019, 11, 12, 11, 0, 0))},
                new ResourceOutOfService { ResourceId = 3, Description = "Cracked windscreen", Reason = ResourceOutOfServiceReason.Damage, Period = new DateTimeRange(new DateTime(2019, 12, 19, 8, 0, 0), new DateTime(2019, 12, 19, 16, 0, 0))},
                new ResourceOutOfService { ResourceId = 5, Description = "WOF", Reason = ResourceOutOfServiceReason.Certification, Period = new DateTimeRange(new DateTime(2019, 11, 12, 13, 0, 0), new DateTime(2019, 11, 12, 16, 0, 0))},
            };
            _context.ResourceOutOfService.AddRange(oos);
            await _context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedResourceShifts(CancellationToken cancellationToken)
        {
            var resourceShifts = new[]
            {
                new ResourceShift { ResourceId = 1, JobTaskId = 1},
                new ResourceShift { ResourceId = 1, JobTaskId = 4},
                new ResourceShift { ResourceId = 1, JobTaskId = 6},
                new ResourceShift { ResourceId = 2, JobTaskId = 2},
                new ResourceShift { ResourceId = 2, JobTaskId = 3},
                new ResourceShift { ResourceId = 2, JobTaskId = 7},
                new ResourceShift { ResourceId = 3, JobTaskId = 3},
                new ResourceShift { ResourceId = 3, JobTaskId = 6},
                new ResourceShift { ResourceId = 3, JobTaskId = 9},
                new ResourceShift { ResourceId = 4, JobTaskId = 1},
                new ResourceShift { ResourceId = 4, JobTaskId = 5},
                new ResourceShift { ResourceId = 4, JobTaskId = 10},
                new ResourceShift { ResourceId = 4, JobTaskId = 11},
                new ResourceShift { ResourceId = 5, JobTaskId = 2},
                new ResourceShift { ResourceId = 5, JobTaskId = 4},
                new ResourceShift { ResourceId = 5, JobTaskId = 8},
                new ResourceShift { ResourceId = 5, JobTaskId = 11},
                new ResourceShift { ResourceId = 6, JobTaskId = 2},
                new ResourceShift { ResourceId = 6, JobTaskId = 7},
                new ResourceShift { ResourceId = 6, JobTaskId = 9},
                new ResourceShift { ResourceId = 6, JobTaskId = 10},
            };
            _context.ResourceShifts.AddRange(resourceShifts);
            await _context.SaveChangesAsync(cancellationToken);
        }

        private async Task SeedTraining(CancellationToken cancellationToken)
        {
            var training = new[]
            {
                new Training { Description = "Traffic Control", Location = "Training Room 1", TrainingPeriod = new DateTimeRange(new DateTime(2020, 1, 21, 8, 0, 0), new DateTime(2020, 1, 21, 16, 0, 0)) },
                new Training { Description = "First Aid", Location = "St John's", TrainingPeriod = new DateTimeRange(new DateTime(2020, 1, 14, 9, 0, 0), new DateTime(2020, 1, 14, 12, 0, 0)) },
                new Training { Description = "Fire Training", Location = "Yard", TrainingPeriod = new DateTimeRange(new DateTime(2020, 1, 30, 13, 0, 0), new DateTime(2020, 1, 30, 16, 0, 0)) },
            };
            _context.Training.AddRange(training);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
