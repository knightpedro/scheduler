using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Application.Calendar.Queries;
using Scheduler.Application.Calendar.Queries.GetWorkerCalendar;
using Scheduler.Application.Calendar.Queries.GetWorkersCalendar;
using Scheduler.Application.Conflicts;
using Scheduler.Application.Conflicts.Queries.GetConflictsForWorker;
using Scheduler.Application.Conflicts.Queries.GetWorkersConflicts;
using Scheduler.Application.Workers.Commands.CreateWorker;
using Scheduler.Application.Workers.Commands.DeleteWorker;
using Scheduler.Application.Workers.Commands.EditWorker;
using Scheduler.Application.Workers.Queries.GetWorkerDetail;
using Scheduler.Application.Workers.Queries.GetWorkerLeave;
using Scheduler.Application.Workers.Queries.GetWorkersList;

namespace Scheduler.WebApp.Controllers
{
    public class WorkersController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<WorkersListVm>> GetAll()
        {
            var vm = await Mediator.Send(new GetWorkersListQuery());
            return Ok(vm);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<WorkerDetailVm>> Get(int id)
        {
            var vm = await Mediator.Send(new GetWorkerDetailQuery { Id = id });
            return Ok(vm);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Create([FromBody] CreateWorkerCommand command)
        {
            var id = await Mediator.Send(command);
            return CreatedAtAction(nameof(Get), new { id }, new { id });
        }


        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesDefaultResponseType]
        public async Task<IActionResult> Update([FromBody] EditWorkerCommand command)
        {
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteWorkerCommand { Id = id });
            return NoContent();
        }

        [HttpGet("{id}/leave")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<WorkerLeaveVm>> GetLeave(int id)
        {
            var vm = await Mediator.Send(new GetWorkerLeaveQuery { WorkerId = id });
            return Ok(vm);
        }

        [HttpGet("calendar/{start}/{end}")]
        public async Task<ActionResult<WorkersCalendarVm>> GetCalendar(DateTime start, DateTime end)
        {
            var vm = await Mediator.Send(new GetWorkersCalendarQuery { Start = start, End = end });
            return Ok(vm);
        }

        [HttpGet("{id}/calendar")]
        public async Task<ActionResult<WorkerCalendarDto>> GetCalendar(int id, DateTime? start, DateTime? end)
        {
            var vm = await Mediator.Send(new GetWorkerCalendarQuery { Id = id, Start = start, End = end });
            return Ok(vm);
        }

        [HttpGet("conflicts")]
        public async Task<ActionResult<IEnumerable<EntityConflictsVm>>> GetAllConflicts(DateTime? start, DateTime? end)
        {
            var vm = await Mediator.Send(new GetWorkersConflictsQuery { Start = start, End = end });
            return Ok(vm);
        }

        [HttpGet("{id}/conflicts")]
        public async Task<ActionResult<EntityConflictsVm>> GetConflicts(int id , DateTime? start, DateTime? end)
        {
            var vm = await Mediator.Send(new GetConflictsForWorkerQuery { Id = id, Start = start, End = end });
            return Ok(vm);
        }
    }
}