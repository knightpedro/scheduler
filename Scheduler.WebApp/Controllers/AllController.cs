using Microsoft.AspNetCore.Mvc;
using Scheduler.Application.Combined;
using Scheduler.Application.Combined.Queries;
using System.Threading.Tasks;

namespace Scheduler.WebApp.Controllers
{
    public class AllController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<CombinedVm>> GetAll()
        {
            var vm = await Mediator.Send(new GetAllQuery());
            return Ok(vm);
        }
    }
}
