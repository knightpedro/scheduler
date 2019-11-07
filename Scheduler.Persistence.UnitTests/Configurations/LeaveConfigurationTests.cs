using Microsoft.EntityFrameworkCore;
using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using Scheduler.Persistence.UnitTests.Common;
using System;
using Xunit;

namespace Scheduler.Persistence.UnitTests.Configurations
{
    public class LeaveConfigurationTests : ConfigurationTestBase
    {
        [Fact]
        public void Cannot_save_leave_without_worker()
        {
            var start = new DateTime(2019, 11, 5, 8, 0, 0);
            var end = new DateTime(2019, 11, 6, 17, 0, 0);

            var leave = new Leave
            {
                LeaveType = LeaveType.Annual,
                LeavePeriod = new DateTimeRange(start, end)
            };

            context.Leave.Add(leave);
            Assert.Throws<DbUpdateException>(() => context.SaveChanges());
        }

        [Fact]
        public void Can_save_and_retrieve_properly_instantiated_leave()
        {
            var start = new DateTime(2019, 11, 5, 8, 0, 0);
            var end = new DateTime(2019, 11, 6, 17, 0, 0);

            var big_holiday = new Leave
            {
                LeaveType = LeaveType.Annual,
                LeavePeriod = new DateTimeRange(start, end)
            };

            var worker = new Worker
            {
                Name = "Tommy Tester"
            };

            worker.Leave.Add(big_holiday);
            context.Workers.Add(worker);
            context.SaveChanges();

            var saved_leave = context.Leave.Find(1);
            Assert.Equal(start, saved_leave.LeavePeriod.Start);
            Assert.Equal(end, saved_leave.LeavePeriod.End);
        }
    }
}
