namespace ohheck.help.Models.Data
{
    public class AnswerCard
    {
        public int cardid { get; set; }
        public Card card { get; set; }

        public int answerid { get; set; }
        public Answer answer { get; set; }
    }
}