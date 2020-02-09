using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Application.JobTasks.Commands.AssignResources;
using Scheduler.Application.JobTasks.Commands.AssignWorkers;
using Scheduler.Application.JobTasks.Commands.CreateJobTask;
using Scheduler.Application.JobTasks.Commands.DeleteJobTask;
using Scheduler.Application.JobTasks.Commands.EditJobTask;
using Scheduler.Application.JobTasks.Commands.RemoveResources;
using Scheduler.Application.JobTasks.Commands.RemoveWorkers;
using Scheduler.Application.JobTasks.Queries.GetJobTaskDetail;

namespace Scheduler.WebApp.Controllers
{
    public class JobTasksController : BaseController
    {
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<JobTaskDetailVm>> Get(int id)
        {
            var vm = await Mediator.Send(new GetJobTaskDetailQuery { Id = id });
            return Ok(vm);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] CreateJobTaskCommand command)
        {
            var id = await Mediator.Send(command);
            return CreatedAtAction(nameof(Get), new { id }, new { id });
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update([FromBody] EditJobTaskCommand command)
        {
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteJobTaskCommand { Id = id });
            return NoContent();
        }

        [HttpPatch("{id}/workers")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateWorkers(int id, [FromBody] Patch workersPatch)
        {
            if (!(workersPatch.Add is null))
                await Mediator.Send(new AssignWorkersCommand { JobTaskId = id, WorkerIds = workersPatch.Add });
            if (!(workersPatch.Remove is null))
                await Mediator.Send(new RemoveWorkersCommand { JobTaskId = id, WorkerIds = workersPatch.Remove });
            return NoContent();
        }

        [HttpPatch("{id}/resources")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateResources(int id, [FromBody] Patch resourcesPatch)
        {
            if (!(resourcesPatch.Add is null))
                await Mediator.Send(new AssignResourcesCommand { JobTaskId = id, ResourceIds = resourcesPatch.Add });
            if (!(resourcesPatch.Remove is null))
                await Mediator.Send(new RemoveResourcesCommand { JobTaskId = id, ResourceIds = resourcesPatch.Remove });
            return NoContent();
        }

    }

    public class Patch
    {
        public IEnumerable<int> Add { get; set; }
        public IEnumerable<int> Remove { get; set; }
    }
}