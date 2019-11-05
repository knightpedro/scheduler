using Scheduler.Domain.Common;
using System;
using System.Collections.Generic;

namespace Scheduler.Domain.ValueObjects
{
    public class DateTimeRange : ValueObject
    {
        public DateTime Start { get; }
        public DateTime End { get; }

        public DateTimeRange(DateTime start, DateTime end)
        {
            if (end < start)
                throw new ArgumentOutOfRangeException(nameof(end), "The end date cannot be before the start date.");

            Start = start;
            End = end;
        }

        public bool OverlapsWith(DateTimeRange other)
        {
            return Overlaps(this, other);
        }

        public static bool Overlaps(DateTimeRange a, DateTimeRange b)
        {
            return a.Start < b.End && b.Start < a.End;
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Start;
            yield return End;
        }
    }
}
