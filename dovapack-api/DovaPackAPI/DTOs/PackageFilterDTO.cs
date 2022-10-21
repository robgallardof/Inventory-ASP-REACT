namespace DovaPackAPI.DTOs
{
    public class PackageFilterDTO
    {
        public int Page { get; set; }
        public int RecordsPerPagine { get; set; }

        public PaginationDTO PaginationDTO
        {
            get { return new PaginationDTO() { Page = Page, RecordsPerPage = RecordsPerPagine }; }
        }

        public string Name { get; set; }
        public int CategoryID { get; set; }
        public bool InWarehouse { get; set; }
        public bool NewPackagesBox { get; set; }
    }
}