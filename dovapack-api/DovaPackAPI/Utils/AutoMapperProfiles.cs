using AutoMapper;
using Microsoft.AspNetCore.Identity;
using NetTopologySuite.Geometries;
using DovaPackAPI.Controllers.Entities;
using DovaPackAPI.DTOs;
using DovaPackAPI.Entities;

namespace DovaPackAPI.Utils
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles(GeometryFactory geometryFactory)
        {
            CreateMap<Category, CategoryDTO>().ReverseMap();
            CreateMap<CategoryCreationDTO, Category>();

            CreateMap<Provider, ProviderDTO>().ReverseMap();
            CreateMap<ProviderCreationDTO, Provider>()
                .ForMember(x => x.Image, options => options.Ignore());

            CreateMap<WarehouseCreationDTO, Warehouse>()
                .ForMember(x => x.Ubication, x => x.MapFrom(dto =>
                geometryFactory.CreatePoint(new Coordinate(dto.Longitude, dto.Latitude))));

            CreateMap<Warehouse, WarehouseDTO>()
                .ForMember(x => x.Latitude, dto => dto.MapFrom(field => field.Ubication.Y))
                .ForMember(x => x.Longitude, dto => dto.MapFrom(field => field.Ubication.X));

            CreateMap<PackagesBoxCreationDTO, PackagesBox>()
                .ForMember(x => x.Image, options => options.Ignore())
                .ForMember(x => x.NewPackagesBox, options => options.MapFrom(MappedToysCategories))
                .ForMember(x => x.PackagesBoxWarehouses, options => options.MapFrom(MappedToysBranches))
                .ForMember(x => x.PackagesBoxProviders, options => options.MapFrom(MappedToysProviders));

            CreateMap<PackagesBox, PackagesBoxDTO>()
               .ForMember(x => x.Categories, options => options.MapFrom(MappedToysDTOCategories))
               .ForMember(x => x.Providers, options => options.MapFrom(MappedToysDTOProviders))
               .ForMember(x => x.Warehouses, options => options.MapFrom(MappedToysDTOBranches));

            CreateMap<IdentityUser, UserDTO>();
        }

        private List<CategoryDTO> MappedToysDTOCategories(PackagesBox packageBox, PackagesBoxDTO toyDTO)
        {
            var result = new List<CategoryDTO>();

            if (packageBox.NewPackagesBox != null)
            {
                foreach (var categoryToy in packageBox.NewPackagesBox)
                {
                    result.Add(new CategoryDTO()
                    {
                        Id = categoryToy.CategoryId,
                        Name = categoryToy.Category.Name
                    });
                }
            }

            return result;
        }

        private List<PackagesBoxProviderDTO> MappedToysDTOProviders(PackagesBox packageBox, PackagesBoxDTO toyDTO)
        {
            var result = new List<PackagesBoxProviderDTO>();

            if (packageBox.PackagesBoxProviders != null)
            {
                foreach (var providerToy in packageBox.PackagesBoxProviders)
                {
                    result.Add(new PackagesBoxProviderDTO()
                    {
                        Id = providerToy.ProviderId,
                        Name = providerToy.Provider.Name,
                        Image = providerToy.Provider.Image,
                        Order = providerToy.Order
                    });
                }
            }

            return result;
        }

        private List<WarehouseDTO> MappedToysDTOBranches(PackagesBox packageBox, PackagesBoxDTO toyDTO)
        {
            var result = new List<WarehouseDTO>();

            if (packageBox.PackagesBoxWarehouses != null)
            {
                foreach (var branchToy in packageBox.PackagesBoxWarehouses)
                {
                    result.Add(new WarehouseDTO()
                    {
                        Id = branchToy.BranchId,
                        Name = branchToy.Branch.Name,
                        Latitude = branchToy.Branch.Ubication.Y,
                        Longitude = branchToy.Branch.Ubication.X
                    }); ;
                }
            }

            return result;
        }

        private List<NewPackagesBox> MappedToysCategories(PackagesBoxCreationDTO toyCreationDTO, PackagesBox packageBox)
        {
            var result = new List<NewPackagesBox>();

            if (toyCreationDTO.CategoriesIds == null) { return result; }

            foreach (var id in toyCreationDTO.CategoriesIds)
            {
                result.Add(new NewPackagesBox()
                {
                    CategoryId = id,
                });
            }

            return result;
        }

        private List<PackagesBoxWarehouses> MappedToysBranches(PackagesBoxCreationDTO toyCreationDTO, PackagesBox packageBox)
        {
            var result = new List<PackagesBoxWarehouses>();

            if (toyCreationDTO.WarehousesIds == null) { return result; }

            foreach (var id in toyCreationDTO.WarehousesIds)
            {
                result.Add(new PackagesBoxWarehouses()
                {
                    BranchId = id,
                });
            }

            return result;
        }

        private List<PackagesBoxProviders> MappedToysProviders(PackagesBoxCreationDTO toyCreationDTO, PackagesBox packageBox)
        {
            var result = new List<PackagesBoxProviders>();

            if (toyCreationDTO.Providers == null) { return result; }

            foreach (var provider in toyCreationDTO.Providers)
            {
                result.Add(new PackagesBoxProviders()
                {
                    ProviderId = provider.Id,
                    //Website = provider.Website
                });
            }

            return result;
        }
    }
}