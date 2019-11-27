using Scheduler.Domain.ValueObjects;
using System;

namespace Scheduler.Domain.Dtos
{
    // TODO specialise by Worker vs Resource? enums for types? Refactor DTR as Start and End?
    public class ConflictDto
    {
        public int ConflictsWithId { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string ConflictType { get; set; }

        public ConflictDto(int conflictingId, string conflictType, DateTimeRange period)
        {
            ConflictsWithId = conflictingId;
            ConflictType = conflictType;
            Start = period.Start;
            End = period.End;
        }
    }
}
