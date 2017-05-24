using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ohheck.help.Migrations
{
    public partial class initialpostgres : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    created = table.Column<DateTime>(nullable: false),
                    createdby = table.Column<string>(nullable: true),
                    modified = table.Column<DateTime>(nullable: false),
                    modifiedby = table.Column<string>(nullable: true),
                    name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Surveys",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    comments = table.Column<string>(nullable: true),
                    created = table.Column<DateTime>(nullable: false),
                    createdby = table.Column<string>(nullable: true),
                    modified = table.Column<DateTime>(nullable: false),
                    modifiedby = table.Column<string>(nullable: true),
                    name = table.Column<string>(nullable: true),
                    slug = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Surveys", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Subunits",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    Groupid = table.Column<int>(nullable: true),
                    created = table.Column<DateTime>(nullable: false),
                    createdby = table.Column<string>(nullable: true),
                    modified = table.Column<DateTime>(nullable: false),
                    modifiedby = table.Column<string>(nullable: true),
                    name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subunits", x => x.id);
                    table.ForeignKey(
                        name: "FK_Subunits_Groups_Groupid",
                        column: x => x.Groupid,
                        principalTable: "Groups",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
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
                name: "Idols",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    created = table.Column<DateTime>(nullable: false),
                    createdby = table.Column<string>(nullable: true),
                    groupid = table.Column<int>(nullable: true),
                    modified = table.Column<DateTime>(nullable: false),
                    modifiedby = table.Column<string>(nullable: true),
                    name = table.Column<string>(nullable: true),
                    subunitid = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Idols", x => x.id);
                    table.ForeignKey(
                        name: "FK_Idols_Groups_groupid",
                        column: x => x.groupid,
                        principalTable: "Groups",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Idols_Subunits_subunitid",
                        column: x => x.subunitid,
                        principalTable: "Subunits",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Cards",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    apiid = table.Column<int>(nullable: false),
                    attribute = table.Column<int>(nullable: false),
                    created = table.Column<DateTime>(nullable: false),
                    createdby = table.Column<string>(nullable: true),
                    gameid = table.Column<int>(nullable: false),
                    idolid = table.Column<int>(nullable: true),
                    imageurl = table.Column<string>(nullable: true),
                    isidol = table.Column<bool>(nullable: false),
                    ispromo = table.Column<bool>(nullable: false),
                    modified = table.Column<DateTime>(nullable: false),
                    modifiedby = table.Column<string>(nullable: true),
                    rarity = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cards", x => x.id);
                    table.ForeignKey(
                        name: "FK_Cards_Idols_idolid",
                        column: x => x.idolid,
                        principalTable: "Idols",
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

            migrationBuilder.CreateIndex(
                name: "IX_Cards_idolid",
                table: "Cards",
                column: "idolid");

            migrationBuilder.CreateIndex(
                name: "IX_CardResponses_responseid",
                table: "CardResponses",
                column: "responseid");

            migrationBuilder.CreateIndex(
                name: "IX_Idols_groupid",
                table: "Idols",
                column: "groupid");

            migrationBuilder.CreateIndex(
                name: "IX_Idols_subunitid",
                table: "Idols",
                column: "subunitid");

            migrationBuilder.CreateIndex(
                name: "IX_Subunits_Groupid",
                table: "Subunits",
                column: "Groupid");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyCards_surveyid",
                table: "SurveyCards",
                column: "surveyid");

            migrationBuilder.CreateIndex(
                name: "IX_Responses_surveyid",
                table: "Responses",
                column: "surveyid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CardResponses");

            migrationBuilder.DropTable(
                name: "SurveyCards");

            migrationBuilder.DropTable(
                name: "Responses");

            migrationBuilder.DropTable(
                name: "Cards");

            migrationBuilder.DropTable(
                name: "Surveys");

            migrationBuilder.DropTable(
                name: "Idols");

            migrationBuilder.DropTable(
                name: "Subunits");

            migrationBuilder.DropTable(
                name: "Groups");
        }
    }
}
