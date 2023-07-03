using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dotnetapp.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdminModel",
                columns: table => new
                {
                    adminId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    password = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    username = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    mobilenumber = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    userRole = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__AdminMod__AD0500A6369B6B12", x => x.adminId);
                });

            migrationBuilder.CreateTable(
                name: "InstituteModel",
                columns: table => new
                {
                    instituteId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    instituteName = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    instituteDescription = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    instituteAddress = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    mobile = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: true),
                    email = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    ImageUrl = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Institut__AF018B2C22D06BEA", x => x.instituteId);
                });

            migrationBuilder.CreateTable(
                name: "LoginModel",
                columns: table => new
                {
                    loginId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    password = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__LoginMod__1F5EF4CFC1E14979", x => x.loginId);
                });

            migrationBuilder.CreateTable(
                name: "UserModel",
                columns: table => new
                {
                    userId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    password = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    username = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    mobilenumber = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    userRole = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__UserMode__CB9A1CFF8642E627", x => x.userId);
                });

            migrationBuilder.CreateTable(
                name: "CourseModel",
                columns: table => new
                {
                    courseId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    courseName = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true),
                    courseDescription = table.Column<string>(type: "varchar(30)", unicode: false, maxLength: 30, nullable: true),
                    courseDuration = table.Column<int>(type: "int", nullable: true),
                    courseTiming = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    instituteId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__CourseMo__2AA84FD1D486C4A8", x => x.courseId);
                    table.ForeignKey(
                        name: "FK__CourseMod__insti__300424B4",
                        column: x => x.instituteId,
                        principalTable: "InstituteModel",
                        principalColumn: "instituteId");
                });

            migrationBuilder.CreateTable(
                name: "RatingModel",
                columns: table => new
                {
                    ratingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Rating = table.Column<int>(type: "int", nullable: true),
                    Comments = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    instituteId = table.Column<int>(type: "int", nullable: true),
                    userId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__RatingMo__2D290CA9E885F9D3", x => x.ratingId);
                    table.ForeignKey(
                        name: "FK__RatingMod__insti__36B12243",
                        column: x => x.instituteId,
                        principalTable: "InstituteModel",
                        principalColumn: "instituteId");
                    table.ForeignKey(
                        name: "FK__RatingMod__userI__37A5467C",
                        column: x => x.userId,
                        principalTable: "UserModel",
                        principalColumn: "userId");
                });

            migrationBuilder.CreateTable(
                name: "ProgressModel",
                columns: table => new
                {
                    progressId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    progresspercentage = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Timetamp = table.Column<DateTime>(type: "datetime", nullable: true),
                    userId = table.Column<int>(type: "int", nullable: true),
                    courseId = table.Column<int>(type: "int", nullable: true),
                    Status = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Progress__0F2BDC7DD440057D", x => x.progressId);
                    table.ForeignKey(
                        name: "FK__ProgressM__cours__4222D4EF",
                        column: x => x.courseId,
                        principalTable: "CourseModel",
                        principalColumn: "courseId");
                    table.ForeignKey(
                        name: "FK__ProgressM__userI__412EB0B6",
                        column: x => x.userId,
                        principalTable: "UserModel",
                        principalColumn: "userId");
                });

            migrationBuilder.CreateTable(
                name: "StudentModel",
                columns: table => new
                {
                    studentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    firstName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    lastName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    Mobile = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: true),
                    Age = table.Column<int>(type: "int", nullable: true),
                    Gender = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: true),
                    HouseNo = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    streetName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    areaName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    State = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    Pincode = table.Column<int>(type: "int", nullable: true),
                    Nationality = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    courseId = table.Column<int>(type: "int", nullable: true),
                    fatherName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    motherName = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    Email = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    alternateMobile = table.Column<string>(type: "varchar(10)", unicode: false, maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__StudentM__4D11D63C02C9D51F", x => x.studentId);
                    table.ForeignKey(
                        name: "FK__StudentMo__cours__33D4B598",
                        column: x => x.courseId,
                        principalTable: "CourseModel",
                        principalColumn: "courseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AdmissionModel",
                columns: table => new
                {
                    admissionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    studentId = table.Column<int>(type: "int", nullable: true),
                    courseId = table.Column<int>(type: "int", nullable: true),
                    instituteId = table.Column<int>(type: "int", nullable: true),
                    userId = table.Column<int>(type: "int", nullable: true),
                    DateOfJoining = table.Column<DateTime>(type: "date", nullable: true, defaultValueSql: "(getdate())"),
                    EndDate = table.Column<DateTime>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Admissio__705A82597997CD82", x => x.admissionId);
                    table.ForeignKey(
                        name: "FK__Admission__cours__46E78A0C",
                        column: x => x.courseId,
                        principalTable: "CourseModel",
                        principalColumn: "courseId");
                    table.ForeignKey(
                        name: "FK__Admission__insti__47DBAE45",
                        column: x => x.instituteId,
                        principalTable: "InstituteModel",
                        principalColumn: "instituteId");
                    table.ForeignKey(
                        name: "FK__Admission__stude__45F365D3",
                        column: x => x.studentId,
                        principalTable: "StudentModel",
                        principalColumn: "studentId");
                    table.ForeignKey(
                        name: "FK__Admission__userI__48CFD27E",
                        column: x => x.userId,
                        principalTable: "UserModel",
                        principalColumn: "userId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionModel_courseId",
                table: "AdmissionModel",
                column: "courseId");

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionModel_instituteId",
                table: "AdmissionModel",
                column: "instituteId");

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionModel_studentId",
                table: "AdmissionModel",
                column: "studentId");

            migrationBuilder.CreateIndex(
                name: "IX_AdmissionModel_userId",
                table: "AdmissionModel",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseModel_instituteId",
                table: "CourseModel",
                column: "instituteId");

            migrationBuilder.CreateIndex(
                name: "IX_ProgressModel_courseId",
                table: "ProgressModel",
                column: "courseId");

            migrationBuilder.CreateIndex(
                name: "IX_ProgressModel_userId",
                table: "ProgressModel",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_RatingModel_instituteId",
                table: "RatingModel",
                column: "instituteId");

            migrationBuilder.CreateIndex(
                name: "IX_RatingModel_userId",
                table: "RatingModel",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentModel_courseId",
                table: "StudentModel",
                column: "courseId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdminModel");

            migrationBuilder.DropTable(
                name: "AdmissionModel");

            migrationBuilder.DropTable(
                name: "LoginModel");

            migrationBuilder.DropTable(
                name: "ProgressModel");

            migrationBuilder.DropTable(
                name: "RatingModel");

            migrationBuilder.DropTable(
                name: "StudentModel");

            migrationBuilder.DropTable(
                name: "UserModel");

            migrationBuilder.DropTable(
                name: "CourseModel");

            migrationBuilder.DropTable(
                name: "InstituteModel");
        }
    }
}
