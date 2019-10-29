using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Scheduler.Domain.Entities;

namespace Scheduler.Persistence.Configurations
{
    class ResourceOutOfServiceConfiguration : IEntityTypeConfiguration<ResourceOutOfService>
    {
        public void Configure(EntityTypeBuilder<ResourceOutOfService> builder)
        {
            builder.Property(r => r.Reason)
                .IsRequired()
                .HasConversion<string>()
                .HasMaxLength(30);
        }
    }
}
