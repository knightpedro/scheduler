using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Scheduler.Domain.Entities;

namespace Scheduler.Persistence.Configurations
{
    public class ResourceConfiguration : IEntityTypeConfiguration<Resource>
    {
        public void Configure(EntityTypeBuilder<Resource> builder)
        {
            builder.Property(r => r.Name)
                .IsRequired()
                .HasMaxLength(30);

            builder.Property(r => r.Description)
                .IsRequired()
                .HasMaxLength(50);
        }
    }
}
