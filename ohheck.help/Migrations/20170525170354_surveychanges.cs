using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ohheck.help.Migrations
{
    public partial class surveychanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CardResponses");

            migrationBuilder.DropTable(
                name: "SurveyCards");

            migrationBuilder.DropTable(
                name: "Responses");

            migrationBuilder.AddColumn<bool>(
                name: "active",
                table: "Surveys",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "title",
                table: "Surveys",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    created = table.Column<DateTime>(nullable: false),
                    createdby = table.Column<string>(nullable: true),
                    modified = table.Column<DateTime>(nullable: false),
                    modifiedby = table.Column<string>(nullable: true),
                    sortorder = table.Column<int>(nullable: false),
                    surveyid = table.Column<int>(nullable: true),
                    text = table.Column<string>(nullable: true),
                    type = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.id);
                    table.ForeignKey(
                        name: "FK_Questions_Surveys_surveyid",
                        column: x => x.surveyid,
                        principalTable: "Surveys",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Submissions",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    created = table.Column<DateTime>(nullable: false),
                    createdby = table.Column<string>(nullable: true),
                    modified = table.Column<DateTime>(nullable: false),
                    modifiedby = table.Column<string>(nullable: true),
                    submitter = table.Column<string>(nullable: true),
                    surveyid = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Submissions", x => x.id);
                    table.ForeignKey(
                        name: "FK_Submissions_Surveys_surveyid",
                        column: x => x.surveyid,
                        principalTable: "Surveys",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Answers",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    created = table.Column<DateTime>(nullable: false),
                    createdby = table.Column<string>(nullable: true),
                    modified = table.Column<DateTime>(nullable: false),
                    modifiedby = table.Column<string>(nullable: true),
                    questionid = table.Column<int>(nullable: true),
                    text = table.Column<string>(nullable: true),
                    value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answers", x => x.id);
                    table.ForeignKey(
                        name: "FK_Answers_Questions_questionid",
                        column: x => x.questionid,
                        principalTable: "Questions",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AnswerCards",
                columns: table => new
                {
                    answerid = table.Column<int>(nullable: false),
                    cardid = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnswerCards", x => new { x.answerid, x.cardid });
                    table.ForeignKey(
                        name: "FK_AnswerCards_Answers_answerid",
                        column: x => x.answerid,
                        principalTable: "Answers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AnswerCards_Cards_cardid",
                        column: x => x.cardid,
                        principalTable: "Cards",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Choices",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Submissionid = table.Column<int>(nullable: true),
                    answerid = table.Column<int>(nullable: true),
                    created = table.Column<DateTime>(nullable: false),
                    createdby = table.Column<string>(nullable: true),
                    modified = table.Column<DateTime>(nullable: false),
                    modifiedby = table.Column<string>(nullable: true),
                    questionid = table.Column<int>(nullable: true),
                    text = table.Column<string>(nullable: true),
                    type = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Choices", x => x.id);
                    table.ForeignKey(
                        name: "FK_Choices_Submissions_Submissionid",
                        column: x => x.Submissionid,
                        principalTable: "Submissions",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Choices_Answers_answerid",
                        column: x => x.answerid,
                        principalTable: "Answers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Choices_Questions_questionid",
                        column: x => x.questionid,
                        principalTable: "Questions",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CardChoices",
                columns: table => new
                {
                    cardid = table.Column<int>(nullable: false),
                    choiceid = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CardChoices", x => new { x.cardid, x.choiceid });
                    table.ForeignKey(
                        name: "FK_CardChoices_Cards_cardid",
                        column: x => x.cardid,
                        principalTable: "Cards",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CardChoices_Choices_choiceid",
                        column: x => x.choiceid,
                        principalTable: "Choices",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChoiceAnswers",
                columns: table => new
                {
                    answerid = table.Column<int>(nullable: false),
                    choiceid = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChoiceAnswers", x => new { x.answerid, x.choiceid });
                    table.ForeignKey(
                        name: "FK_ChoiceAnswers_Answers_answerid",
                        column: x => x.answerid,
                        principalTable: "Answers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChoiceAnswers_Choices_choiceid",
                        column: x => x.choiceid,
                        principalTable: "Choices",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Answers_questionid",
                table: "Answers",
                column: "questionid");

            migrationBuilder.CreateIndex(
                name: "IX_AnswerCards_cardid",
                table: "AnswerCards",
                column: "cardid");

            migrationBuilder.CreateIndex(
                name: "IX_CardChoices_choiceid",
                table: "CardChoices",
                column: "choiceid");

            migrationBuilder.CreateIndex(
                name: "IX_Choices_Submissionid",
                table: "Choices",
                column: "Submissionid");

            migrationBuilder.CreateIndex(
                name: "IX_Choices_answerid",
                table: "Choices",
                column: "answerid");

            migrationBuilder.CreateIndex(
                name: "IX_Choices_questionid",
                table: "Choices",
                column: "questionid");

            migrationBuilder.CreateIndex(
                name: "IX_ChoiceAnswers_choiceid",
                table: "ChoiceAnswers",
                column: "choiceid");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_surveyid",
                table: "Questions",
                column: "surveyid");

            migrationBuilder.CreateIndex(
                name: "IX_Submissions_surveyid",
                table: "Submissions",
                column: "surveyid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AnswerCards");

            migrationBuilder.DropTable(
                name: "CardChoices");

            migrationBuilder.DropTable(
                name: "ChoiceAnswers");

            migrationBuilder.DropTable(
                name: "Choices");

            migrationBuilder.DropTable(
                name: "Submissions");

            migrationBuilder.DropTable(
                name: "Answers");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropColumn(
                name: "active",
                table: "Surveys");

            migrationBuilder.DropColumn(
                name: "title",
                table: "Surveys");

            migrationBuilder.CreateTable(
                name: "SurveyCards",
                columns: table => new
                {
                    cardid = table.Column<int>(nullable: false),
                    surveyid = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyCards", x => new { x.cardid, x.surveyid });
                    table.ForeignKey(
                        name: "FK_SurveyCards_Cards_cardid",
                        column: x => x.cardid,
                        principalTable: "Cards",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SurveyCards_Surveys_surveyid",
                        column: x => x.surveyid,
                        principalTable: "Surveys",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Responses",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    comments = table.Column<string>(nullable: true),
                    created = table.Column<DateTime>(nullable: false),
                    createdby = table.Column<string>(nullable: true),
                    modified = table.Column<DateTime>(nullable: false),
                    modifiedby = table.Column<string>(nullable: true),
                    nextgroup = table.Column<string>(nullable: true),
                    submitter = table.Column<string>(nullable: true),
                    surveyid = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Responses", x => x.id);
                    table.ForeignKey(
                        name: "FK_Responses_Surveys_surveyid",
                        column: x => x.surveyid,
                        principalTable: "Surveys",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CardResponses",
                columns: table => new
                {
                    cardid = table.Column<int>(nullable: false),
                    responseid = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CardResponses", x => new { x.cardid, x.responseid });
                    table.ForeignKey(
                        name: "FK_CardResponses_Cards_cardid",
                        column: x => x.cardid,
                        principalTable: "Cards",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CardResponses_Responses_responseid",
                        column: x => x.responseid,
                        principalTable: "Responses",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CardResponses_responseid",
                table: "CardResponses",
                column: "responseid");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyCards_surveyid",
                table: "SurveyCards",
                column: "surveyid");

            migrationBuilder.CreateIndex(
                name: "IX_Responses_surveyid",
                table: "Responses",
                column: "surveyid");
        }
    }
}
