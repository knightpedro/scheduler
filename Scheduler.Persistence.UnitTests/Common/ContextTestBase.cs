using Microsoft.EntityFrameworkCore;
using System;

namespace Scheduler.Persistence.Tests.Common
{
    public abstract class ContextTestBase : IDisposable
    {
        protected readonly SchedulerDbContext context;

        public ContextTestBase()
        {
            var options = TestContextOptionsBuilder.CreateSqliteOptions<SchedulerDbContext>();
            context = new SchedulerDbContext(options);
            context.Database.OpenConnection();
            context.Database.EnsureCreated();
        }

        public void Dispose()
        {
            context.Database.EnsureDeleted();
            context.Dispose();
        }
    }
}
