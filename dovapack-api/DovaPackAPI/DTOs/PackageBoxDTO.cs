namespace DovaPackAPI.DTOs
{
    public class PackageBoxDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        //public decimal Price { get; set; }

        //public bool InWarehouse { get; set; }
        public DateTime PriorityShippingDate { get; set; }

        public DateTime RegisterDate { get; set; }
        public string Image { get; set; }
        public List<CategoryDTO> Categories { get; set; }
        public List<WarehouseDTO> Warehouses { get; set; }
        public List<PackageBoxProviderDTO> Providers { get; set; }
        public double AverageVote { get; set; }
        public int UserVote { get; set; }
    }
}