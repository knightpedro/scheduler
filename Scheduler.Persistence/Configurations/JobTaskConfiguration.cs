﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Scheduler.Domain.Entities;

namespace Scheduler.Persistence.Configurations
{
    public class JobTaskConfiguration : IEntityTypeConfiguration<JobTask>
    {
        public void Configure(EntityTypeBuilder<JobTask> builder)
        {
            builder.Property(j => j.Description)
                .IsRequired()
                .HasMaxLength(160);
        }
    }
}
