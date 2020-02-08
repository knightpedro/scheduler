using Scheduler.Application.Resources.Queries.GetOutOfService;
using System.Collections.Generic;

namespace Scheduler.Application.Resources.Queries.GetOutOfServicesList
{
    public class OutOfServicesListVm
    {
        public IEnumerable<OutOfServiceVm> OutOfServices { get; set; }
    }
}
