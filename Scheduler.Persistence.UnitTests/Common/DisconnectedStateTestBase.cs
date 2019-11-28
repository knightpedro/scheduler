using Microsoft.EntityFrameworkCore;
using System;

namespace Scheduler.Persistence.Tests.Common
{
    public class DisconnectedStateTestBase : IDisposable
    {
        protected readonly DbContextOptions<SchedulerDbContext> options;

        public DisconnectedStateTestBase()
        {
            options = ContextOptionsFactory.CreateSqliteOptions<SchedulerDbContext>();
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