using System.ComponentModel.DataAnnotations;
using DovaPackAPI.Validations;

namespace DovaPackAPI.DTOs
{
    public class CategoryCreationDTO
    {
        [Required(ErrorMessage = "El campo {0} es requerido.")]
        [StringLength(maximumLength: 50)]
        [FirstCapitalLetter]
        public string Name { get; set; }
    }
}