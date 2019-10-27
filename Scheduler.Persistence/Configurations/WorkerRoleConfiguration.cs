using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Scheduler.Domain.Entities;

namespace Scheduler.Persistence.Configurations
{
    public class WorkerRoleConfiguration : IEntityTypeConfiguration<WorkerRole>
    {
        public void Configure(EntityTypeBuilder<WorkerRole> builder)
        {
            builder.HasKey(wr => new { wr.RoleId, wr.WorkerId })
                .IsClustered(false);

            builder.HasOne(wr => wr.Role)
                .WithMany(r => r.WorkerRoles)
                .HasForeignKey(wr => wr.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(wr => wr.Worker)
                .WithMany(w => w.WorkerRoles)
                .HasForeignKey(wr => wr.WorkerId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}
