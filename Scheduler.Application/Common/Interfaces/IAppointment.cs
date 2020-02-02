using System;
using System.Collections.Generic;
using System.Text;

namespace Scheduler.Application.Common.Interfaces
{
    public interface IAppointment
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
