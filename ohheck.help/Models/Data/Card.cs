using System.Collections.Generic;

namespace ohheck.help.Models.Data
{
    public class Card : Common
    {
        public int apiid { get; set; }
        public int gameid { get; set; }
        public Rarity rarity { get; set; }
        public IdolAttribute attribute { get; set; }
        public string imageurl { get; set; }
        public bool ispromo { get; set; }
        public bool isidol { get; set; }

        public virtual Idol idol { get; set; }
        public virtual ICollection<SurveyCard> surveycards { get; set; }
        public virtual ICollection<CardResponse> cardresponses { get; set; }
    }

    public enum Rarity
    {
        N,
        R,
        SR,
        SSR,
        UR
    }

    public enum IdolAttribute
    {
        Smile,
        Pure,
        Cool,
        All
    }
}