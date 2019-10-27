using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Scheduler.Domain.Entities;
using System;

namespace Scheduler.Persistence.Configurations
{
    public class WorkerCrewConfiguration : IEntityTypeConfiguration<WorkerCrew>
    {
        public void Configure(EntityTypeBuilder<WorkerCrew> builder)
        {
            builder.HasKey(e => new { e.CrewId, e.WorkerId })
                .IsClustered(false);

            builder.HasOne(d => d.Crew)
                .WithMany(p => p.WorkerCrews)
                .HasForeignKey(d => d.CrewId);

            builder.HasOne(d => d.Worker)
                .WithMany(p => p.WorkerCrews)
                .HasForeignKey(d => d.WorkerId);
        }
    }
}
