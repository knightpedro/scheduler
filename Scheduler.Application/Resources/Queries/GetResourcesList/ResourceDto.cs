using Scheduler.Domain.Entities;

namespace Scheduler.Application.Resources.Queries.GetResourcesList
{
    public class ResourceDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }

        public ResourceDto(Resource resource)
        {
            Id = resource.Id;
            Name = resource.Name;
            Description = resource.Description;
            IsActive = resource.IsActive;
        }
    }
}
