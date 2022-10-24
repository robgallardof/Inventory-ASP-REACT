using DovaPackAPI.Controllers.Entities;

namespace DovaPackAPI.Entities
{
    public class PackagesBoxWarehouses
    {
        public int PackageBoxId { get; set; }

        public int WarehouseId { get; set; }

        public Warehouse Warehouse { get; set; }
        public PackageBox PackageBox { get; set; }
    }
}