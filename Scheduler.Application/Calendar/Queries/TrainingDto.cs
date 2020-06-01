using System;

namespace Scheduler.Application.Calendar.Queries
{
    public class TrainingDto
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
