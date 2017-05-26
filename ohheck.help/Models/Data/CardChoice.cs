namespace ohheck.help.Models.Data
{
    public class CardChoice
    {
        public int cardid { get; set; }
        public virtual Card card { get; set; }

        public int choiceid { get; set; }
        public virtual Choice choice { get; set; }
    }
}