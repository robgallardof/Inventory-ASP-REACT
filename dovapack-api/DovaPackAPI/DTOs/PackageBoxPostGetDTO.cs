namespace DovaPackAPI.DTOs
{
    public class PackagesBoxPostGetDTO
    {
        public List<CategoryDTO> Categories { get; set; }
        public List<WarehouseDTO> Warehouses { get; set; }
    }
}