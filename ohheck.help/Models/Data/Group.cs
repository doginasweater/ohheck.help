using System.Collections.Generic;

namespace ohheck.help.Models.Data {
  public class Group : Common {
    public string name { get; set; }
    
    public virtual ICollection<Subunit> subunits { get; set; }
    public virtual ICollection<Idol> idols { get; set; }
  }
}