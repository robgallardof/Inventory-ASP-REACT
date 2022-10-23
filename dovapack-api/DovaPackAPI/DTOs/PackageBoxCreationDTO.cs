using DovaPackAPI.Utils;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace DovaPackAPI.DTOs
{
    public class PackagesBoxCreationDTO
    {
        public string Name { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        [StringLength(maximumLength: 50)]
        public string Description { get; set; }

        //[StringLength(maximumLength: 100)]
        //public decimal Price { get; set; }

        public DateTime PriorityShippingDate { get; set; }

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