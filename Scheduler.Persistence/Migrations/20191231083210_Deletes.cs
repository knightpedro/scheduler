using Microsoft.EntityFrameworkCore.Migrations;

namespace Scheduler.Persistence.Migrations
{
    public partial class Deletes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ResourceShifts_JobTasks_JobTaskId",
                table: "ResourceShifts");

            migrationBuilder.DropForeignKey(
                name: "FK_ResourceShifts_Resources_ResourceId",
                table: "ResourceShifts");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkerCrews_Crews_CrewId",
                table: "WorkerCrews");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkerCrews_Workers_WorkerId",
                table: "WorkerCrews");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkerRoles_Roles_RoleId",
                table: "WorkerRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkerRoles_Workers_WorkerId",
                table: "WorkerRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkerShifts_JobTasks_JobTaskId",
                table: "WorkerShifts");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkerShifts_Workers_WorkerId",
                table: "WorkerShifts");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkerTraining_Training_TrainingId",
                table: "WorkerTraining");

            migrationBuilder.AddForeignKey(
                name: "FK_ResourceShifts_JobTasks_JobTaskId",
                table: "ResourceShifts",
                column: "JobTaskId",
                principalTable: "JobTasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ResourceShifts_Resources_ResourceId",
                table: "ResourceShifts",
                column: "ResourceId",
                principalTable: "Resources",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkerCrews_Crews_CrewId",
                table: "WorkerCrews",
                column: "CrewId",
                principalTable: "Crews",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkerCrews_Workers_WorkerId",
                table: "WorkerCrews",
                column: "WorkerId",
                principalTable: "Workers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkerRoles_Roles_RoleId",
                table: "WorkerRoles",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkerRoles_Workers_WorkerId",
                table: "WorkerRoles",
                column: "WorkerId",
                principalTable: "Workers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkerShifts_JobTasks_JobTaskId",
                table: "WorkerShifts",
                column: "JobTaskId",
                principalTable: "JobTasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkerShifts_Workers_WorkerId",
                table: "WorkerShifts",
                column: "WorkerId",
                principalTable: "Workers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkerTraining_Training_TrainingId",
                table: "WorkerTraining",
                column: "TrainingId",
                principalTable: "Training",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ResourceShifts_JobTasks_JobTaskId",
                table: "ResourceShifts");

            migrationBuilder.DropForeignKey(
                name: "FK_ResourceShifts_Resources_ResourceId",
                table: "ResourceShifts");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkerCrews_Crews_CrewId",
                table: "WorkerCrews");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkerCrews_Workers_WorkerId",
                table: "WorkerCrews");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkerRoles_Roles_RoleId",
                table: "WorkerRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkerRoles_Workers_WorkerId",
                table: "WorkerRoles");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkerShifts_JobTasks_JobTaskId",
                table: "WorkerShifts");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkerShifts_Workers_WorkerId",
                table: "WorkerShifts");

            migrationBuilder.DropForeignKey(
                name: "FK_WorkerTraining_Training_TrainingId",
                table: "WorkerTraining");

            migrationBuilder.AddForeignKey(
                name: "FK_ResourceShifts_JobTasks_JobTaskId",
                table: "ResourceShifts",
                column: "JobTaskId",
                principalTable: "JobTasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ResourceShifts_Resources_ResourceId",
                table: "ResourceShifts",
                column: "ResourceId",
                principalTable: "Resources",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkerCrews_Crews_CrewId",
                table: "WorkerCrews",
                column: "CrewId",
                principalTable: "Crews",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkerCrews_Workers_WorkerId",
                table: "WorkerCrews",
                column: "WorkerId",
                principalTable: "Workers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkerRoles_Roles_RoleId",
                table: "WorkerRoles",
                column: "RoleId",
                principalTable: "Roles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkerRoles_Workers_WorkerId",
                table: "WorkerRoles",
                column: "WorkerId",
                principalTable: "Workers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkerShifts_JobTasks_JobTaskId",
                table: "WorkerShifts",
                column: "JobTaskId",
                principalTable: "JobTasks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkerShifts_Workers_WorkerId",
                table: "WorkerShifts",
                column: "WorkerId",
                principalTable: "Workers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WorkerTraining_Training_TrainingId",
                table: "WorkerTraining",
                column: "TrainingId",
                principalTable: "Training",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
