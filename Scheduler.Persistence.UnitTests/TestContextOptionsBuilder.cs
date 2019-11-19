using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using System;

namespace Scheduler.Persistence.Tests
{
    public static class TestContextOptionsBuilder
    {
        public static DbContextOptions<T> CreateInMemoryOptions<T>() 
            where T : DbContext
        {
            return new DbContextOptionsBuilder<T>()
                 .UseInMemoryDatabase(Guid.NewGuid().ToString())
                 .Options;
        }

        public static DbContextOptions<T> CreateSqliteOptions<T>() 
            where T : DbContext
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder() { DataSource = ":memory:" };
            var connection = new SqliteConnection(connectionStringBuilder.ToString());
            var options = new DbContextOptionsBuilder<T>()
                .UseSqlite(connection)
                .Options;
            return options;
        }
    }
}
