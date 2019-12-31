using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Scheduler.Domain.Entities;

namespace Scheduler.Persistence.Configurations
{
    public class ResourceShiftConfiguration : IEntityTypeConfiguration<ResourceShift>
    {
        public void Configure(EntityTypeBuilder<ResourceShift> builder)
        {
            builder.HasKey(rs => new { rs.JobTaskId, rs.ResourceId })
                .IsClustered(false);

            builder.HasOne(rs => rs.JobTask)
                .WithMany(j => j.ResourceShifts)
                .HasForeignKey(rs => rs.JobTaskId);

            builder.HasOne(rs => rs.Resource)
                .WithMany(r => r.ResourceShifts)
                .HasForeignKey(rs => rs.ResourceId);

        }
    }
}
