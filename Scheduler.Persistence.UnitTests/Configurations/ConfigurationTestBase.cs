using Microsoft.EntityFrameworkCore;
using System;

namespace Scheduler.Persistence.UnitTests.Configurations
{
    public abstract class ConfigurationTestBase : IDisposable
    {
        public SchedulerDbContext context { get; }

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
