using DovaPackAPI.Controllers.Entities;

namespace DovaPackAPI.Entities
{
    public class NewPackagesBox
    {
        public int PackagesBoxId { get; set; }
        public int CategoryId { get; set; }

        public PackagesBox PackagesBox { get; set; }

        public Category Category { get; set; }
    }
}