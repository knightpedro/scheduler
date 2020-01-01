using Scheduler.Domain.Entities;

namespace Scheduler.Application.Jobs.Queries.GetJobDetail
{
    public class CoordinatorDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public CoordinatorDto(Coordinator c)
        {
            Id = c.Id;
            Name = c.Name;
        }
    }
}
