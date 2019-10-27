using System;

namespace Scheduler.Domain.Entities
{
    public class WorkerCrew
    {
        public int CrewId { get; set; }
        public Crew Crew { get; set; }

        public int WorkerId { get; set; }
        public Worker Worker { get; set; }

        public DateTime? JoinedCrew { get; set; }
        public DateTime? LeftCrew { get; set; }
    }
}
