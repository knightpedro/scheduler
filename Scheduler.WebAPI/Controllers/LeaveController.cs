using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Application.Workers.Commands.CreateLeave;
using Scheduler.Application.Workers.Commands.DeleteLeave;
using System.Threading.Tasks;

namespace Scheduler.WebAPI.Controllers
{
    public class LeaveController : BaseController
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] CreateLeaveCommand command)
        {
            var id = await Mediator.Send(command);
            return CreatedAtAction(nameof(Create), new { id }, new { id });
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteLeaveCommand { LeaveId = id });
            return NoContent();
        }
    }
}
