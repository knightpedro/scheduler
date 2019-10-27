using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Scheduler.Domain.Common
{
    public abstract class ValueObject
    {
        protected abstract IEnumerable<object> GetEqualityComponents();

        public override bool Equals(object obj)
        {
            if (obj is null)
                return false;
            if (GetType() != obj.GetType())
                return false;
            var valueObject = (ValueObject)obj;
            return GetEqualityComponents().SequenceEqual(valueObject.GetEqualityComponents());
        }

        public static bool operator ==(ValueObject left, ValueObject right)
        {
            if (left is null && right is null)
                return true;
            if (left is null || right is null)
                return false;
            return left.Equals(right);
        }

        public static bool operator !=(ValueObject left, ValueObject right)
        {
            return !(left == right);
        }

        public override int GetHashCode()
        {
            var hash = new HashCode();
            foreach (var obj in GetEqualityComponents())
            {
                if (!(obj is null))
                    hash.Add(obj);
            }
            return hash.ToHashCode();
        }
    }
}
