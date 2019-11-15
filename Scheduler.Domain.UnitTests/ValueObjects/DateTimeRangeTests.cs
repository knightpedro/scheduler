using Scheduler.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Scheduler.Domain.UnitTests.ValueObjects
{
    public class DateTimeRangeTests
    {
        [Theory]
        [MemberData(nameof(ValidData))]
        public void CanConstructDateTimeRangeForValidDateTimes(DateTime start, DateTime end)
        {
            var range = new DateTimeRange(start, end);
        }

        [Theory]
        [MemberData(nameof(InvalidData))]
        public void Constructor_ThrowsException_WhenEndComesBeforeStart(DateTime start, DateTime end)
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => new DateTimeRange(start, end));
        }

        [Theory]
        [MemberData(nameof(OverlappingRanges))]
        public void OverlapsWith_ReturnsTrueForOverlappingRanges(DateTimeRange a, DateTimeRange b)
        {
            Assert.True(a.OverlapsWith(b));
        }

        [Theory]
        [MemberData(nameof(NonOverlappingRanges))]
        public void OverlapsWith_ReturnsFalseForNonOverlappingRanges(DateTimeRange a, DateTimeRange b)
        {
            Assert.False(a.OverlapsWith(b));
        }


        public static IEnumerable<object[]> ValidData()
        {
            yield return new object[] { new DateTime(), new DateTime() };
            yield return new object[] { new DateTime(), new DateTime(2019, 11, 1) };
            yield return new object[] { DateTime.MinValue, DateTime.MaxValue };
            yield return new object[] { DateTime.MinValue, DateTime.MinValue };
            yield return new object[] { DateTime.MaxValue, DateTime.MaxValue };
        }

        public static IEnumerable<object[]> InvalidData()
        {
            yield return new object[] { new DateTime(2019, 11, 1), new DateTime() };
            yield return new object[] { new DateTime(2019, 11, 1, 12, 0, 0, 1), new DateTime(2019, 11, 1, 12, 0, 0, 0) };
            yield return new object[] { DateTime.MaxValue, DateTime.MinValue };
        }

        public static IEnumerable<object[]> OverlappingRanges()
        {
            yield return new object[] {
                new DateTimeRange(
                    new DateTime(2019, 1, 1), 
                    new DateTime(2019, 12, 31)),
                new DateTimeRange(
                    new DateTime(2019, 2, 1),
                    new DateTime(2019, 2, 28))
            };

            yield return new object[] {
                new DateTimeRange(
                    DateTime.MinValue,
                    DateTime.MaxValue),
                new DateTimeRange(
                    new DateTime(2019, 2, 1),
                    new DateTime(2019, 2, 28))
            };
        }

        public static IEnumerable<object[]> NonOverlappingRanges()
        {
            yield return new object[] {
                new DateTimeRange(
                    new DateTime(2019, 1, 1),
                    new DateTime(2019, 12, 31)),
                new DateTimeRange(
                    new DateTime(2020, 2, 1),
                    new DateTime(2020, 2, 28))
            };

            yield return new object[] {
                new DateTimeRange(
                    new DateTime(2019, 1, 1),
                    new DateTime(2019, 1, 2)),
                new DateTimeRange(
                    new DateTime(2019, 1, 2),
                    new DateTime(2019, 1, 3))
            };
        }
    }
}
