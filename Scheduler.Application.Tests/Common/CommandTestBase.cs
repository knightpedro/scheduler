using Scheduler.Persistence;
using System;

namespace Scheduler.Application.Tests.Common
{
    public class CommandTestBase : IDisposable
    {
        protected readonly SchedulerDbContext context;

        public CommandTestBase()
        {
            context = SchedulerDbContextFactory.Create();
        }

        public void Dispose()
        {
            SchedulerDbContextFactory.Destroy(context);
        }
    }
}
