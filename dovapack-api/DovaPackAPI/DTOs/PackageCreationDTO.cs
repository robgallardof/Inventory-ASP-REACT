using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using DovaPackAPI.Utils;

namespace DovaPackAPI.DTOs
{
    public class PackagesBoxCreationDTO
    {
        public string Name { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        [StringLength(maximumLength: 50)]
        public string Description { get; set; }

        [StringLength(maximumLength: 100)]
        public string? Review { get; set; }

        public bool InWarehouse { get; set; }

        public decimal Price { get; set; }

        public DateTime ComingSoonDate { get; set; }

        public DateTime RegisterDate { get; set; }

        public IFormFile Image { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> CategoriesIds { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> WarehousesIds { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<ProviderPackageBoxCreationDTO>>))]
        public List<ProviderPackageBoxCreationDTO> Providers { get; set; }
    }
}