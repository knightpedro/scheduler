using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Scheduler.Domain.Entities;

namespace Scheduler.Persistence.Configurations
{
    public class WorkerConfiguration : IEntityTypeConfiguration<Worker>
    {
        public void Configure(EntityTypeBuilder<Worker> builder)
        {
            builder.Property(w => w.Name)
                .IsRequired()
                .HasMaxLength(50);

            builder.OwnsOne(w => w.WorkingPeriod)
                .Property(wp => wp.Start)
                .HasColumnName("JoinedCompany");

            builder.OwnsOne(w => w.WorkingPeriod)
                .Property(wp => wp.End)
                .HasColumnName("LeftCompany");
        }
    }
}
