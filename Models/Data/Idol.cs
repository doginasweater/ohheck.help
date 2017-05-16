using System.Collections.Generic;

namespace ohheck.help.Models.Data {
  public class Idol : Common {
    public string name { get; set; }

    public virtual Group group { get; set; }
    public virtual Subunit subunit { get; set; }
    public virtual ICollection<Card> cards { get; set; }
  }
}