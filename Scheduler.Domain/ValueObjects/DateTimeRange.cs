using Scheduler.Domain.Common;
using System;
using System.Collections.Generic;

// TODO: handle nulls in Overlaps

namespace Scheduler.Domain.ValueObjects
{
    public class DateTimeRange : ValueObject
    {
        public DateTime Start { get; private set; }
        public DateTime End { get; private set; }

        public DateTimeRange(DateTime start, DateTime end)
        {
            if (end < start)
                throw new ArgumentOutOfRangeException(nameof(end), "The end date cannot be before the start date.");

            Start = start;
            End = end;
        }

        public DateTimeRange(DateTime start, TimeSpan duration)
            : this(start, start.Add(duration))
        {
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
