using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ohheck.help.Models.Data;

namespace ohheck.help.Models.ViewModels {
    public class NotificationViewModel : Common {
        public string foruser { get; set; }
        public string level { get; set; }
        public string text { get; set; }
        public bool seen { get; set; }
        public NotificationAction action { get; set; }

        public NotificationViewModel(Notification n) {
            foruser = n.foruser;
            level = n.level.ToString();
            text = n.text;
            seen = n.seen;
            action = n.action;
            id = n.id;
            created = n.created;
            createdby = n.createdby;
            modified = n.modified;
            modifiedby = n.modifiedby;
        }
    }
}
