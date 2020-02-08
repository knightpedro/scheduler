using FluentValidation;

namespace Scheduler.Application.Workers.Commands.CreateLeave
{
    public class CreateLeaveCommandValidator : AbstractValidator<CreateLeaveCommand>
    {
        public CreateLeaveCommandValidator()
        {
            RuleFor(l => l.LeaveType).NotEmpty().MaximumLength(20);
        }
    }
}
