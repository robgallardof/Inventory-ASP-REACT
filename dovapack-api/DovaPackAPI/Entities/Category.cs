using DovaPackAPI.Entities;
using DovaPackAPI.Validations;
using System.ComponentModel.DataAnnotations;

namespace DovaPackAPI.Controllers.Entities
{
    public class Category
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        [StringLength(maximumLength: 50)]
        [FirstCapitalLetter]
        public string Name { get; set; }

        public List<PackagesBoxCategories> PackagesBoxCategories { get; set; }
    }
}