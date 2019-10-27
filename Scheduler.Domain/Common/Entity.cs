namespace Scheduler.Domain.Common
{
    // Based on Vladimir Khorikov's implementation at https://enterprisecraftsmanship.com/posts/entity-base-class/

    public abstract class Entity
    {
        public int Id { get; protected set; }

        public override bool Equals(object obj)
        {
            var other = obj as Entity;
            if (other is null)
                return false;
            if (ReferenceEquals(this, other))
                return true;
            if (GetType() != other.GetType())
                return false;
            if (Id == 0 || other.Id == 0)
                return false;
            return Id == other.Id;
        }

        public static bool operator ==(Entity left, Entity right)
        {
            if (left is null && right is null)
                return true;
            if (left is null || right is null)
                return false;
            return left.Equals(right);
        }

        public static bool operator !=(Entity left, Entity right)
        {
            return !(left == right);
        }

        public override int GetHashCode()
        {
            return (GetType().ToString() + Id).GetHashCode();
        }
    }
}
