using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Tests.Common;
using Scheduler.Application.Workers.Commands.DeleteWorker;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Workers.Commands
{
    public class DeleteWorkerCommandTests : CommandTestBase<Worker>
    {

        [Fact]
        public async Task DeleteCommandHandler_ThrowsNotFoundException_WhenWorkerDoesNotExist()
        {
            var command = new DeleteWorkerCommand { Id = 1 };
            var handler = new DeleteWorkerCommandHandler(repo);
            await Assert.ThrowsAsync<NotFoundException>(() => handler.Handle(command, CancellationToken.None));
        }

        [Fact]
        public async Task DeleteCommandHandler_SuccessfullyDeletesWorker_WhenWorkerExists()
        {
            var worker = new Worker { Name = "Mary" };
            await repo.Add(worker);

            var command = new DeleteWorkerCommand { Id = worker.Id };
            var handler = new DeleteWorkerCommandHandler(repo);
            await handler.Handle(command, CancellationToken.None);

            var deletedWorker = await repo.GetById(worker.Id);
            Assert.Null(deletedWorker);
        }
    }
}
