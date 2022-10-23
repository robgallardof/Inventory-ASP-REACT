namespace DovaPackAPI.DTOs
{
    public class FilterPackageBoxDTO
    {
        public int Page { get; set; }
        public int RecordsPerPage { get; set; }

        public PaginationDTO PaginationDTO
        {
            get { return new PaginationDTO() { Page = Page, RecordsPerPage = RecordsPerPage }; }
        }

        public string Name { get; set; }
        public int CategoryID { get; set; }

        //public bool InWarehouse { get; set; }
        public bool PriorityShippingPackages { get; set; }
    }
}