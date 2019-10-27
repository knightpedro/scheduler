using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Scheduler.Domain.Entities;

namespace Scheduler.Persistence.Configurations
{
    public class WorkerCrewConfiguration : IEntityTypeConfiguration<WorkerCrew>
    {
        public void Configure(EntityTypeBuilder<WorkerCrew> builder)
        {
            builder.HasKey(wc => new { wc.CrewId, wc.WorkerId })
                .IsClustered(false);

            builder.HasOne(wc => wc.Crew)
                .WithMany(c => c.WorkerCrews)
                .HasForeignKey(wc => wc.CrewId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(wc => wc.Worker)
                .WithMany(w => w.WorkerCrews)
                .HasForeignKey(wc => wc.WorkerId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}
