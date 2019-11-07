using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Tests.Common;
using Scheduler.Application.Workers.Commands.DeleteWorker;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Workers.Commands
{
    public class DeleteWorkerCommandTests : CommandTestBase
    {
        [Fact]
        public async Task DeleteCommandHandler_ThrowsNotFoundException_WhenWorkerDoesNotExist()
        {
            var command = new DeleteWorkerCommand { Id = 1 };
            var handler = new DeleteWorkerCommandHandler(context);
            await Assert.ThrowsAsync<NotFoundException>(() => handler.Handle(command, CancellationToken.None));
        }

        [Fact]
        public async Task DeleteCommandHandler_SuccessfullyDeletesWorker_WhenWorkerExists()
        {
            var worker = new Worker { Name = "Mary" };
            context.Workers.Add(worker);
            await context.SaveChangesAsync(CancellationToken.None);

            var command = new DeleteWorkerCommand { Id = worker.Id };
            var handler = new DeleteWorkerCommandHandler(context);
            await handler.Handle(command, CancellationToken.None);

            var deletedWorker = await context.Workers.FindAsync(1);
            Assert.Null(deletedWorker);
        }
    }
}
