using Scheduler.Application.Common.Models;
using System.Collections.Generic;
using System.Linq;

namespace Scheduler.Persistence.Common
{
    public static class Conflicts
    {
        public static bool Overlaps(Appointment a, Appointment b)
        {
            return a.Start < b.End && b.Start < a.End;
        }

        public static void GetConflicts(List<Appointment> appointments)
        {
            var orderedAppointments = appointments.OrderBy(a => a.Start).ToList();
            var compareIndex = 0;
            var testIndex = 1;
            while ((compareIndex < orderedAppointments.Count - 1) && (testIndex < orderedAppointments.Count))
            {
                if (Overlaps(orderedAppointments[compareIndex], orderedAppointments[testIndex]))
                {
                    orderedAppointments[compareIndex].IsConflicting = true;
                    orderedAppointments[testIndex].IsConflicting = true;
                    testIndex++;
                }
                else
                {
                    compareIndex = testIndex++;
                }
            }
        }
    }
}
