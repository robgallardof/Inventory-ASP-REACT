using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations;

namespace DovaPackAPI.Entities
{
    public class Warehouse
    {
        public int Id { get; set; }

        [Required]
        [StringLength(maximumLength: 100)]
        public string Name { get; set; }

        public Point Ubication { get; set; }

        public List<PackagesBoxWarehouses> PackagesBoxWarehouses { get; set; }
    }
}