using System;

namespace Scheduler.Application.Conflicts
{
    public class ConflictDto
    {
        public ConflictingEventDto EventA { get; set; }
        public ConflictingEventDto EventB { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
