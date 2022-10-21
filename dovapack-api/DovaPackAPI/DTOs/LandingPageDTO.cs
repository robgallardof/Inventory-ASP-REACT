using DovaPackAPI.DTOs;

namespace PeliculasAPI.DTOs
{
    public class LandingPageDTO
    {
        public List<PackagesBoxDTO> InWarehouse { get; set; }
        public List<PackagesBoxDTO> NewPackagesBox { get; set; }
    }
}