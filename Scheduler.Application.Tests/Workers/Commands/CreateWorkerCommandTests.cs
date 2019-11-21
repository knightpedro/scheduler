using Scheduler.Application.Tests.Common;
using Scheduler.Application.Workers.Commands.CreateWorker;
using Scheduler.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Workers.Commands
{
    public class CreateWorkerCommandTests : CommandTestBase<Worker>
    {
        [Fact]
        public async Task Handler_CreatesWorkerSuccessfully()
        {
            var command = new CreateWorkerCommand { Name = "Jane Doe" };
            var handler = new CreateWorkerCommandHandler(repo);

            var result = await handler.Handle(command, CancellationToken.None);

            Assert.Equal(1, result);
        }

        [Fact]
        public void CreateWorkerCommand_IsValid_WorkerNameGiven()
        {
            var command = new CreateWorkerCommand { Name = "Jane Doe" };
            var validator = new CreateWorkerCommandValidator();

            var validationResults = validator.Validate(command);

            Assert.True(validationResults.IsValid);
        }

        [Fact]
        public void CreateWorkerCommand_IsInvalid_EmptyWorkerName()
        {
            var command = new CreateWorkerCommand { Name = string.Empty };
            var validator = new CreateWorkerCommandValidator();

            var validationResults = validator.Validate(command);

            Assert.False(validationResults.IsValid);
        }

        [Fact]
        public void CreateWorkerCommand_IsInvalid_NullWorkerName()
        {
            var command = new CreateWorkerCommand();
            var validator = new CreateWorkerCommandValidator();

            var validationResults = validator.Validate(command);

            Assert.False(validationResults.IsValid);
        }
    }
}
