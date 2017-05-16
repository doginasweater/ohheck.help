namespace ohheck.help.Models.Data {
  public class CardResponse {
    public int cardid { get; set; }
    public virtual Card card { get; set; }
    
    public int responseid { get; set; }
    public virtual SurveyResponse response { get; set; }
  }
}