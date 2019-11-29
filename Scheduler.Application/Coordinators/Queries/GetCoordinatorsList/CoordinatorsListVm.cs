using Scheduler.Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Scheduler.Application.Coordinators.Queries.GetCoordinatorsList
{
    public class CoordinatorsListVm
    {
        public IEnumerable<CoordinatorDto> Coordinators { get; set; }

        public CoordinatorsListVm(IEnumerable<Coordinator> coordinators)
        {
            Coordinators = coordinators.Select(c => new CoordinatorDto(c));
        }
    }
}
