using Scheduler.Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Scheduler.Application.Trainings.Queries.GetTrainingList
{
    public class TrainingListVm
    {
        public IList<TrainingDto> Training { get; set; }

        public TrainingListVm(IEnumerable<Training> training)
        {
            Training = training.Select(t => new TrainingDto(t)).ToList();
        }
    }
}
