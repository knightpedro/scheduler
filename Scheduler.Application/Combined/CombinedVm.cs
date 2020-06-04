using Scheduler.Application.Conflicts;
using Scheduler.Application.Coordinators.Queries;
using Scheduler.Application.Jobs.Queries;
using Scheduler.Application.JobTasks.Queries.GetJobTasksList;
using Scheduler.Application.Resources.Queries.GetOutOfService;
using Scheduler.Application.Resources.Queries.GetResourcesList;
using Scheduler.Application.Trainings.Queries.GetTrainingList;
using Scheduler.Application.Workers.Queries.GetLeave;
using Scheduler.Application.Workers.Queries.GetWorkersList;
using System.Collections.Generic;

namespace Scheduler.Application.Combined
{
    public class CombinedVm
    {
        public IEnumerable<CoordinatorDto> Coordinators { get; set; }
        public IEnumerable<JobDto> Jobs { get; set; }
        public IEnumerable<JobTaskDto> JobTasks { get; set; }
        public IEnumerable<LeaveVm> Leave { get; set; }
        public string[] LeaveTypes { get; set; }
        public IEnumerable<OutOfServiceVm> OutOfServices { get; set; }
        public string[] OutOfServiceTypes { get; set; }
        public IEnumerable<ResourceDto> Resources { get; set; }
        public IEnumerable<EntityConflictsVm> ResourceConflicts { get; set; }
        public IEnumerable<TrainingDto> Training { get; set; }
        public IEnumerable<WorkerDto> Workers { get; set; }
        public IEnumerable<EntityConflictsVm> WorkerConflicts { get; set; }
    }
}
