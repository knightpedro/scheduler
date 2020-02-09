using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Application.Resources.Commands.CreateOutOfService;
using Scheduler.Application.Resources.Commands.DeleteOutOfService;
using Scheduler.Application.Resources.Commands.EditOutOfService;
using Scheduler.Application.Resources.Queries.GetOutOfService;
using Scheduler.Application.Resources.Queries.GetOutOfServicesList;
using Scheduler.Domain.Entities;

namespace Scheduler.WebApp.Controllers
{
    public class OutOfServiceController : BaseController
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<OutOfServicesListVm>> GetAll()
        {
            var vm = await Mediator.Send(new GetOutOfServicesListQuery());
            return Ok(vm);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<OutOfServiceVm>> Get(int id)
        {
            var vm = await Mediator.Send(new GetOutOfServiceQuery { Id = id });
            return Ok(vm);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] CreateOutOfServiceCommand command)
        {
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Update([FromBody] EditOutOfServiceCommand command)
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