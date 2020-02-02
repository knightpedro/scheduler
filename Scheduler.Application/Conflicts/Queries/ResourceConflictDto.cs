using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System;

namespace Scheduler.Application.Conflicts.Queries
{
    public enum ResourceConflictType
    {
        JobTask,
        OutOfService
    }

    public class ResourceConflictDto : IAppointment
    {
        public int Id { get; set; }
        public string ConflictType { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        public ResourceConflictDto(ResourceOutOfService oos)
        {
            Id = oos.Id;
            ConflictType = ResourceConflictType.OutOfService.ToString();
            Start = oos.Period.Start;
            End = oos.Period.End;
        }

        public ResourceConflictDto(JobTask jobTask)
        {
            Id = jobTask.Id;
            ConflictType = ResourceConflictType.JobTask.ToString();
            Start = jobTask.TaskPeriod.Start;
            End = jobTask.TaskPeriod.End;
        }

    }
}
