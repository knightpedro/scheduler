# Scheduler

Scheduler is a planning application built using ASP.NET Core with a React front end.

Schedule jobs, assign staff and resources and quickly identify conflicts.

View the app running at https://schedulerwebapp.azurewebsites.net/.

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

Interfaces for the repository pattern and EF Core DBContext are defined here to implemented in other layers. 

### Web App
API controllers deliver data to the React client.

## Technologies
* ASP.NET Core 3.1
* Entity Framework Core with SQL Server
* React using a combination of class-based components and hooks

## Testing
* XUnit for .NET Core
* Jest and Enzyme for React 
