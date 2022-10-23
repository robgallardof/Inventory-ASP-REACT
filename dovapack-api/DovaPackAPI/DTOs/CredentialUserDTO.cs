using System.ComponentModel.DataAnnotations;

namespace DovaPackAPI.DTOs
{
    public class CredentialUserDTO
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}