namespace NonExsistentWiki.Server.Models
{
    public class ObjectModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public int Score { get; set; }

        public ObjectModel(int id, string title, string description, string type, int score)
        {
            Id = id;
            Title = title;
            Description = description;
            Type = type;
            Score = score;
        }
    }
}
