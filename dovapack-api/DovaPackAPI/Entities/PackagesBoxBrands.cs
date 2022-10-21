using DovaPackAPI.Controllers.Entities;

namespace DovaPackAPI.Entities
{
    public class PackagesBoxProviders
    {
        public int PackagesBoxId { get; set; }

        public int ProviderId { get; set; }

        public PackagesBox PackagesBox { get; set; }

        public Provider Provider { get; set; }

        public int Order { get; set; }
    }
}