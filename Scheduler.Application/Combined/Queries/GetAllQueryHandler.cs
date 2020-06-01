using MediatR;
using Scheduler.Application.Conflicts.Queries.GetAllResourceConflicts;
using Scheduler.Application.Conflicts.Queries.GetAllWorkerConflicts;
using Scheduler.Application.Coordinators.Queries.GetCoordinatorsList;
using Scheduler.Application.Jobs.Queries.GetJobsList;
using Scheduler.Application.Resources.Queries.GetOutOfServicesList;
using Scheduler.Application.Resources.Queries.GetResourcesList;
using Scheduler.Application.Trainings.Queries.GetTrainingList;
using Scheduler.Application.Workers.Queries.GetLeaveList;
using Scheduler.Application.Workers.Queries.GetWorkersList;
using Scheduler.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Scheduler.Application.Combined.Queries
{
    public class GetAllQueryHandler : IRequestHandler<GetAllQuery, CombinedVm>
    {
        private IMediator _mediator;

        public GetAllQueryHandler(IMediator mediator)
        {
            _mediator = mediator;
        }


        public async Task<CombinedVm> Handle(GetAllQuery request, CancellationToken cancellationToken)
        {        
            var coordinators = await _mediator.Send(new GetCoordinatorsQuery());
            var jobs = await _mediator.Send(new GetJobsListQuery());
            var leave = await _mediator.Send(new GetLeaveListQuery());
            var leaveTypes = Enum.GetNames(typeof(LeaveType));
            var outOfServices = await _mediator.Send(new GetOutOfServicesListQuery());
            var outOfServiceTypes = Enum.GetNames(typeof(ResourceOutOfServiceReason));
            var resources = await _mediator.Send(new GetResourcesListQuery());
            var resourceConflicts = await _mediator.Send(new GetAllResourceConflictsQuery());
            var training = await _mediator.Send(new GetTrainingListQuery());
            var workers = await _mediator.Send(new GetWorkersListQuery());
            var workerConflicts = await _mediator.Send(new GetAllWorkerConflictsQuery());

            return new CombinedVm
            {
                Coordinators = coordinators.Coordinators,
                Jobs = jobs.Jobs,
                Leave = leave.Leave,
                LeaveTypes = leaveTypes,
                OutOfServices = outOfServices.OutOfServices,
                OutOfServiceTypes = outOfServiceTypes,
                Resources = resources.Resources,
                ResourceConflicts = resourceConflicts,
                Training = training.Training,
                Workers = workers.Workers,
                WorkerConflicts = workerConflicts
            };
        }
    }
}
