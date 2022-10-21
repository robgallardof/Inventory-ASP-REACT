using System.ComponentModel.DataAnnotations;

namespace DovaPackAPI.Entities
{
    public class Provider
    {
        public int Id { get; set; }

        [Required]
        [StringLength(maximumLength: 50)]
        public string Name { get; set; }

        [StringLength(maximumLength: 100)]
        public string Biography { get; set; }

        public string Image { get; set; }

        public List<PackagesBoxProviders> PackagesBoxProviders { get; set; }
    }
}