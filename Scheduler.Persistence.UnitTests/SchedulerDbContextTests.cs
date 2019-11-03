using Microsoft.EntityFrameworkCore;
using System;
using Xunit;

namespace Scheduler.Persistence.UnitTests
{
    public class SchedulerDbContextTests
    {
        private readonly SchedulerDbContext _context;

        public SchedulerDbContextTests()
        {
            var options = new DbContextOptionsBuilder<SchedulerDbContext>()
                 .UseInMemoryDatabase(Guid.NewGuid().ToString())
                 .Options;

            _context = new SchedulerDbContext(options);
        }

        [Fact]
        public void Test1()
        {

        }
    }
}
