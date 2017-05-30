using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ohheck.help.Migrations
{
    public partial class surveychange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Submissions_Surveys_surveyid",
                table: "Submissions");

            migrationBuilder.AlterColumn<int>(
                name: "surveyid",
                table: "Submissions",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Submissions_Surveys_surveyid",
                table: "Submissions",
                column: "surveyid",
                principalTable: "Surveys",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Submissions_Surveys_surveyid",
                table: "Submissions");

            migrationBuilder.AlterColumn<int>(
                name: "surveyid",
                table: "Submissions",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Submissions_Surveys_surveyid",
                table: "Submissions",
                column: "surveyid",
                principalTable: "Surveys",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
