using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Scheduler.Domain.Entities;

namespace Scheduler.Persistence.Configurations
{
    public class TrainingConfiguration : IEntityTypeConfiguration<Training>
    {
        public void Configure(EntityTypeBuilder<Training> builder)
        {
            builder.Property(t => t.Description)
                .IsRequired()
                .HasMaxLength(30);

            builder.Property(t => t.Location).HasMaxLength(30);

            builder.OwnsOne(t => t.TrainingPeriod)
                .Property(p => p.Start)
                .HasColumnName("Start");

            builder.OwnsOne(t => t.TrainingPeriod)
                .Property(p => p.End)
                .HasColumnName("End");
        }
    }
}
