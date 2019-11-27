using Scheduler.Domain.ValueObjects;

namespace Scheduler.Domain.Dtos
{
    // TODO specialise by Worker vs Resource? enums for types? Refactor DTR as Start and End?
    public class ConflictDto
    {
        public int ConflictsWithId { get; set; }
        public DateTimeRange Period { get; set; }
        public string ConflictType { get; set; }
    }
}
