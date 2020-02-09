using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Application.Workers.Commands.CreateLeave;
using Scheduler.Application.Workers.Commands.DeleteLeave;
using Scheduler.Application.Workers.Commands.EditLeave;
using Scheduler.Application.Workers.Queries.GetLeave;
using Scheduler.Application.Workers.Queries.GetLeaveList;
using Scheduler.Domain.Entities;
using System;
using System.Threading.Tasks;

namespace Scheduler.WebApp.Controllers
{
    public class LeaveController : BaseController
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<LeaveListVm>> GetAll() {
            var vm = await Mediator.Send(new GetLeaveListQuery());
            return Ok(vm);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<LeaveVm>> Get(int id)
        {
            var vm = await Mediator.Send(new GetLeaveQuery { Id = id });
            return Ok(vm);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] CreateLeaveCommand command)
        {
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Update([FromBody] EditLeaveCommand command)
        {
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteLeaveCommand { LeaveId = id });
            return NoContent();
        }

        [HttpGet("leave-types")]
        public IActionResult GetLeaveTypes()
        {
            var leaveTypes = Enum.GetNames(typeof(LeaveType));
            return Ok(leaveTypes);
        }
    }
}
