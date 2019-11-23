using Scheduler.Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Scheduler.Application.Jobs.Queries.GetJobsList
{
    public class JobsListVm
    {
        public IEnumerable<JobDto> Jobs { get; set; }

        public JobsListVm(IEnumerable<Job> jobs)
        {
            Jobs = jobs.Select(j => new JobDto(j));
        }
    }
}
