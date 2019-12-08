using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Application.Resources.Commands.CreateResource;
using Scheduler.Application.Resources.Commands.DeleteResource;
using Scheduler.Application.Resources.Commands.EditResource;
using Scheduler.Application.Resources.Queries.GetResourceDetail;
using Scheduler.Application.Resources.Queries.GetResourceOutOfServices;
using Scheduler.Application.Resources.Queries.GetResourcesList;

namespace Scheduler.WebAPI.Controllers
{
    public class ResourcesController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<ResourcesListVm>> GetAll()
        {
            var vm = await Mediator.Send(new GetResourcesListQuery());
            return Ok(vm);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ResourceDetailVm>> Get(int id)
        {
            var vm = await Mediator.Send(new GetResourceDetailQuery { Id = id });
            return Ok(vm);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] CreateResourceCommand command)
        {
            var id = await Mediator.Send(command);
            return CreatedAtAction(nameof(Get), new { id }, new { id });
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update([FromBody] EditResourceCommand command)
        {
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteResourceCommand { Id = id });
            return NoContent();
        }

        [HttpGet("{id}/outofservice")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ResourceOutOfServicesListVm>> GetOutOfServices(int id)
        {
            var vm = await Mediator.Send(new GetResourceOutOfServicesQuery { ResourceId = id });
            return Ok(vm);
        }
    }
}