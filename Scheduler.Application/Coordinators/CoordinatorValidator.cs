using FluentValidation;
using Scheduler.Domain.Entities;

namespace Scheduler.Application.Coordinators
{
    public class CoordinatorValidator : AbstractValidator<Coordinator>
    {
        public CoordinatorValidator()
        {
            RuleFor(c => c.Name).NotEmpty().MaximumLength(50);
            RuleFor(c => c.Email).EmailAddress();
        }
    }
}
