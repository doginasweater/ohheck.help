namespace ohheck.help.Models.Data {
  public class SurveyCard {
    public int cardid { get; set; }
    public Card card { get; set; }

    public int surveyid { get; set; }
    public Survey survey { get; set; }
  }
}