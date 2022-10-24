using System.ComponentModel.DataAnnotations;

namespace DovaPackAPI.DTOs
{
    public class ProviderCreationDTO
    {
        [Required]
        [StringLength(maximumLength: 50)]
        public string Name { get; set; }

        [StringLength(maximumLength: 100)]
        public IFormFile Image { get; set; }
    }
}