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

            builder.Property(r => r.Description).HasMaxLength(120);

            builder.OwnsOne(r => r.Period)
                .Property(p => p.Start)
                .HasColumnName("Start");

            builder.OwnsOne(r => r.Period)
                .Property(p => p.End)
                .HasColumnName("End");
        }
    }
}
