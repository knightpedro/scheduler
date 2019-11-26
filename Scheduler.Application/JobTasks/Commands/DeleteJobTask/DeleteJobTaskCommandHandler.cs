using MediatR;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Common.Interfaces;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.JobTasks.Commands.DeleteJobTask
{
    public class DeleteJobTaskCommandHandler : IRequestHandler<DeleteJobTaskCommand>
    {
        private readonly IJobTaskRepository _repo;

        public DeleteJobTaskCommandHandler(IJobTaskRepository repo)
        {
            _repo = repo;
        }

        public async Task<Unit> Handle(DeleteJobTaskCommand request, CancellationToken cancellationToken)
        {
            var jobTask = await _repo.GetById(request.Id);
            if (jobTask is null)
                throw new NotFoundException(nameof(JobTask), request.Id);
            await _repo.Remove(jobTask);
            return Unit.Value;
        }
    }
}
