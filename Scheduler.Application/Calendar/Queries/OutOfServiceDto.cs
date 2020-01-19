using Scheduler.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Scheduler.Application.Calendar.Queries
{
    public class OutOfServiceDto
    {
        public int Id { get; set; }
        public string Reason { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        public OutOfServiceDto(ResourceOutOfService oos)
        {
            Id = oos.Id;
            Reason = oos.Reason.ToString();
            Description = oos.Description;
            Start = oos.Period.Start;
            End = oos.Period.End;
        }
    }
}
