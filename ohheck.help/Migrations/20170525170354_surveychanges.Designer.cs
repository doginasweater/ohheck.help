using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using ohheck.help.Models.Data;

namespace ohheck.help.Migrations
{
    [DbContext(typeof(HeckingContext))]
    [Migration("20170525170354_surveychanges")]
    partial class surveychanges
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "1.1.1");

            modelBuilder.Entity("ohheck.help.Models.Data.Answer", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("created");

                    b.Property<string>("createdby");

                    b.Property<DateTime>("modified");

                    b.Property<string>("modifiedby");

                    b.Property<int?>("questionid");

                    b.Property<string>("text");

                    b.Property<string>("value");

                    b.HasKey("id");

                    b.HasIndex("questionid");

                    b.ToTable("Answers");
                });

            modelBuilder.Entity("ohheck.help.Models.Data.AnswerCard", b =>
                {
                    b.Property<int>("answerid");

                    b.Property<int>("cardid");

                    b.HasKey("answerid", "cardid");

                    b.HasIndex("cardid");

                    b.ToTable("AnswerCards");
                });

            modelBuilder.Entity("ohheck.help.Models.Data.Card", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("apiid");

                    b.Property<int>("attribute");

                    b.Property<DateTime>("created");

                    b.Property<string>("createdby");

                    b.Property<int>("gameid");

                    b.Property<int?>("idolid");

                    b.Property<string>("imageurl");

                    b.Property<bool>("isidol");

                    b.Property<bool>("ispromo");

                    b.Property<DateTime>("modified");

                    b.Property<string>("modifiedby");

                    b.Property<int>("rarity");

                    b.HasKey("id");

                    b.HasIndex("idolid");

                    b.ToTable("Cards");
                });

            modelBuilder.Entity("ohheck.help.Models.Data.CardChoice", b =>
                {
                    b.Property<int>("cardid");

                    b.Property<int>("choiceid");

                    b.HasKey("cardid", "choiceid");

                    b.HasIndex("choiceid");

                    b.ToTable("CardChoices");
                });

            modelBuilder.Entity("ohheck.help.Models.Data.Choice", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("Submissionid");

                    b.Property<int?>("answerid");

                    b.Property<DateTime>("created");

                    b.Property<string>("createdby");

                    b.Property<DateTime>("modified");

                    b.Property<string>("modifiedby");

                    b.Property<int?>("questionid");

                    b.Property<string>("text");

                    b.Property<int>("type");

                    b.HasKey("id");

                    b.HasIndex("Submissionid");

                    b.HasIndex("answerid");

                    b.HasIndex("questionid");

                    b.ToTable("Choices");
                });

            modelBuilder.Entity("ohheck.help.Models.Data.ChoiceAnswer", b =>
                {
                    b.Property<int>("answerid");

                    b.Property<int>("choiceid");

                    b.HasKey("answerid", "choiceid");

                    b.HasIndex("choiceid");

                    b.ToTable("ChoiceAnswers");
                });

            modelBuilder.Entity("ohheck.help.Models.Data.Group", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("created");

                    b.Property<string>("createdby");

                    b.Property<DateTime>("modified");

                    b.Property<string>("modifiedby");

                    b.Property<string>("name");

                    b.HasKey("id");

                    b.ToTable("Groups");
                });

            modelBuilder.Entity("ohheck.help.Models.Data.Idol", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("created");

                    b.Property<string>("createdby");

                    b.Property<int?>("groupid");

                    b.Property<DateTime>("modified");

                    b.Property<string>("modifiedby");

                    b.Property<string>("name");

                    b.Property<int?>("subunitid");

                    b.HasKey("id");

                    b.HasIndex("groupid");

                    b.HasIndex("subunitid");

                    b.ToTable("Idols");
                });

            modelBuilder.Entity("ohheck.help.Models.Data.Question", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("created");

                    b.Property<string>("createdby");

                    b.Property<DateTime>("modified");

                    b.Property<string>("modifiedby");

                    b.Property<int>("sortorder");

                    b.Property<int?>("surveyid");

                    b.Property<string>("text");

                    b.Property<int>("type");

                    b.HasKey("id");

                    b.HasIndex("surveyid");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("ohheck.help.Models.Data.Submission", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("created");

                    b.Property<string>("createdby");

                    b.Property<DateTime>("modified");

                    b.Property<string>("modifiedby");

                    b.Property<string>("submitter");

                    b.Property<int?>("surveyid");

                    b.HasKey("id");

                    b.HasIndex("surveyid");

                    b.ToTable("Submissions");
                });

            modelBuilder.Entity("ohheck.help.Models.Data.Subunit", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("Groupid");

                    b.Property<DateTime>("created");

                    b.Property<string>("createdby");

                    b.Property<DateTime>("modified");

                    b.Property<string>("modifiedby");

                    b.Property<string>("name");

                    b.HasKey("id");

                    b.HasIndex("Groupid");

                    b.ToTable("Subunits");
                });

            modelBuilder.Entity("ohheck.help.Models.Data.Survey", b =>
                {
                    b.Property<int>("id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("active");

                    b.Property<string>("comments");

                    b.Property<DateTime>("created");

                    b.Property<string>("createdby");

                    b.Property<DateTime>("modified");

                    b.Property<string>("modifiedby");

                    b.Property<string>("name");

                    b.Property<string>("slug");

                    b.Property<string>("title");

                    b.HasKey("id");

                    b.ToTable("Surveys");
                });

            modelBuilder.Entity("ohheck.help.Models.Data.Answer", b =>
                {
                    b.HasOne("ohheck.help.Models.Data.Question", "question")
                        .WithMany("answers")
                        .HasForeignKey("questionid");
                });

            modelBuilder.Entity("ohheck.help.Models.Data.AnswerCard", b =>
                {
                    b.HasOne("ohheck.help.Models.Data.Answer", "answer")
                        .WithMany("answercards")
                        .HasForeignKey("answerid")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ohheck.help.Models.Data.Card", "card")
                        .WithMany("answercards")
                        .HasForeignKey("cardid")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ohheck.help.Models.Data.Card", b =>
                {
                    b.HasOne("ohheck.help.Models.Data.Idol", "idol")
                        .WithMany("cards")
                        .HasForeignKey("idolid");
                });

            modelBuilder.Entity("ohheck.help.Models.Data.CardChoice", b =>
                {
                    b.HasOne("ohheck.help.Models.Data.Card", "card")
                        .WithMany("cardchoices")
                        .HasForeignKey("cardid")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ohheck.help.Models.Data.Choice", "choice")
                        .WithMany("cardchoices")
                        .HasForeignKey("choiceid")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ohheck.help.Models.Data.Choice", b =>
                {
                    b.HasOne("ohheck.help.Models.Data.Submission")
                        .WithMany("answers")
                        .HasForeignKey("Submissionid");

                    b.HasOne("ohheck.help.Models.Data.Answer", "answer")
                        .WithMany()
                        .HasForeignKey("answerid");

                    b.HasOne("ohheck.help.Models.Data.Question", "question")
                        .WithMany()
                        .HasForeignKey("questionid");
                });

            modelBuilder.Entity("ohheck.help.Models.Data.ChoiceAnswer", b =>
                {
                    b.HasOne("ohheck.help.Models.Data.Answer", "answer")
                        .WithMany("choiceanswers")
                        .HasForeignKey("answerid")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ohheck.help.Models.Data.Choice", "choice")
                        .WithMany("choiceanswers")
                        .HasForeignKey("choiceid")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ohheck.help.Models.Data.Idol", b =>
                {
                    b.HasOne("ohheck.help.Models.Data.Group", "group")
                        .WithMany("idols")
                        .HasForeignKey("groupid");

                    b.HasOne("ohheck.help.Models.Data.Subunit", "subunit")
                        .WithMany("idols")
                        .HasForeignKey("subunitid");
                });

            modelBuilder.Entity("ohheck.help.Models.Data.Question", b =>
                {
                    b.HasOne("ohheck.help.Models.Data.Survey", "survey")
                        .WithMany("questions")
                        .HasForeignKey("surveyid");
                });

            modelBuilder.Entity("ohheck.help.Models.Data.Submission", b =>
                {
                    b.HasOne("ohheck.help.Models.Data.Survey", "survey")
                        .WithMany("responses")
                        .HasForeignKey("surveyid");
                });

            modelBuilder.Entity("ohheck.help.Models.Data.Subunit", b =>
                {
                    b.HasOne("ohheck.help.Models.Data.Group")
                        .WithMany("subunits")
                        .HasForeignKey("Groupid");
                });
        }
    }
}
