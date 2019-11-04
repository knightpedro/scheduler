# Persistence Layer

## Using Entity Framework Core migrations

To create migrations, install Entity Framework Tools package on the Web API.

Confirm tools are installed by typing Get-Help about_EntityFrameworkCore in the Package Manager Console.

In the Package Manager Console, set the Default Project to Persistence.

## Creating the Database
>Add-Migration Initial
>
>Script-Migration
 
If the script is suitable . . .

> Update-Database

## To start fresh
>Drop-Database