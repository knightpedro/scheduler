using Microsoft.EntityFrameworkCore;
using Scheduler.Domain.Entities;

namespace Scheduler.Persistence.Seed
{
    public static class ModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Worker>().HasData(Workers);
        }

        public static Worker[] Workers = new Worker[]
        {
            new Worker { Name = "Ronnie Feeney"}
        };

    }
}
