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

            var conflicts = await repo.GetConflictsForWorker(worker.Id);
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

            var conflicts = await repo.GetConflictsForWorker(worker.Id);
            Assert.Single(conflicts);
            var conflict = conflicts.ElementAt(0);
            Assert.Equal(new DateTime(2020, 1, 11), conflict.Start);
            Assert.Equal(new DateTime(2020, 1, 12), conflict.End);
            Assert.Equal("Leave", conflict.EventA.Type);
        }

        [Fact]
        public async Task WorkerConflicts_CorrectlyFilteredWhenPeriodSpecified()
        {
            var repo = new ConflictRepository(context);
            var worker = EntityFactory.CreateWorker();
            var leave = new List<Leave>
            {
                new Leave
                {
                    LeavePeriod = new DateTimeRange(new DateTime(2020, 1, 10), new DateTime(2020, 1, 15)),
                    Worker = worker
                },
                new Leave
                {
                    LeavePeriod = new DateTimeRange(new DateTime(2020, 1, 12), new DateTime(2020, 1, 17, 8, 30, 0)),
                    Worker = worker
                },
                new Leave
                {
                    LeavePeriod = new DateTimeRange(new DateTime(2020, 1, 17, 8, 0, 0), new DateTime(2020, 1, 20)),
                    Worker = worker
                },
            };
            context.Leave.AddRange(leave);
            context.SaveChanges();

            var period = new DateTimeRange(new DateTime(2020, 1, 15), new DateTime(2020, 1, 20));
            var conflicts = await repo.GetConflictsForWorker(worker.Id, period);
            Assert.Single(conflicts);
            var conflict = conflicts.ElementAt(0);
            Assert.Equal(new DateTime(2020, 1, 17, 8, 0, 0), conflict.Start);
            Assert.Equal(new DateTime(2020, 1, 17, 8, 30, 0), conflict.End);
        }
    }
}
