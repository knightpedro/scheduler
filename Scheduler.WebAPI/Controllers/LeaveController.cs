using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Application.Workers.Commands.CreateLeave;
using Scheduler.Application.Workers.Commands.DeleteLeave;
using Scheduler.Domain.Entities;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Scheduler.WebAPI.Controllers
{
    public class LeaveController : BaseController
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] CreateLeaveCommand command)
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
