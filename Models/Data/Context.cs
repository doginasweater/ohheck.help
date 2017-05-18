using Microsoft.EntityFrameworkCore;

namespace ohheck.help.Models.Data
{
    public class HeckingContext : DbContext
    {
        public HeckingContext()
        {
        }

        public HeckingContext(DbContextOptions<HeckingContext> options)
          : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<SurveyCard>()
              .HasKey(x => new { x.cardid, x.surveyid });

            builder.Entity<SurveyCard>()
              .HasOne(sc => sc.survey)
              .WithMany(s => s.surveycards)
              .HasForeignKey(sc => sc.surveyid);

            builder.Entity<SurveyCard>()
              .HasOne(sc => sc.card)
              .WithMany(c => c.surveycards)
              .HasForeignKey(sc => sc.cardid);

            builder.Entity<CardResponse>()
              .HasKey(x => new { x.cardid, x.responseid });

            builder.Entity<CardResponse>()
              .HasOne(cr => cr.card)
              .WithMany(c => c.cardresponses)
              .HasForeignKey(cr => cr.cardid);

            builder.Entity<CardResponse>()
              .HasOne(cr => cr.response)
              .WithMany(r => r.cardresponses)
              .HasForeignKey(cr => cr.responseid);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=ohheck.data.db");
        }

        public virtual DbSet<Card> Cards { get; set; }
        public virtual DbSet<CardResponse> CardResponses { get; set; }
        public virtual DbSet<Group> Groups { get; set; }
        public virtual DbSet<Idol> Idols { get; set; }
        public virtual DbSet<Subunit> Subunits { get; set; }
        public virtual DbSet<SurveyCard> SurveyCards { get; set; }
        public virtual DbSet<Survey> Surveys { get; set; }
        public virtual DbSet<SurveyResponse> Responses { get; set; }
    }
}