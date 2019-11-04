using Scheduler.Domain.Common;
using System.Collections.Generic;
using Xunit;

namespace Scheduler.Domain.UnitTests.Common
{
    public class ValueObjectTests
    {
        [Fact]
        public void Equals_DifferentValues_ReturnsFalse() 
        {
            var p1 = new Point(1, 1);
            var p2 = new Point(2, 2);

            Assert.False(p1.Equals(p2));
        }

        [Fact]
        public void Equals_MatchingValues_ReturnsTrue()
        {
            var p1 = new Point(2, 2);
            var p2 = new Point(2, 2);

            Assert.True(p1.Equals(p2));
        }

        [Fact]
        public void EqualsOperator_OneNull_ReturnsFalse()
        {
            var p1 = new Point(1, 1);
            Point p2 = null;

            Assert.False(p1 == p2);
        }

        [Fact]
        public void EqualsOperator_BothNull_ReturnsTrue()
        {
            Point p1 = null;
            Point p2 = null;

            Assert.True(p1 == p2);
        }


        private class Point : ValueObject
        {
            public int X { get; set; }
            public int Y { get; set; }

            public Point(int x, int y)
            {
                X = x;
                Y = y;
            }

            protected override IEnumerable<object> GetEqualityComponents()
            {
                yield return X;
                yield return Y;
            }
        }
    }
}
