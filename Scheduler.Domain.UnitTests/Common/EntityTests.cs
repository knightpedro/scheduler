using Scheduler.Domain.Common;
using Xunit;

namespace Scheduler.Domain.UnitTests.Common
{
    public class EntityTests
    {
        [Fact]
        public void EqualsOperator_SameTypeAndId_AreEqual()
        {
            var p1 = new Person(1, "Sam");
            var p2 = new Person(1, "Henry");

            Assert.True(p1 == p2);
        }

        [Fact]
        public void EqualsOperator_SameIdButDifferentType_AreNotEqual()
        {
            var p = new Person(1, "Sam");
            var b = new Book(1, "A True Story");

            Assert.False(p == b);
        }

        [Fact]
        public void EqualsOperator_BothNull_AreEqual()
        {
            Person p1 = null;
            Person p2 = null;

            Assert.True(p1 == p2);
        }


        private class Person : Entity
        {
            public string Name { get; private set; }

            public Person(int id, string name)
            {
                Id = id;
                Name = name;
            }
        }

        private class Book : Entity
        {
            public string Title { get; private set; }

            public Book(int id, string title)
            {
                Id = id;
                Title = Title;
            }
        }
    }
}
