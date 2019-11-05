using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Scheduler.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Scheduler.Persistence.Configurations
{
    public class LeaveConfiguration : IEntityTypeConfiguration<Leave>
    {
        public void Configure(EntityTypeBuilder<Leave> builder)
        {
            builder.Property(l => l.LeaveType)
                .IsRequired()
                .HasConversion<string>()
                .HasMaxLength(20);

            builder.OwnsOne(l => l.LeavePeriod)
                .Property(lp => lp.Start)
                .HasColumnName("Start");

            builder.OwnsOne(l => l.LeavePeriod)
                .Property(lp => lp.End)
                .HasColumnName("End");
        }
    }
}
