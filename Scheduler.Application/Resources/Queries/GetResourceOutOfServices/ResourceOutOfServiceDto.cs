using Scheduler.Domain.Entities;
using System;

namespace Scheduler.Application.Resources.Queries.GetResourceOutOfServices
{
    public class ResourceOutOfServiceDto
    {
        public int Id { get; set; }
        public string Reason { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        public ResourceOutOfServiceDto(ResourceOutOfService oos)
        {
            Id = oos.Id;
            Reason = oos.Reason.ToString();
            Start = oos.Period.Start;
            End = oos.Period.End;
        }
    }
}
