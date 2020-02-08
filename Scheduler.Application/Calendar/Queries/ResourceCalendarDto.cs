using Scheduler.Application.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Scheduler.Application.Calendar.Queries
{
    public class ResourceCalendarDto 
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public string Description { get; set; }

        public IEnumerable<Appointment> Appointments { get; set; }
    }
}
