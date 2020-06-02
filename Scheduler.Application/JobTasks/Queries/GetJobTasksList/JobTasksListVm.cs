using Scheduler.Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Scheduler.Application.JobTasks.Queries.GetJobTasksList
{
    public class JobTasksListVm
    {
        public IEnumerable<JobTaskDto> JobTasks { get; set; }

        public JobTasksListVm(IEnumerable<JobTask> jobTasks)
        {
            JobTasks = jobTasks.Select(j => new JobTaskDto(j));
        }
    }
}
