namespace DovaPackAPI.DTOs
{
    public class PackagesBoxPutGetDTO
    {
        public PackagesBoxDTO PackagesBox { get; set; }
        public List<CategoryDTO> CategoriesSelected { get; set; }
        public List<CategoryDTO> CategoriesNotSelected { get; set; }
        public List<WarehouseDTO> BranchesSelected { get; set; }
        public List<WarehouseDTO> WarehousesNotSelected { get; set; }
        public List<PackagesBoxProviderDTO> Providers { get; set; }
    }
}