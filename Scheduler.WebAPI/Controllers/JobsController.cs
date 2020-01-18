using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Application.Jobs.Commands.AssignCoordinator;
using Scheduler.Application.Jobs.Commands.CreateJob;
using Scheduler.Application.Jobs.Commands.DeleteJob;
using Scheduler.Application.Jobs.Commands.EditJob;
using Scheduler.Application.Jobs.Queries.GetJobDetail;
using Scheduler.Application.Jobs.Queries.GetJobsList;

namespace Scheduler.WebAPI.Controllers
{
    public class JobsController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<JobsListVm>> GetAll()
        {
            var vm = await Mediator.Send(new GetJobsListQuery());
            return Ok(vm);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<JobDetailVm>> Get(int id)
        {
            var vm = await Mediator.Send(new GetJobDetailQuery { Id = id });
            return Ok(vm);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] CreateJobCommand command)
        {
            var id = await Mediator.Send(command);
            return CreatedAtAction(nameof(Get), new { id }, new { id });
        }


        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update([FromBody] EditJobCommand command)
        {
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteJobCommand { Id = id });
            return NoContent();
        }

        [HttpPut("{id}/coordinator")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> AssignCoordinator(int id, [FromBody] AssignCoordinatorCommand command)
        {
            command.JobId = id;
            await Mediator.Send(command);
            return NoContent();
        }
    }
}