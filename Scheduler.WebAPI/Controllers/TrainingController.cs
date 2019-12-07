using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Application.Trainings.Commands.AddWorkers;
using Scheduler.Application.Trainings.Commands.CreateTraining;
using Scheduler.Application.Trainings.Commands.DeleteTraining;
using Scheduler.Application.Trainings.Commands.EditTraining;
using Scheduler.Application.Trainings.Commands.RemoveWorkers;
using Scheduler.Application.Trainings.Queries.GetTrainingDetail;
using Scheduler.Application.Trainings.Queries.GetTrainingList;

namespace Scheduler.WebAPI.Controllers
{
    public class TrainingController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<TrainingListVm>> GetAll()
        {
            var vm = await Mediator.Send(new GetTrainingListQuery());
            return Ok(vm);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<TrainingDetailVm>> Get(int id)
        {
            var vm = await Mediator.Send(new GetTrainingDetailQuery { Id = id });
            return Ok(vm);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] CreateTrainingCommand command)
        {
            var id = await Mediator.Send(command);
            return CreatedAtAction(nameof(Get), new { id }, new { id });
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Update([FromBody] EditTrainingCommand command)
        {
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteTrainingCommand { TrainingId = id });
            return NoContent();
        }

        [HttpPatch("{id}/workers")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateWorkers(int id, [FromBody] WorkersPatch workersPatch)
        {
            await Mediator.Send(new AddWorkersCommand { TrainingId = id, WorkerIds = workersPatch.Add });
            await Mediator.Send(new RemoveWorkersCommand { TrainingId = id, WorkerIds = workersPatch.Remove });
            return NoContent();
        }
    }

    public class WorkersPatch
    {
        public IEnumerable<int> Add { get; set; }
        public IEnumerable<int> Remove { get; set; }
    }
}