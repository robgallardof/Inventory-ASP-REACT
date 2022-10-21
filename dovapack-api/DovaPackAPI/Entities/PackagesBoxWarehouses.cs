using DovaPackAPI.Controllers.Entities;

namespace DovaPackAPI.Entities
{
    public class PackagesBoxWarehouses
    {
        public int PackagesBoxId { get; set; }

        public int BranchId { get; set; }

        public PackagesBox PackagesBox { get; set; }

        public Warehouse Branch { get; set; }
    }
}