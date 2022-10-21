namespace DovaPackAPI.DTOs
{
    public class PaginationDTO
    {
        public int Page { get; set; } = 1;

        private int recordsPerPage = 10;

        private readonly int maxRecordsPage = 50;

        public int RecordsPerPage
        {
            get
            {
                return recordsPerPage;
            }
            set
            {
                recordsPerPage = (value > maxRecordsPage) ? maxRecordsPage : value;
            }
        }
    }
}