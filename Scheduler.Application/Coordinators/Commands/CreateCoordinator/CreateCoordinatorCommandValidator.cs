using FluentValidation;

namespace Scheduler.Application.Coordinators.Commands.CreateCoordinator
{
    public class CreateCoordinatorCommandValidator : AbstractValidator<CreateCoordinatorCommand>
    {
        public CreateCoordinatorCommandValidator()
        {
            RuleFor(c => c.Name).NotEmpty().MaximumLength(50);
            RuleFor(c => c.Email).EmailAddress();
        }
    }
}
