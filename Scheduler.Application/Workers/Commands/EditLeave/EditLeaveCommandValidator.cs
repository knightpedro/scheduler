using FluentValidation;

namespace Scheduler.Application.Workers.Commands.EditLeave
{
    public class EditLeaveCommandValidator : AbstractValidator<EditLeaveCommand>
    {
        public EditLeaveCommandValidator()
        {
            RuleFor(l => l.LeaveType).NotEmpty().MaximumLength(20);
        }
    }
}
