using Microsoft.EntityFrameworkCore;
using Scheduler.Application.Common.Exceptions;
using Scheduler.Application.Tests.Common;
using Scheduler.Application.Workers.Commands.DeleteLeave;
using Scheduler.Domain.Entities;
using Scheduler.Domain.ValueObjects;
using Scheduler.Persistence;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Scheduler.Application.Tests.Workers.Commands
{
    public class DeleteLeaveCommandTests : DisconnectedStateTestBase
    {
        [Fact]
        public async Task DeleteCommand_SuccessfullyHandled_WhenLeaveExists()
        {

        }

        [Fact]
        public async Task DeleteCommand_ThrowsNotFoundException_WhenLeaveNotFound()
        {

        }
    }
}
