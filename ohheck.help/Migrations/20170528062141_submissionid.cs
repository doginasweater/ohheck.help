using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ohheck.help.Migrations
{
    public partial class submissionid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Choices_Submissions_Submissionid",
                table: "Choices");

            migrationBuilder.RenameColumn(
                name: "Submissionid",
                table: "Choices",
                newName: "submissionid");

            migrationBuilder.RenameIndex(
                name: "IX_Choices_Submissionid",
                table: "Choices",
                newName: "IX_Choices_submissionid");

            migrationBuilder.AlterColumn<int>(
                name: "submissionid",
                table: "Choices",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Choices_Submissions_submissionid",
                table: "Choices",
                column: "submissionid",
                principalTable: "Submissions",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Choices_Submissions_submissionid",
                table: "Choices");

            migrationBuilder.RenameColumn(
                name: "submissionid",
                table: "Choices",
                newName: "Submissionid");

            migrationBuilder.RenameIndex(
                name: "IX_Choices_submissionid",
                table: "Choices",
                newName: "IX_Choices_Submissionid");

            migrationBuilder.AlterColumn<int>(
                name: "Submissionid",
                table: "Choices",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Choices_Submissions_Submissionid",
                table: "Choices",
                column: "Submissionid",
                principalTable: "Submissions",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
