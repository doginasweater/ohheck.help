using System.Collections.Generic;

namespace ohheck.help.Models.Data {
  public class SurveyResponse : Common {
    public string comments { get; set; }
    public virtual Survey survey { get; set; }
    public virtual ICollection<CardResponse> cardresponses { get; set; }
  }
}