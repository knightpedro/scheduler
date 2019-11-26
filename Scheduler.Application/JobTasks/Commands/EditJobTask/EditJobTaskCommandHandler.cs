using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.JobTasks.Commands.EditJobTask
{
    public class EditJobTaskCommandHandler : IRequestHandler<EditJobTaskCommand>
    {
        private readonly IJobTaskRepository _repo;

        public EditJobTaskCommandHandler(IJobTaskRepository repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(EditJobTaskCommand request, CancellationToken cancellationToken)
        {
            var jobTask = await _repo.GetById(request.Id);
            if (jobTask is null)
                throw new NotFoundException(nameof(JobTask), request.Id);

            jobTask.Description = request.Description;
            jobTask.TaskPeriod = new DateTimeRange(request.Start, request.End);

            await _repo.Update(jobTask);
            return Unit.Value;
        }
    }
}
