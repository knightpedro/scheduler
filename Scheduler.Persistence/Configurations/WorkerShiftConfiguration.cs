using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Scheduler.Domain.Entities;

namespace Scheduler.Persistence.Configurations
{
    public class WorkerShiftConfiguration : IEntityTypeConfiguration<WorkerShift>
    {
        public void Configure(EntityTypeBuilder<WorkerShift> builder)
        {
            builder.HasKey(ws => new { ws.WorkerId, ws.JobTaskId })
                .IsClustered(false);

            builder.HasOne(ws => ws.Worker)
                .WithMany(w => w.WorkerShifts)
                .HasForeignKey(ws => ws.WorkerId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(ws => ws.JobTask)
                .WithMany(j => j.WorkerShifts)
                .HasForeignKey(ws => ws.JobTaskId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}
