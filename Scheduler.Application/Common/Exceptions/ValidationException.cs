using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Scheduler.Application.Common.Exceptions
{
    public class ValidationException : Exception
    {
        public IDictionary<string, string[]> Failures { get; }

        public ValidationException(List<ValidationFailure> failures)
            :base("One or more validation failures have occured")
        {
            Failures = new Dictionary<string, string[]>();

            var propertyNames = failures.Select(f => f.PropertyName)
                .Distinct();

            foreach(var prop in propertyNames)
            {
                var propFailures = failures.Where(f => f.PropertyName == prop)
                    .Select(f => f.ErrorMessage)
                    .ToArray();

                Failures.Add(prop, propFailures);
            }
        }
    }
}
