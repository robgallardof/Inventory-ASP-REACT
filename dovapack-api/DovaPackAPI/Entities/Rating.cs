using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using DovaPackAPI.Controllers.Entities;

namespace DovaPackAPI.Entities
{
    public class Rating
    {
        public int Id { get; set; }
        [Range(1, 5)]
        public int Punctuation { get; set; }
        public int PackagesBoxId { get; set; }
        public PackagesBox PackagesBox { get; set; }
        public string UserId { get; set; }
        public IdentityUser User { get; set; }
    }
}
