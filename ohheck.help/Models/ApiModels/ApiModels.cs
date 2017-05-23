using System.Collections.Generic; 

namespace ohheck.help.Models.ApiModels {
  public class Idol
  {
      public string note { get; set; }
      public string school { get; set; }
      public string name { get; set; }
      public string year { get; set; }
      public string chibi { get; set; }
      public string main_unit { get; set; }
      public string japanese_name { get; set; }
      public string chibi_small { get; set; }
      public string sub_unit { get; set; }
  }

  public class Event
  {
      public string note { get; set; }
      public string image { get; set; }
      public string japanese_name { get; set; }
      public string english_name { get; set; }
      public object translated_name { get; set; }
  }

  public class Result
  {
      public int id { get; set; }
      public int game_id { get; set; }
      public Idol idol { get; set; }
      public string japanese_collection { get; set; }
      public string translated_collection { get; set; }
      public string rarity { get; set; }
      public string attribute { get; set; }
      public string japanese_attribute { get; set; }
      public bool is_promo { get; set; }
      public string promo_item { get; set; }
      public string promo_link { get; set; }
      public string release_date { get; set; }
      public bool japan_only { get; set; }
      public Event @event { get; set; }
      public object other_event { get; set; }
      public bool is_special { get; set; }
      public int hp { get; set; }
      public int minimum_statistics_smile { get; set; }
      public int minimum_statistics_pure { get; set; }
      public int minimum_statistics_cool { get; set; }
      public int non_idolized_maximum_statistics_smile { get; set; }
      public int non_idolized_maximum_statistics_pure { get; set; }
      public int non_idolized_maximum_statistics_cool { get; set; }
      public int idolized_maximum_statistics_smile { get; set; }
      public int idolized_maximum_statistics_pure { get; set; }
      public int idolized_maximum_statistics_cool { get; set; }
      public string skill { get; set; }
      public string japanese_skill { get; set; }
      public string skill_details { get; set; }
      public string japanese_skill_details { get; set; }
      public string center_skill { get; set; }
      public string center_skill_details { get; set; }
      public string japanese_center_skill { get; set; }
      public string japanese_center_skill_details { get; set; }
      public string card_image { get; set; }
      public string card_idolized_image { get; set; }
      public string english_card_image { get; set; }
      public string english_card_idolized_image { get; set; }
      public string round_card_image { get; set; }
      public string round_card_idolized_image { get; set; }
      public string english_round_card_image { get; set; }
      public string english_round_card_idolized_image { get; set; }
      public string video_story { get; set; }
      public object japanese_video_story { get; set; }
      public string website_url { get; set; }
      public int non_idolized_max_level { get; set; }
      public int idolized_max_level { get; set; }
      public string transparent_image { get; set; }
      public string transparent_idolized_image { get; set; }
      public object clean_ur { get; set; }
      public object clean_ur_idolized { get; set; }
      public List<object> skill_up_cards { get; set; }
      public object ur_pair { get; set; }
      public int total_owners { get; set; }
      public int total_wishlist { get; set; }
      public int ranking_attribute { get; set; }
      public int ranking_rarity { get; set; }
      public int? ranking_special { get; set; }
  }

  public class ApiResponse
  {
      public int count { get; set; }
      public string next { get; set; }
      public object previous { get; set; }
      public List<Result> results { get; set; }
  }

  public class CachedResponse
  {
    public CardsInfo cards_info { get; set; }
  }

  public class CardsInfo {
    public List<object> en_cards { get; set; }
    public List<object> years { get; set; }
    public List<object> schools { get; set; }
    public int songs_max_stats { get; set; }
    public List<object> idols { get; set; }
    public List<string> sub_units { get; set; }
    public int total_cards { get; set; }
    public List<object> translated_collections { get; set; }
    public List<object> skills { get; set; }
    public List<object> collections { get; set; }
  }
}