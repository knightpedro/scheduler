using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Scheduler.Domain.Entities;

namespace Scheduler.Persistence.Configurations
{
    public class CoordinatorConfiguration : IEntityTypeConfiguration<Coordinator>
    {
        public void Configure(EntityTypeBuilder<Coordinator> builder)
        {
            builder.Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(c => c.Email).HasMaxLength(254);

            builder.Property(c => c.IsActive)
                .IsRequired();
        }
    }
}
