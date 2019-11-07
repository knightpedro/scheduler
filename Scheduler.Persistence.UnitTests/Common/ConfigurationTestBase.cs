using Microsoft.EntityFrameworkCore;
using System;

namespace Scheduler.Persistence.UnitTests.Common
{
    public abstract class ConfigurationTestBase : IDisposable
    {
        protected readonly SchedulerDbContext context;

        public ConfigurationTestBase()
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
