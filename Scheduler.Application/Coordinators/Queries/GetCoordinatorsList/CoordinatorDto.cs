using Scheduler.Domain.Entities;

namespace Scheduler.Application.Coordinators.Queries.GetCoordinatorsList
{
    public class CoordinatorDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }

        public CoordinatorDto(Coordinator coordinator)
        {
            Id = coordinator.Id;
            Name = coordinator.Name;
            IsActive = coordinator.IsActive;
        }
    }
}
