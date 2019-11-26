using Scheduler.Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Scheduler.Application.Resources.Queries.GetResourceOutOfServices
{
    public class ResourceOutOfServicesListVm
    {
        public IEnumerable<ResourceOutOfServiceDto> OutOfServices { get; set; }

        public ResourceOutOfServicesListVm(Resource resource)
        {
            OutOfServices = resource.OutOfServices.Select(o => new ResourceOutOfServiceDto(o));
        }
    }
}
