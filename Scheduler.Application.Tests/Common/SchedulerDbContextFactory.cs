using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Scheduler.Persistence;

namespace Scheduler.Application.Tests.Common
{
    public static class SchedulerDbContextFactory
    {
        public static DbContextOptions<SchedulerDbContext> CreateOptions()
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = ":memory:" };
            var connection = new SqliteConnection(connectionStringBuilder.ToString());
            var options = new DbContextOptionsBuilder<SchedulerDbContext>()
                .UseSqlite(connection)
                .Options;
            return options;
        }

        public static SchedulerDbContext CreateContext()
        {
            var options = CreateOptions();
            var context = new SchedulerDbContext(options);
            context.Database.OpenConnection();
            context.Database.EnsureCreated();
            return context;
        }

        public static void DestroyContext(SchedulerDbContext context)
        {
            context.Database.EnsureDeleted();
            context.Dispose();
        }
    }
}
