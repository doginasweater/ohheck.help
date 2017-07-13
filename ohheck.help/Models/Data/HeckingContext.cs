using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ohheck.help.Models.Data
{
    public class HeckingContext : DbContext
    {
        public HeckingContext(DbContextOptions<HeckingContext> options)
          : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AnswerCard>()
                .HasKey(x => new { x.answerid, x.cardid });

            builder.Entity<AnswerCard>()
                .HasOne(x => x.answer)
                .WithMany(x => x.answercards)
                .HasForeignKey(x => x.answerid);

            builder.Entity<AnswerCard>()
                .HasOne(x => x.card)
                .WithMany(x => x.answercards)
                .HasForeignKey(x => x.cardid);

            builder.Entity<CardChoice>()
                .HasKey(x => new { x.cardid, x.choiceid });

            builder.Entity<CardChoice>()
                .HasOne(x => x.card)
                .WithMany(x => x.cardchoices)
                .HasForeignKey(x => x.cardid);

            builder.Entity<CardChoice>()
                .HasOne(x => x.choice)
                .WithMany(x => x.cardchoices)
                .HasForeignKey(x => x.choiceid);

            builder.Entity<ChoiceAnswer>()
                .HasKey(x => new { x.answerid, x.choiceid });

            builder.Entity<ChoiceAnswer>()
                .HasOne(x => x.choice)
                .WithMany(x => x.choiceanswers)
                .HasForeignKey(x => x.choiceid);

            builder.Entity<ChoiceAnswer>()
                .HasOne(x => x.answer)
                .WithMany(x => x.choiceanswers)
                .HasForeignKey(x => x.answerid);
        }

        public virtual DbSet<Answer> Answers { get; set; }
        public virtual DbSet<AnswerCard> AnswerCards { get; set; }
        public virtual DbSet<Card> Cards { get; set; }
        public virtual DbSet<CardChoice> CardChoices { get; set; }
        public virtual DbSet<Choice> Choices { get; set; }
        public virtual DbSet<ChoiceAnswer> ChoiceAnswers { get; set; }
        public virtual DbSet<Group> Groups { get; set; }
        public virtual DbSet<Idol> Idols { get; set; }
        public virtual DbSet<NotificationAction> NotificationActions { get; set; }
        public virtual DbSet<Notification> Notifications { get; set; }
        public virtual DbSet<Question> Questions { get; set; }
        public virtual DbSet<Setting> Settings { get; set; }
        public virtual DbSet<Submission> Submissions { get; set; }
        public virtual DbSet<Subunit> Subunits { get; set; }
        public virtual DbSet<Survey> Surveys { get; set; }

        public string user { get; set; } = "anonymous";

        public override int SaveChanges()
        {
            var changeSet = ChangeTracker.Entries<Common>();

            if (changeSet != null)
            {
                foreach (var entry in changeSet.Where(x => x.State != EntityState.Unchanged))
                {
                    if (entry.State == EntityState.Added)
                    {
                        entry.Entity.created = DateTime.Now;
                        entry.Entity.createdby = user;
                    }

                    entry.Entity.modified = DateTime.Now;
                    entry.Entity.modifiedby = user;
                }
            }

            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            var changeSet = ChangeTracker.Entries<Common>();

            if (changeSet != null)
            {
                foreach (var entry in changeSet.Where(x => x.State != EntityState.Unchanged))
                {
                    if (entry.State == EntityState.Added)
                    {
                        entry.Entity.created = DateTime.Now;
                        entry.Entity.createdby = user;
                    }

                    entry.Entity.modified = DateTime.Now;
                    entry.Entity.modifiedby = user;
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }
    }
}