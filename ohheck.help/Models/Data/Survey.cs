using System;
using System.Collections.Generic;

namespace ohheck.help.Models.Data {
  public class Survey : Common {
    public string name { get; set; }
    public string comments { get; set; }
    public string slug { get; set; }

    public virtual ICollection<SurveyCard> surveycards { get; set; }
    public virtual ICollection<SurveyResponse> responses { get; set; }
  }
}