using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using Scheduler.Persistence.Repositories;
using Scheduler.Persistence.Tests.Common;
using System;
using System.Threading.Tasks;
using System.Linq;
using Xunit;
using System.Collections.Generic;

namespace Scheduler.Persistence.Tests.Repositories
{
    public class ConflictRepositoryTests : ContextTestBase
    {
        [Fact]
        public async Task WorkerConflicts_EmptyIfNoConflicts()
        {
            var repo = new ConflictRepository(context);
            var worker = EntityFactory.CreateWorker();
            var leave = new List<Leave>
            {
                new Leave
                {
                    LeavePeriod = new DateTimeRange(new DateTime(2020, 1, 10), new DateTime(2020, 1, 12)),
                    Worker = worker
                },
                new Leave
                {
                    LeavePeriod = new DateTimeRange(new DateTime(2020, 1, 13), new DateTime(2020, 1, 15)),
                    Worker = worker
                },
                new Leave
                {
                    LeavePeriod = new DateTimeRange(new DateTime(2020, 1, 18), new DateTime(2020, 1, 20)),
                    Worker = worker
                },
            };
            context.Leave.AddRange(leave);
            context.SaveChanges();

            var conflicts = await repo.GetWorkerConflicts(worker.Id);
            Assert.Empty(conflicts);
        }

        [Fact]
        public async Task WorkerConflicts_SuccessfullyReturned()
        {
            var repo = new ConflictRepository(context);
            var worker = EntityFactory.CreateWorker();
            var leave = new List<Leave>
            {
                new Leave 
                { 
                    LeavePeriod = new DateTimeRange(new DateTime(2020, 1, 10), new DateTime(2020, 1, 12)),
                    Worker = worker
                },
                new Leave
                {
                    LeavePeriod = new DateTimeRange(new DateTime(2020, 1, 11), new DateTime(2020, 1, 15)),
                    Worker = worker
                },
                new Leave
                {
                    LeavePeriod = new DateTimeRange(new DateTime(2020, 1, 18), new DateTime(2020, 1, 20)),
                    Worker = worker
                },
            };
            context.Leave.AddRange(leave);
            context.SaveChanges();

            var conflicts = await repo.GetWorkerConflicts(worker.Id);
            Assert.Equal(2, conflicts.Count());
        }

        [Fact]
        public async Task LeaveConflict_SuccessfullyReturned()
        {
            var repo = new ConflictRepository(context);
            var worker = EntityFactory.CreateWorker();
            var leave = EntityFactory.CreateLeave();
            worker.Leave.Add(leave);
            context.Workers.Add(worker);
            context.SaveChanges();
            
            var conflictLeave = await repo.GetLeaveConflicts(worker.Id, leave.LeavePeriod);

            var noConflictPeriod = new DateTimeRange(leave.LeavePeriod.End, new TimeSpan(2, 0, 0));
            var noConflict = await repo.GetLeaveConflicts(worker.Id, noConflictPeriod);

            Assert.Single(conflictLeave);
            Assert.Empty(noConflict);
        }

        [Fact]
        public async Task TrainingConflict_SuccessfullyReturned()
        {
            var repo = new ConflictRepository(context);
            var worker = EntityFactory.CreateWorker();
            var training = EntityFactory.CreateTraining();
            var workerTraining = new WorkerTraining
            {
                Worker = worker,
                Training = training
            };
            context.WorkerTraining.Add(workerTraining);
            context.SaveChanges();

            var conflictTraining = await repo.GetTrainingConflicts(worker.Id, training.TrainingPeriod);

            var noConflictPeriod = new DateTimeRange(training.TrainingPeriod.End, new TimeSpan(5, 0, 0));
            var noConflict = await repo.GetTrainingConflicts(worker.Id, noConflictPeriod);

            Assert.Single(conflictTraining);
            Assert.Empty(noConflict);
        }

        [Fact]
        public async Task WorkerJobTaskConflict_SuccessfullyReturned()
        {
            var repo = new ConflictRepository(context);
            var worker = EntityFactory.CreateWorker();
            var job = EntityFactory.CreateJob();
            var jobTask = EntityFactory.CreateJobTask();
            var workerShift = new WorkerShift
            {
                Worker = worker,
                JobTask = jobTask
            };
            jobTask.WorkerShifts.Add(workerShift);
            job.JobTasks.Add(jobTask);
            context.Jobs.Add(job);
            context.SaveChanges();

            var conflictTask = await repo.GetJobTaskConflictsForWorker(worker.Id, jobTask.TaskPeriod);

            var noConflictPeriod = new DateTimeRange(jobTask.TaskPeriod.End, new TimeSpan(5, 0, 0));
            var noConflict = await repo.GetJobTaskConflictsForWorker(worker.Id, noConflictPeriod);

            Assert.Single(conflictTask);
            Assert.Empty(noConflict);
        }

        [Fact]
        public async Task ResourceJobTaskConflict_SuccessfullyReturned()
        {
            var repo = new ConflictRepository(context);
            var resource = EntityFactory.CreateResource();
            var job = EntityFactory.CreateJob();
            var jobTask = EntityFactory.CreateJobTask();
            var resourceShift = new ResourceShift
            {
                Resource = resource,
                JobTask = jobTask
            };
            jobTask.ResourceShifts.Add(resourceShift);
            job.JobTasks.Add(jobTask);
            context.Jobs.Add(job);
            context.SaveChanges();

            var conflictTask = await repo.GetJobTaskConflictsForResource(resource.Id, jobTask.TaskPeriod);

            var noConflictPeriod = new DateTimeRange(jobTask.TaskPeriod.End, new TimeSpan(5, 0, 0));
            var noConflict = await repo.GetJobTaskConflictsForResource(resource.Id, noConflictPeriod);

            Assert.Single(conflictTask);
            Assert.Empty(noConflict);
        }

        [Fact]
        public async Task OutOfServiceConflict_SuccessfullyReturned()
        {
            var repo = new ConflictRepository(context);
            var resource = EntityFactory.CreateResource();
            var oos = EntityFactory.CreateResourceOutOfService();
            resource.OutOfServices.Add(oos);
            context.Resources.Add(resource);
            context.SaveChanges();

            var conflictOutOfService = await repo.GetResourceOutOfServiceConflicts(resource.Id, oos.Period);

            var noConflictPeriod = new DateTimeRange(oos.Period.End, new TimeSpan(5, 0, 0, 0, 0));
            var noConflict = await repo.GetResourceOutOfServiceConflicts(resource.Id, noConflictPeriod);

            Assert.Single(conflictOutOfService);
            Assert.Empty(noConflict);
        }
    }
}
