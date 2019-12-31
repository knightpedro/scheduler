﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Scheduler.Persistence;

namespace Scheduler.Persistence.Migrations
{
    [DbContext(typeof(SchedulerDbContext))]
    [Migration("20191231083210_Deletes")]
    partial class Deletes
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Scheduler.Domain.Entities.Coordinator", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(254)")
                        .HasMaxLength(254);

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("Coordinators");
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.Crew", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.HasKey("Id");

                    b.ToTable("Crews");
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.Job", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CoordinatorId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("DateReceived")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DateScheduled")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(160)")
                        .HasMaxLength(160);

                    b.Property<bool>("IsComplete")
                        .HasColumnType("bit");

                    b.Property<string>("JobNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(10)")
                        .HasMaxLength(10);

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("nvarchar(30)")
                        .HasMaxLength(30);

                    b.HasKey("Id");

                    b.HasIndex("CoordinatorId");

                    b.ToTable("Jobs");
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.JobTask", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(160)")
                        .HasMaxLength(160);

                    b.Property<int>("JobId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("JobId");

                    b.ToTable("JobTasks");
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.Leave", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("LeaveCategory")
                        .IsRequired()
                        .HasColumnType("nvarchar(20)")
                        .HasMaxLength(20);

                    b.Property<int>("WorkerId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("WorkerId");

                    b.ToTable("Leave");
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.Resource", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(30)")
                        .HasMaxLength(30);

                    b.HasKey("Id");

                    b.ToTable("Resources");
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.ResourceOutOfService", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(120)")
                        .HasMaxLength(120);

                    b.Property<string>("Reason")
                        .IsRequired()
                        .HasColumnType("nvarchar(30)")
                        .HasMaxLength(30);

                    b.Property<int>("ResourceId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ResourceId");

                    b.ToTable("ResourceOutOfService");
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.ResourceShift", b =>
                {
                    b.Property<int>("JobTaskId")
                        .HasColumnType("int");

                    b.Property<int>("ResourceId")
                        .HasColumnType("int");

                    b.HasKey("JobTaskId", "ResourceId")
                        .HasAnnotation("SqlServer:Clustered", false);

                    b.HasIndex("ResourceId");

                    b.ToTable("ResourceShifts");
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("RoleType")
                        .IsRequired()
                        .HasColumnType("nvarchar(30)")
                        .HasMaxLength(30);

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.Training", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(30)")
                        .HasMaxLength(30);

                    b.Property<string>("Location")
                        .HasColumnType("nvarchar(30)")
                        .HasMaxLength(30);

                    b.HasKey("Id");

                    b.ToTable("Training");
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.Worker", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("Workers");
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.WorkerCrew", b =>
                {
                    b.Property<int>("CrewId")
                        .HasColumnType("int");

                    b.Property<int>("WorkerId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("JoinedCrew")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("LeftCrew")
                        .HasColumnType("datetime2");

                    b.HasKey("CrewId", "WorkerId")
                        .HasAnnotation("SqlServer:Clustered", false);

                    b.HasIndex("WorkerId");

                    b.ToTable("WorkerCrews");
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.WorkerRole", b =>
                {
                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.Property<int>("WorkerId")
                        .HasColumnType("int");

                    b.Property<DateTime?>("EndedRole")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("StartedRole")
                        .HasColumnType("datetime2");

                    b.HasKey("RoleId", "WorkerId")
                        .HasAnnotation("SqlServer:Clustered", false);

                    b.HasIndex("WorkerId");

                    b.ToTable("WorkerRoles");
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.WorkerShift", b =>
                {
                    b.Property<int>("WorkerId")
                        .HasColumnType("int");

                    b.Property<int>("JobTaskId")
                        .HasColumnType("int");

                    b.HasKey("WorkerId", "JobTaskId")
                        .HasAnnotation("SqlServer:Clustered", false);

                    b.HasIndex("JobTaskId");

                    b.ToTable("WorkerShifts");
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.WorkerTraining", b =>
                {
                    b.Property<int>("WorkerId")
                        .HasColumnType("int");

                    b.Property<int>("TrainingId")
                        .HasColumnType("int");

                    b.HasKey("WorkerId", "TrainingId")
                        .HasAnnotation("SqlServer:Clustered", false);

                    b.HasIndex("TrainingId");

                    b.ToTable("WorkerTraining");
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.Crew", b =>
                {
                    b.OwnsOne("Scheduler.Domain.ValueObjects.DateTimeRange", "ActivePeriod", b1 =>
                        {
                            b1.Property<int>("CrewId")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int")
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<DateTime>("End")
                                .HasColumnName("DateDisbanded")
                                .HasColumnType("datetime2");

                            b1.Property<DateTime>("Start")
                                .HasColumnName("DateFormed")
                                .HasColumnType("datetime2");

                            b1.HasKey("CrewId");

                            b1.ToTable("Crews");

                            b1.WithOwner()
                                .HasForeignKey("CrewId");
                        });
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.Job", b =>
                {
                    b.HasOne("Scheduler.Domain.Entities.Coordinator", "Coordinator")
                        .WithMany("Jobs")
                        .HasForeignKey("CoordinatorId");
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.JobTask", b =>
                {
                    b.HasOne("Scheduler.Domain.Entities.Job", "Job")
                        .WithMany("JobTasks")
                        .HasForeignKey("JobId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.OwnsOne("Scheduler.Domain.ValueObjects.DateTimeRange", "TaskPeriod", b1 =>
                        {
                            b1.Property<int>("JobTaskId")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int")
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<DateTime>("End")
                                .HasColumnName("End")
                                .HasColumnType("datetime2");

                            b1.Property<DateTime>("Start")
                                .HasColumnName("Start")
                                .HasColumnType("datetime2");

                            b1.HasKey("JobTaskId");

                            b1.ToTable("JobTasks");

                            b1.WithOwner()
                                .HasForeignKey("JobTaskId");
                        });
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.Leave", b =>
                {
                    b.HasOne("Scheduler.Domain.Entities.Worker", "Worker")
                        .WithMany("Leave")
                        .HasForeignKey("WorkerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.OwnsOne("Scheduler.Domain.ValueObjects.DateTimeRange", "LeavePeriod", b1 =>
                        {
                            b1.Property<int>("LeaveId")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int")
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<DateTime>("End")
                                .HasColumnName("End")
                                .HasColumnType("datetime2");

                            b1.Property<DateTime>("Start")
                                .HasColumnName("Start")
                                .HasColumnType("datetime2");

                            b1.HasKey("LeaveId");

                            b1.ToTable("Leave");

                            b1.WithOwner()
                                .HasForeignKey("LeaveId");
                        });
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.ResourceOutOfService", b =>
                {
                    b.HasOne("Scheduler.Domain.Entities.Resource", "Resource")
                        .WithMany("OutOfServices")
                        .HasForeignKey("ResourceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.OwnsOne("Scheduler.Domain.ValueObjects.DateTimeRange", "Period", b1 =>
                        {
                            b1.Property<int>("ResourceOutOfServiceId")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int")
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<DateTime>("End")
                                .HasColumnName("End")
                                .HasColumnType("datetime2");

                            b1.Property<DateTime>("Start")
                                .HasColumnName("Start")
                                .HasColumnType("datetime2");

                            b1.HasKey("ResourceOutOfServiceId");

                            b1.ToTable("ResourceOutOfService");

                            b1.WithOwner()
                                .HasForeignKey("ResourceOutOfServiceId");
                        });
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.ResourceShift", b =>
                {
                    b.HasOne("Scheduler.Domain.Entities.JobTask", "JobTask")
                        .WithMany("ResourceShifts")
                        .HasForeignKey("JobTaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Scheduler.Domain.Entities.Resource", "Resource")
                        .WithMany("ResourceShifts")
                        .HasForeignKey("ResourceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.Training", b =>
                {
                    b.OwnsOne("Scheduler.Domain.ValueObjects.DateTimeRange", "TrainingPeriod", b1 =>
                        {
                            b1.Property<int>("TrainingId")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int")
                                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                            b1.Property<DateTime>("End")
                                .HasColumnName("End")
                                .HasColumnType("datetime2");

                            b1.Property<DateTime>("Start")
                                .HasColumnName("Start")
                                .HasColumnType("datetime2");

                            b1.HasKey("TrainingId");

                            b1.ToTable("Training");

                            b1.WithOwner()
                                .HasForeignKey("TrainingId");
                        });
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.WorkerCrew", b =>
                {
                    b.HasOne("Scheduler.Domain.Entities.Crew", "Crew")
                        .WithMany("WorkerCrews")
                        .HasForeignKey("CrewId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Scheduler.Domain.Entities.Worker", "Worker")
                        .WithMany("WorkerCrews")
                        .HasForeignKey("WorkerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.WorkerRole", b =>
                {
                    b.HasOne("Scheduler.Domain.Entities.Role", "Role")
                        .WithMany("WorkerRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Scheduler.Domain.Entities.Worker", "Worker")
                        .WithMany("WorkerRoles")
                        .HasForeignKey("WorkerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.WorkerShift", b =>
                {
                    b.HasOne("Scheduler.Domain.Entities.JobTask", "JobTask")
                        .WithMany("WorkerShifts")
                        .HasForeignKey("JobTaskId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Scheduler.Domain.Entities.Worker", "Worker")
                        .WithMany("WorkerShifts")
                        .HasForeignKey("WorkerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Scheduler.Domain.Entities.WorkerTraining", b =>
                {
                    b.HasOne("Scheduler.Domain.Entities.Training", "Training")
                        .WithMany("WorkerTraining")
                        .HasForeignKey("TrainingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Scheduler.Domain.Entities.Worker", "Worker")
                        .WithMany("WorkerTraining")
                        .HasForeignKey("WorkerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
