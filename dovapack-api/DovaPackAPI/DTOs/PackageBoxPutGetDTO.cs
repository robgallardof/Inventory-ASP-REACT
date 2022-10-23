namespace DovaPackAPI.DTOs
{
    public class PackagesBoxPutGetDTO
    {
        public PackageBoxDTO PackagesBox { get; set; }
        public List<CategoryDTO> CategoriesSelected { get; set; }
        public List<CategoryDTO> CategoriesNotSelected { get; set; }
        public List<WarehouseDTO> WarehousesSelected { get; set; }
        public List<WarehouseDTO> WarehousesNotSelected { get; set; }
        public List<PackageBoxProviderDTO> Providers { get; set; }
    }
}