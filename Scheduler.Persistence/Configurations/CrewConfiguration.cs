using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Scheduler.Domain.Entities;

namespace Scheduler.Persistence.Configurations
{
    public class CrewConfiguration : IEntityTypeConfiguration<Crew>
    {
        public void Configure(EntityTypeBuilder<Crew> builder)
        {
            builder.OwnsOne(c => c.ActivePeriod)
                .Property(ap => ap.Start)
                .HasColumnName("DateFormed");

            builder.OwnsOne(c => c.ActivePeriod)
                .Property(ap => ap.End)
                .HasColumnName("DateDisbanded");
        }
    }
}
