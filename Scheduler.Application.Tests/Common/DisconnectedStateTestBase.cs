using Microsoft.EntityFrameworkCore;
using Scheduler.Persistence;
using System;
using System.Collections.Generic;
using System.Text;

namespace Scheduler.Application.Tests.Common
{
    public class DisconnectedStateTestBase : IDisposable
    {
        protected readonly DbContextOptions<SchedulerDbContext> options;

        public DisconnectedStateTestBase()
        {
            options = SchedulerDbContextFactory.CreateOptions();
            using (var context = new SchedulerDbContext(options))
            {
                context.Database.OpenConnection();
                context.Database.EnsureCreated();
            }
        }

        public void Dispose()
        {
            using (var context = new SchedulerDbContext(options))
            {
                context.Database.EnsureDeleted();
            }
        }
    }
}
