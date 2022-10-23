using AutoMapper;
using DovaPackAPI.Controllers.Entities;
using DovaPackAPI.DTOs;
using DovaPackAPI.Entities;
using Microsoft.AspNetCore.Identity;
using NetTopologySuite.Geometries;

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

            CreateMap<PackagesBoxCreationDTO, PackageBox>()
                .ForMember(x => x.Image, options => options.Ignore())
                .ForMember(x => x.PackagesBoxCategories, options => options.MapFrom(MappedPackagesBoxCategories))
                .ForMember(x => x.PackagesBoxWarehouses, options => options.MapFrom(MappedPackagesBoxwarehousees))
                .ForMember(x => x.PackagesBoxProviders, options => options.MapFrom(MappedPackagesBoxProviders));

            CreateMap<PackageBox, PackageBoxDTO>()
               .ForMember(x => x.Categories, options => options.MapFrom(MappedPackagesBoxDTOCategories))
               .ForMember(x => x.Providers, options => options.MapFrom(MappedPackagesBoxDTOProviders))
               .ForMember(x => x.Warehouses, options => options.MapFrom(MappedPackagesBoxDTOwarehousees));

            CreateMap<IdentityUser, UserDTO>();
        }

        private List<CategoryDTO> MappedPackagesBoxDTOCategories(PackageBox packageBox, PackageBoxDTO packageBoxDTO)
        {
            var result = new List<CategoryDTO>();

            if (packageBox.PackagesBoxCategories != null)
            {
                foreach (var categoryPackageBox in packageBox.PackagesBoxCategories)
                {
                    result.Add(new CategoryDTO()
                    {
                        Id = categoryPackageBox.CategoryId,
                        Name = categoryPackageBox.Category.Name
                    });
                }
            }

            return result;
        }

        private List<PackageBoxProviderDTO> MappedPackagesBoxDTOProviders(PackageBox packageBox, PackageBoxDTO packageBoxDTO)
        {
            var result = new List<PackageBoxProviderDTO>();

            if (packageBox.PackagesBoxProviders != null)
            {
                foreach (var providerPackageBox in packageBox.PackagesBoxProviders)
                {
                    result.Add(new PackageBoxProviderDTO()
                    {
                        Id = providerPackageBox.ProviderId,
                        Name = providerPackageBox.Provider.Name,
                        Image = providerPackageBox.Provider.Image,
                        Order = providerPackageBox.Order
                    });
                }
            }

            return result;
        }

        private List<WarehouseDTO> MappedPackagesBoxDTOwarehousees(PackageBox packageBox, PackageBoxDTO packageBoxDTO)
        {
            var result = new List<WarehouseDTO>();

            if (packageBox.PackagesBoxWarehouses != null)
            {
                foreach (var warehousePackageBox in packageBox.PackagesBoxWarehouses)
                {
                    result.Add(new WarehouseDTO()
                    {
                        Id = warehousePackageBox.WarehouseId,
                        Name = warehousePackageBox.Warehouse.Name,
                        Latitude = warehousePackageBox.Warehouse.Ubication.Y,
                        Longitude = warehousePackageBox.Warehouse.Ubication.X
                    }); ;
                }
            }

            return result;
        }

        private List<PackagesBoxCategories> MappedPackagesBoxCategories(PackagesBoxCreationDTO packageBoxCreationDTO, PackageBox packageBox)
        {
            var result = new List<PackagesBoxCategories>();

            if (packageBoxCreationDTO.CategoriesIds == null) { return result; }

            foreach (var id in packageBoxCreationDTO.CategoriesIds)
            {
                result.Add(new PackagesBoxCategories()
                {
                    CategoryId = id,
                });
            }

            return result;
        }

        private List<PackagesBoxWarehouses> MappedPackagesBoxwarehousees(PackagesBoxCreationDTO packageBoxCreationDTO, PackageBox packageBox)
        {
            var result = new List<PackagesBoxWarehouses>();

            if (packageBoxCreationDTO.WarehousesIds == null) { return result; }

            foreach (var id in packageBoxCreationDTO.WarehousesIds)
            {
                result.Add(new PackagesBoxWarehouses()
                {
                    WarehouseId = id,
                });
            }

            return result;
        }

        private List<PackagesBoxProviders> MappedPackagesBoxProviders(PackagesBoxCreationDTO packageBoxCreationDTO, PackageBox packageBox)
        {
            var result = new List<PackagesBoxProviders>();

            if (packageBoxCreationDTO.Providers == null) { return result; }

            foreach (var provider in packageBoxCreationDTO.Providers)
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