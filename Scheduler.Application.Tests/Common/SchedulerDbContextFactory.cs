using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Scheduler.Persistence;
using System;
using System.Collections.Generic;
using System.Text;

namespace Scheduler.Application.Tests.Common
{
    public static class SchedulerDbContextFactory
    {
        public static SchedulerDbContext Create()
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = ":memory:" };
            var connection = new SqliteConnection(connectionStringBuilder.ToString());
            var options = new DbContextOptionsBuilder<SchedulerDbContext>()
                .UseSqlite(connection)
                .Options;
            var context = new SchedulerDbContext(options);
            context.Database.OpenConnection();
            context.Database.EnsureCreated();
            return context;
        }

        public static void Destroy(SchedulerDbContext context)
        {
            context.Database.EnsureDeleted();
            context.Dispose();
        }
    }
}
