using MediatR;

namespace Scheduler.Application.Resources.Queries.GetOutOfService
{
    public class GetOutOfServiceQuery : IRequest<OutOfServiceVm>
    {
        public int Id { get; set; }
    }
}
