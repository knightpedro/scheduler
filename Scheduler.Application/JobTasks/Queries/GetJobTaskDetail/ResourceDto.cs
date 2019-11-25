using Scheduler.Domain.Entities;

namespace Scheduler.Application.JobTasks.Queries.GetJobTaskDetail
{
    public class ResourceDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public ResourceDto(Resource resource)
        {
            Id = resource.Id;
            Name = resource.Name;
            Description = resource.Description;
        }
    }
}