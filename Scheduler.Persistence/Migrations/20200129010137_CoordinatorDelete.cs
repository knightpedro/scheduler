using Microsoft.EntityFrameworkCore.Migrations;

namespace Scheduler.Persistence.Migrations
{
    public partial class CoordinatorDelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Coordinators_CoordinatorId",
                table: "Jobs");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Coordinators_CoordinatorId",
                table: "Jobs",
                column: "CoordinatorId",
                principalTable: "Coordinators",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Coordinators_CoordinatorId",
                table: "Jobs");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Coordinators_CoordinatorId",
                table: "Jobs",
                column: "CoordinatorId",
                principalTable: "Coordinators",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
