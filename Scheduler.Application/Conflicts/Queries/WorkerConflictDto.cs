using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System;

namespace Scheduler.Application.Conflicts.Queries
{
    public enum WorkerConflictType
    {
        JobTask,
        Leave, 
        Training
    }

    public class WorkerConflictDto : IAppointment
    {
        public string ConflictType { get; set; }
        public int Id { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        public WorkerConflictDto(Leave leave)
        {
            Id = leave.Id;
            ConflictType = WorkerConflictType.Leave.ToString();
            Start = leave.LeavePeriod.Start;
            End = leave.LeavePeriod.End;
        }

        public WorkerConflictDto(JobTask jobTask)
        {
            Id = jobTask.Id;
            ConflictType = WorkerConflictType.JobTask.ToString();
            Start = jobTask.TaskPeriod.Start;
            End = jobTask.TaskPeriod.End;
        }

        public WorkerConflictDto(Training training)
        {
            Id = training.Id;
            ConflictType = WorkerConflictType.Training.ToString();
            Start = training.TrainingPeriod.Start;
            End = training.TrainingPeriod.End;
        }
    }
}
