using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Application.Resources.Commands.CreateOutOfService;
using Scheduler.Application.Resources.Commands.DeleteOutOfService;
using Scheduler.Domain.Entities;

namespace Scheduler.WebAPI.Controllers
{
    public class OutOfServiceController : BaseController
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] CreateOutOfServiceCommand command)
        {
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteOutOfServiceCommand { Id = id });
            return NoContent();
        }

        [HttpGet("reasons")]
        public IActionResult GetReasons()
        {
            var reasons = Enum.GetNames(typeof(ResourceOutOfServiceReason));
            return Ok(reasons);
        }
    }
}