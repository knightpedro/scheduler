using Scheduler.Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Scheduler.Application.Resources.Queries.GetResourcesList
{
    public class ResourcesListVm
    {
        public IEnumerable<ResourceDto> Resources { get; set; }

        public ResourcesListVm(IEnumerable<Resource> resources)
        {
            Resources = resources.Select(r => new ResourceDto(r));
        }
    }
}
