using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Scheduler.Application.Workers.Commands.CreateWorker;
using Scheduler.Application.Workers.Commands.DeleteWorker;
using Scheduler.Application.Workers.Queries.GetWorkerDetail;
using Scheduler.Application.Workers.Queries.GetWorkersList;

namespace Scheduler.WebAPI.Controllers
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
        public async Task<ActionResult<WorkerDetailVm>> Get(int id)
        {
            var vm = await Mediator.Send(new GetWorkerDetailQuery { Id = id });
            return Ok(vm);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]CreateWorkerCommand command)
        {
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteWorkerCommand { Id = id });
            return NoContent();
        }
    }
}