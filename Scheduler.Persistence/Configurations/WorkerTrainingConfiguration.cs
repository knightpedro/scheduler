using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Scheduler.Domain.Entities;

namespace Scheduler.Persistence.Configurations
{
    public class WorkerTrainingConfiguration : IEntityTypeConfiguration<WorkerTraining>
    {
        public void Configure(EntityTypeBuilder<WorkerTraining> builder)
        {
            builder.HasKey(wt => new { wt.WorkerId, wt.TrainingId })
                .IsClustered(false);

            builder.HasOne(wt => wt.Worker)
                .WithMany(w => w.WorkerTraining)
                .HasForeignKey(wt => wt.WorkerId);

            builder.HasOne(wt => wt.Training)
                .WithMany(t => t.WorkerTraining)
                .HasForeignKey(wt => wt.TrainingId);
        }
    }
}
