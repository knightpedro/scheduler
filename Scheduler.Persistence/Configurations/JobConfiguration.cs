using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Scheduler.Domain.Entities;

namespace Scheduler.Persistence.Configurations
{
    public class JobConfiguration : IEntityTypeConfiguration<Job>
    {
        public void Configure(EntityTypeBuilder<Job> builder)
        {
            builder.Property(j => j.JobNumber)
                .IsRequired()
                .HasMaxLength(10);

            builder.Property(j => j.Description)
                .IsRequired()
                .HasMaxLength(160);

            builder.Property(j => j.Location)
                .IsRequired()
                .HasMaxLength(30);
        }
    }
}
