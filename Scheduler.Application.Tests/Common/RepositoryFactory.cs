using Scheduler.Persistence.Repositories;

namespace Scheduler.Application.Tests.Common
{
    public static class RepositoryFactory
    {
        public static SchedulerRepository<T> CreateRepository<T>() where T : class
        {
            var context = SchedulerDbContextFactory.CreateContext();
            return new SchedulerRepository<T>(context);
        }
    }
}
