using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Application.Coordinators.Commands.CreateCoordinator;
using Scheduler.Application.Coordinators.Commands.DeleteCoordinator;
using Scheduler.Application.Coordinators.Commands.EditCoordinator;
using Scheduler.Application.Coordinators.Queries.GetCoordinatorDetail;
using Scheduler.Application.Coordinators.Queries.GetCoordinatorsList;

namespace Scheduler.WebAPI.Controllers
{
    public class CoordinatorsController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<CoordinatorsListVm>> GetAll()
        {
            var vm = await Mediator.Send(new GetCoordinatorsQuery());
            return Ok(vm);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CoordinatorDetailVm>> Get(int id)
        {
            var vm = await Mediator.Send(new GetCoordinatorDetailQuery { Id = id });
            return Ok(vm);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] CreateCoordinatorCommand command)
        {
            var id = await Mediator.Send(command);
            return CreatedAtAction(nameof(Get), new { id }, new { id });
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update([FromBody] EditCoordinatorCommand command)
        {
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteCoordinatorCommand { Id = id });
            return NoContent();
        }
    }
}