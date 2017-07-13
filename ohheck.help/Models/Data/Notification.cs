namespace ohheck.help.Models.Data {
    public class Notification : Common {
        public string foruser { get; set; }
        public Level level { get; set; }
        public string text { get; set; }
        public bool seen { get; set; }
        public virtual NotificationAction action { get; set; }
    }

    public enum Level {
        success,
        info,
        warning,
        error
    }
}
