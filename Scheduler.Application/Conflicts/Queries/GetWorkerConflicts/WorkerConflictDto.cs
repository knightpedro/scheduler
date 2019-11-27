using System;

namespace Scheduler.Application.Conflicts.Queries.GetWorkerConflicts
{
    public enum WorkerConflictType
    {
        JobTask,
        Leave, 
        Training
    }

    public class WorkerConflictDto
    {
        public WorkerConflictType ConflictType { get; set; }
        public int Id { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
