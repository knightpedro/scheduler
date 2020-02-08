using FluentValidation;

namespace Scheduler.Application.Coordinators.Commands.EditCoordinator
{
    public class EditCoordinatorCommandValidator : AbstractValidator<EditCoordinatorCommand>
    {
        public EditCoordinatorCommandValidator()
        {
            RuleFor(c => c.Name).NotEmpty().MaximumLength(50);
            RuleFor(c => c.Email).EmailAddress();
        }
    }
}
