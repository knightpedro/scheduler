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

            builder.Property(w => w.IsActive)
                .IsRequired();
        }
    }
}
