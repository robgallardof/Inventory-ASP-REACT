using AutoMapper;
using DovaPackAPI.Controllers.Entities;
using DovaPackAPI.DTOs;
using DovaPackAPI.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeliculasAPI.DTOs;

namespace DovaPackAPI.Controllers
{
    [ApiController]
    [Route("api/packagebox")]
    public class PackagesBoxController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IStorageFiles storageFiles;
        private readonly UserManager<IdentityUser> userManager;
        private readonly string container = "packagesbox";

        public PackagesBoxController(ApplicationDbContext context,
           IMapper mapper,
           IStorageFiles storageFiles,
           UserManager<IdentityUser> userManager)
        {
            this.context = context;
            this.mapper = mapper;
            this.storageFiles = storageFiles;
            this.userManager = userManager;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<LandingPageDTO>> Get()
        {
            var top = 6;
            var now = DateTime.Today;

            var priorityShippingPackages = await context.PackageBox
                .Where(x => x.RegisterDate < now)
                .OrderBy(x => x.RegisterDate)
                .Take(top)
                .ToListAsync();

            //var inWarehouse = await context.PackageBox
            //    .Where(x => x.InWarehouse)
            //    .OrderBy(x => x.RegisterDate)
            //    .Take(top)
            //    .ToListAsync();

            var landingPageDTO = new LandingPageDTO
            {
                PriorityShippingPackages = mapper.Map<List<PackageBoxDTO>>(priorityShippingPackages),
                //InWarehouse = mapper.Map<List<PackageBoxDTO>>(inWarehouse)
            };
            return landingPageDTO;
        }

        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult<PackageBoxDTO>> Get(int id)
        {
            PackageBox packageBox = await context.PackageBox
            .Include(x => x.PackagesBoxCategories).ThenInclude(x => x.Category)
            .Include(x => x.PackagesBoxWarehouses).ThenInclude(x => x.Warehouse)
            .Include(x => x.PackagesBoxProviders).ThenInclude(x => x.Provider)
            .FirstOrDefaultAsync(x => x.Id == id);

            if (packageBox == null) { return NotFound(); }

            var averageVote = 0.0;
            var userVote = 0;

            if (await context.Ratings.AnyAsync(x => x.PackagesBoxId == id))
            {
                averageVote = await context.Ratings.Where(x => x.PackagesBoxId == id)
                    .AverageAsync(x => x.Punctuation);

                if (HttpContext.User.Identity.IsAuthenticated)
                {
                    var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
                    var usuario = await userManager.FindByEmailAsync(email);
                    var usuarioId = usuario.Id;
                    var ratingDB = await context.Ratings
                        .FirstOrDefaultAsync(x => x.UserId == usuarioId && x.PackagesBoxId == id);

                    if (ratingDB != null)
                    {
                        userVote = ratingDB.Punctuation;
                    }
                }
            }

            var dto = mapper.Map<PackageBoxDTO>(packageBox);
            dto.UserVote = userVote;
            dto.AverageVote = averageVote;
            dto.Providers = dto.Providers.OrderBy(x => x.Order).ToList();
            return dto;
        }

        [HttpGet("filter")]
        [AllowAnonymous]
        public async Task<ActionResult<List<PackageBoxDTO>>> Filter([FromQuery] FilterPackageBoxDTO filterPackageBoxDTO)
        {
            var packagesQueryable = context.PackageBox.AsQueryable();

            if (!string.IsNullOrEmpty(filterPackageBoxDTO.Name))
            {
                packagesQueryable = packagesQueryable.Where(x => x.Name.Contains(filterPackageBoxDTO.Name));
            }

            //if (filterPackageBoxDTO.InWarehouse)
            //{
            //    packagesQueryable = packagesQueryable.Where(x => x.InWarehouse);
            //}

            if (filterPackageBoxDTO.PriorityShippingPackages)
            {
                var now = DateTime.Today;
                packagesQueryable = packagesQueryable.Where(x => x.PriorityShippingDate > now);
            }

            if (filterPackageBoxDTO.CategoryID != 0)
            {
                packagesQueryable = packagesQueryable
                    .Where(x => x.PackagesBoxCategories.Select(y => y.CategoryId)
                    .Contains(filterPackageBoxDTO.CategoryID));
            }

            await HttpContext.InsertParameterPaginationInHeader(packagesQueryable);

            var packagesBox = await packagesQueryable.Paginate(filterPackageBoxDTO.PaginationDTO).ToListAsync();

            return mapper.Map<List<PackageBoxDTO>>(packagesBox);
        }

        [HttpGet("PostGet")]
        public async Task<ActionResult<PackagesBoxPostGetDTO>> PostGet()
        {
            var warehouses = await context.Warehouses.ToListAsync();
            var categories = await context.Categories.ToListAsync();

            var warehouseDTO = mapper.Map<List<WarehouseDTO>>(warehouses);
            var categoryDTO = mapper.Map<List<CategoryDTO>>(categories);

            return new PackagesBoxPostGetDTO() { Warehouses = warehouseDTO, Categories = categoryDTO, };
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post([FromForm] PackagesBoxCreationDTO packageBoxCreationDTO)
        {
            var packageBox = mapper.Map<PackageBox>(packageBoxCreationDTO);

            if (packageBoxCreationDTO.Image != null)
            {
                packageBox.Image = await storageFiles.SaveFile(container, packageBoxCreationDTO.Image);
            }

            OrderProviders(packageBox);
            context.Add(packageBox);
            try
            {
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            return packageBox.Id;
        }

        [HttpGet("PutGet/{id:int}")]
        public async Task<ActionResult<PackagesBoxPutGetDTO>> PutGet(int id)
        {
            var toyActionResult = await Get(id);
            if (toyActionResult.Result is NotFoundResult) { return NotFound(); }

            var packageBox = toyActionResult.Value;

            var categoriesSelectedIds = packageBox.Categories.Select(x => x.Id).ToList();
            var categoriesNotSelected = await context.Categories
                .Where(x => !categoriesSelectedIds.Contains(x.Id))
                .ToListAsync();

            var warehousesSelectedIds = packageBox.Warehouses.Select(x => x.Id).ToList();
            var warehousesNotSelected = await context.Warehouses
                .Where(x => !warehousesSelectedIds.Contains(x.Id))
                .ToListAsync();

            var categoriesNotSelectedDTO = mapper.Map<List<CategoryDTO>>(categoriesNotSelected);
            var warehousesNotSelectedDTO = mapper.Map<List<WarehouseDTO>>(warehousesNotSelected);

            var answer = new PackagesBoxPutGetDTO
            {
                PackagesBox = packageBox,
                CategoriesSelected = packageBox.Categories,
                CategoriesNotSelected = categoriesNotSelectedDTO,
                WarehousesSelected = packageBox.Warehouses,
                WarehousesNotSelected = warehousesNotSelectedDTO,
                Providers = packageBox.Providers
            };
            return answer;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] PackagesBoxCreationDTO packageBoxCreationDTO)
        {
            var packageBox = await context.PackageBox
                .Include(x => x.PackagesBoxProviders)
                .Include(x => x.PackagesBoxCategories)
                .Include(x => x.PackagesBoxWarehouses)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (packageBox == null)
            {
                return NotFound();
            }

            packageBox = mapper.Map(packageBoxCreationDTO, packageBox);

            if (packageBoxCreationDTO.Image != null)
            {
                packageBox.Image = await storageFiles.EditFile(container, packageBoxCreationDTO.Image, packageBox.Image);
            }

            OrderProviders(packageBox);

            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var packageBox = await context.PackageBox.FirstOrDefaultAsync(x => x.Id == id);

            if (packageBox == null)
            {
                return NotFound();
            }

            context.Remove(packageBox);
            await context.SaveChangesAsync();
            await storageFiles.DeleteFile(packageBox.Image, container);

            return NoContent();
        }

        private static void OrderProviders(PackageBox packageBox)
        {
            if (packageBox.PackagesBoxProviders != null)
            {
                int order = 0;
                packageBox.PackagesBoxProviders.ToList().ForEach(tb => tb.Order = (order++));
            }
        }
    }
}