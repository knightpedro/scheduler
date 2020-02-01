using Scheduler.Domain.Entities;
using System;

namespace Scheduler.Application.Resources.Queries.GetOutOfService
{
    public class OutOfServiceVm
    {
        public int Id { get; set; }
        public int ResourceId { get; set; }
        public string Description { get; set; }
        public string Reason { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        public OutOfServiceVm(ResourceOutOfService oos)
        {
            Id = oos.Id;
            ResourceId = oos.ResourceId;
            Description = oos.Description;
            Reason = oos.Reason.ToString();
            Start = oos.Period.Start;
            End = oos.Period.End;
        }
    }
}
