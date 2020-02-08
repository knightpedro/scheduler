using Scheduler.Application.Common.Models;
using System.Collections.Generic;

namespace Scheduler.Application.Calendar.Queries
{
    public class WorkerCalendarDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public IEnumerable<Appointment> Appointments { get; set; }
    }
}
