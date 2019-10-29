using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Scheduler.Persistence.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Coordinators",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    Email = table.Column<string>(maxLength: 254, nullable: true),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coordinators", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Crews",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateFormed = table.Column<DateTime>(nullable: true),
                    DateDisbanded = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Crews", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Resources",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 30, nullable: false),
                    Description = table.Column<string>(maxLength: 50, nullable: false),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resources", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleType = table.Column<string>(maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Training",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(maxLength: 30, nullable: false),
                    Location = table.Column<string>(maxLength: 30, nullable: true),
                    Start = table.Column<DateTime>(nullable: true),
                    End = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Training", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Workers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(maxLength: 50, nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    JoinedCompany = table.Column<DateTime>(nullable: true),
                    LeftCompany = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Jobs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    JobNumber = table.Column<string>(maxLength: 10, nullable: false),
                    Description = table.Column<string>(maxLength: 160, nullable: false),
                    Location = table.Column<string>(maxLength: 30, nullable: false),
                    DateReceived = table.Column<DateTime>(nullable: true),
                    DateScheduled = table.Column<DateTime>(nullable: true),
                    PlannedStart = table.Column<DateTime>(nullable: true),
                    ActualStart = table.Column<DateTime>(nullable: true),
                    PlannedCompletion = table.Column<DateTime>(nullable: true),
                    ActualCompletion = table.Column<DateTime>(nullable: true),
                    CoordinatorId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jobs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Jobs_Coordinators_CoordinatorId",
                        column: x => x.CoordinatorId,
                        principalTable: "Coordinators",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ResourceOutOfService",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Start = table.Column<DateTime>(nullable: true),
                    End = table.Column<DateTime>(nullable: true),
                    Reason = table.Column<string>(maxLength: 30, nullable: false),
                    ResourceId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResourceOutOfService", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ResourceOutOfService_Resources_ResourceId",
                        column: x => x.ResourceId,
                        principalTable: "Resources",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Leave",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Start = table.Column<DateTime>(nullable: true),
                    End = table.Column<DateTime>(nullable: true),
                    LeaveType = table.Column<string>(maxLength: 20, nullable: false),
                    WorkerId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Leave", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Leave_Workers_WorkerId",
                        column: x => x.WorkerId,
                        principalTable: "Workers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkerCrews",
                columns: table => new
                {
                    CrewId = table.Column<int>(nullable: false),
                    WorkerId = table.Column<int>(nullable: false),
                    JoinedCrew = table.Column<DateTime>(nullable: true),
                    LeftCrew = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkerCrews", x => new { x.CrewId, x.WorkerId })
                        .Annotation("SqlServer:Clustered", false);
                    table.ForeignKey(
                        name: "FK_WorkerCrews_Crews_CrewId",
                        column: x => x.CrewId,
                        principalTable: "Crews",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkerCrews_Workers_WorkerId",
                        column: x => x.WorkerId,
                        principalTable: "Workers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WorkerRoles",
                columns: table => new
                {
                    RoleId = table.Column<int>(nullable: false),
                    WorkerId = table.Column<int>(nullable: false),
                    StartedRole = table.Column<DateTime>(nullable: true),
                    EndedRole = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkerRoles", x => new { x.RoleId, x.WorkerId })
                        .Annotation("SqlServer:Clustered", false);
                    table.ForeignKey(
                        name: "FK_WorkerRoles_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkerRoles_Workers_WorkerId",
                        column: x => x.WorkerId,
                        principalTable: "Workers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WorkerTraining",
                columns: table => new
                {
                    TrainingId = table.Column<int>(nullable: false),
                    WorkerId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkerTraining", x => new { x.WorkerId, x.TrainingId })
                        .Annotation("SqlServer:Clustered", false);
                    table.ForeignKey(
                        name: "FK_WorkerTraining_Training_TrainingId",
                        column: x => x.TrainingId,
                        principalTable: "Training",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkerTraining_Workers_WorkerId",
                        column: x => x.WorkerId,
                        principalTable: "Workers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "JobTasks",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(maxLength: 160, nullable: false),
                    PlannedStart = table.Column<DateTime>(nullable: true),
                    PlannedEnd = table.Column<DateTime>(nullable: true),
                    ActualStart = table.Column<DateTime>(nullable: true),
                    ActualEnd = table.Column<DateTime>(nullable: true),
                    JobId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobTasks_Jobs_JobId",
                        column: x => x.JobId,
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ResourceShifts",
                columns: table => new
                {
                    ResourceId = table.Column<int>(nullable: false),
                    JobTaskId = table.Column<int>(nullable: false),
                    Start = table.Column<DateTime>(nullable: true),
                    End = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResourceShifts", x => new { x.JobTaskId, x.ResourceId })
                        .Annotation("SqlServer:Clustered", false);
                    table.ForeignKey(
                        name: "FK_ResourceShifts_JobTasks_JobTaskId",
                        column: x => x.JobTaskId,
                        principalTable: "JobTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ResourceShifts_Resources_ResourceId",
                        column: x => x.ResourceId,
                        principalTable: "Resources",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WorkerShifts",
                columns: table => new
                {
                    JobTaskId = table.Column<int>(nullable: false),
                    WorkerId = table.Column<int>(nullable: false),
                    Start = table.Column<DateTime>(nullable: true),
                    End = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkerShifts", x => new { x.WorkerId, x.JobTaskId })
                        .Annotation("SqlServer:Clustered", false);
                    table.ForeignKey(
                        name: "FK_WorkerShifts_JobTasks_JobTaskId",
                        column: x => x.JobTaskId,
                        principalTable: "JobTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_WorkerShifts_Workers_WorkerId",
                        column: x => x.WorkerId,
                        principalTable: "Workers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_CoordinatorId",
                table: "Jobs",
                column: "CoordinatorId");

            migrationBuilder.CreateIndex(
                name: "IX_JobTasks_JobId",
                table: "JobTasks",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_Leave_WorkerId",
                table: "Leave",
                column: "WorkerId");

            migrationBuilder.CreateIndex(
                name: "IX_ResourceOutOfService_ResourceId",
                table: "ResourceOutOfService",
                column: "ResourceId");

            migrationBuilder.CreateIndex(
                name: "IX_ResourceShifts_ResourceId",
                table: "ResourceShifts",
                column: "ResourceId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkerCrews_WorkerId",
                table: "WorkerCrews",
                column: "WorkerId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkerRoles_WorkerId",
                table: "WorkerRoles",
                column: "WorkerId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkerShifts_JobTaskId",
                table: "WorkerShifts",
                column: "JobTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkerTraining_TrainingId",
                table: "WorkerTraining",
                column: "TrainingId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Leave");

            migrationBuilder.DropTable(
                name: "ResourceOutOfService");

            migrationBuilder.DropTable(
                name: "ResourceShifts");

            migrationBuilder.DropTable(
                name: "WorkerCrews");

            migrationBuilder.DropTable(
                name: "WorkerRoles");

            migrationBuilder.DropTable(
                name: "WorkerShifts");

            migrationBuilder.DropTable(
                name: "WorkerTraining");

            migrationBuilder.DropTable(
                name: "Resources");

            migrationBuilder.DropTable(
                name: "Crews");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "JobTasks");

            migrationBuilder.DropTable(
                name: "Training");

            migrationBuilder.DropTable(
                name: "Workers");

            migrationBuilder.DropTable(
                name: "Jobs");

            migrationBuilder.DropTable(
                name: "Coordinators");
        }
    }
}
