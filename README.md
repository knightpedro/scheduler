[![Build Status](https://dev.azure.com/petekanighit/Scheduler/_apis/build/status/knightpedro.scheduler?branchName=master)](https://dev.azure.com/petekanighit/Scheduler/_build/latest?definitionId=2&branchName=master)
# Scheduler

Scheduler is a work planning application built using ASP.NET Core with a React front end.

Schedule jobs, assign resources and quickly identify conflicts.

View the app running at https://www.scheduler.co.nz.

## Architecture
The backend project is heavily based on the *Clean Architecture* from Jason Taylor's NorthwindTraders sample application https://github.com/jasontaylordev/NorthwindTraders.

Domain driven design principles are used to separate the solution into several projects.

### Domain
Entities and value objects are defined here. They have no dependencies on the rest of the application.

### Persistence
Entity Framework Core is used to configure the domain entities for database storage. The repository pattern is implemented for simple data access.

### Infrastructure
Contains models and setup for IdentityServer.

### Application
Commands and queries are created using MediatR and validated with Fluent Validation.

Interfaces for the repository pattern and EF Core DBContext are defined here to be implemented in other layers. 

### Web App
API controllers deliver data to the [React client](Scheduler.WebApp/ClientApp).

## Technologies
* ASP.NET Core 3.1
* Entity Framework Core with SQL Server
* React (hook based components)
* Redux

## Testing
* XUnit for .NET Core
* Jest and React Testing Library for React 
