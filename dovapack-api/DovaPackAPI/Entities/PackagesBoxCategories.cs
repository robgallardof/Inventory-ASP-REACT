using DovaPackAPI.Controllers.Entities;

namespace DovaPackAPI.Entities
{
    public class PackagesBoxCategories
    {
        public int CategoryId { get; set; }

        public int PackageBoxId { get; set; }

        public PackageBox PackageBox { get; set; }
        public Category Category { get; set; }
    }
}