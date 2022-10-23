using DovaPackAPI.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DovaPackAPI.Controllers.Entities
{
    public class PackageBox
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        [StringLength(maximumLength: 50)]
        public string Description { get; set; } = string.Empty;

        //public bool InWarehouse { get; set; }

        //[Required()]
        //[Range(0, 1000.00)]
        //[Column(TypeName = "decimal(5,2)")]
        //public decimal Price { get; set; }

        public DateTime PriorityShippingDate { get; set; }

        public DateTime RegisterDate { get; set; } = DateTime.Now;

        [StringLength(maximumLength: 200)]
        public string Image { get; set; }

        public List<PackagesBoxProviders> PackagesBoxProviders { get; set; }

        public List<PackagesBoxCategories> PackagesBoxCategories { get; set; }

        public List<PackagesBoxWarehouses> PackagesBoxWarehouses { get; set; }
    }
}