using Microsoft.EntityFrameworkCore.Migrations;

namespace Scheduler.Persistence.Migrations
{
    public partial class Config : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkerTraining_Workers_WorkerId",
                table: "WorkerTraining");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkerTraining_Workers_WorkerId",
                table: "WorkerTraining",
                column: "WorkerId",
                principalTable: "Workers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkerTraining_Workers_WorkerId",
                table: "WorkerTraining");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkerTraining_Workers_WorkerId",
                table: "WorkerTraining",
                column: "WorkerId",
                principalTable: "Workers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
