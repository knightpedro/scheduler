using AutoMapper;
using Scheduler.Application.Common.Mappings;
using Scheduler.Persistence;
using System;

namespace Scheduler.Application.Tests.Common
{
    public class QueryTestBase : IDisposable
    {
        public SchedulerDbContext context { get; }
        public IMapper mapper { get; }
        
        public QueryTestBase()
        {
            context = SchedulerDbContextFactory.Create();

            var config = new MapperConfiguration(cfg => cfg.AddProfile<MappingProfile>());
            mapper = config.CreateMapper();
        }

        public void Dispose()
        {
            SchedulerDbContextFactory.Destroy(context);
        }
    }
}
