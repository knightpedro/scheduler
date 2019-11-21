using Scheduler.Application.Common.Interfaces;
using Scheduler.Persistence.Repositories;
using System;

namespace Scheduler.Application.Tests.Common
{
    public class CommandTestBase<T> where T : class
    {
        protected readonly IRepository<T> repo;

        public CommandTestBase()
        {
            var context = SchedulerDbContextFactory.CreateContext();
            repo = new SchedulerRepository<T>(context);
        }
    }
}
