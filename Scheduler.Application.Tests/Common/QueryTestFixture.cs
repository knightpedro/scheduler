using AutoMapper;
using Scheduler.Application.Common.Mappings;
using Scheduler.Persistence;
using System;

namespace Scheduler.Application.Tests.Common
{
    public class QueryTestFixture : IDisposable
    {
        public SchedulerDbContext Context { get; }
        public IMapper Mapper { get; }
        
        public QueryTestFixture()
        {
            Context = SchedulerDbContextFactory.Create();

            var config = new MapperConfiguration(cfg => cfg.AddProfile<MappingProfile>());
            Mapper = config.CreateMapper();
        }

        public void Dispose()
        {
            SchedulerDbContextFactory.Destroy(Context);
        }
    }
}
