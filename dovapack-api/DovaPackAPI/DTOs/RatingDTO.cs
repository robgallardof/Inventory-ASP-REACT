using System.ComponentModel.DataAnnotations;

namespace DovaPackAPI.DTOs
{
    public class RatingDTO
    {
        public int PackagesBoxId { get; set; }

        [Range(1, 5)]
        public int Punctuation { get; set; }
    }
}