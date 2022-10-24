using DovaPackAPI.Controllers.Entities;

namespace DovaPackAPI.Entities
{
    public class PackagesBoxProviders
    {
        public int PackageBoxId { get; set; }

        public int ProviderId { get; set; }

        public int Order { get; set; }

        public Provider Provider { get; set; }

        public PackageBox PackageBox { get; set; }
    }
}