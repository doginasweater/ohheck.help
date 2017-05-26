using System;
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
        public virtual ICollection<AnswerCard> answercards { get; set; }
        public virtual ICollection<CardChoice> cardchoices { get; set; }

        public CardViewModel Prettify() =>
            new CardViewModel
            {
                id = id,
                created = created.ToString("g"),
                createdby = createdby,
                modified = modified.ToString("g"),
                modifiedby = modifiedby,
                attribute = attribute.ToString(),
                gameid = gameid,
                imageurl = imageurl,
                isidol = isidol,
                ispromo = ispromo,
                rarity = rarity.ToString()
            };

        public CardViewModel Prettify(bool includeCommon) =>
            new CardViewModel
            {
                id = id,
                attribute = attribute.ToString(),
                gameid = gameid,
                imageurl = imageurl,
                isidol = isidol,
                ispromo = ispromo,
                rarity = rarity.ToString()
            };
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

    public class CardViewModel : CommonViewModel
    {
        public int gameid { get; set; }
        public string rarity { get; set; }
        public string attribute { get; set; }
        public string imageurl { get; set; }
        public bool ispromo { get; set; }
        public bool isidol { get; set; }
    }
}