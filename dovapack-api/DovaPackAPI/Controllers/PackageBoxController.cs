using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeliculasAPI.DTOs;
using DovaPackAPI.Controllers.Entities;
using DovaPackAPI.DTOs;
using DovaPackAPI.Utils;

namespace DovaPackAPI.Controllers
{
    [ApiController]
    [Route("api/packagebox")]
    public class PackagesBoxController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IStorageFiles storageFiles;
        private readonly string container = "packagebox";

        public PackagesBoxController(ApplicationDbContext context,
           IMapper mapper,
           IStorageFiles storageFiles)
        {
            this.context = context;
            this.mapper = mapper;
            this.storageFiles = storageFiles;
        }

        [HttpGet]
        public async Task<ActionResult<LandingPageDTO>> Get()
        {
            var top = 6;
            var now = DateTime.Today;

            var newPackagesBoxsBox = await context.PackagesBoxsBoxBox
                .Where(x => x.ComingSoonDate > now)
                .OrderBy(x => x.ComingSoonDate)
                .Take(top)
                .ToListAsync();

            var inWarehouse = await context.PackagesBoxsBoxBox
                .Where(x => x.InWarehouse)
                .OrderBy(x => x.ComingSoonDate)
                .Take(top)
                .ToListAsync();

            var result = new LandingPageDTO
            {
                NewPackagesBox = mapper.Map<List<PackagesBoxDTO>>(newPackagesBoxsBox),

                InWarehouse = mapper.Map<List<PackagesBoxDTO>>(inWarehouse)
            };

            return result;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<PackagesBoxDTO>> Get(int id)
        {
            PackagesBox packageBox = await context.PackagesBoxsBoxBox
            .Include(x => x.NewPackagesBox).ThenInclude(x => x.Category)
            .Include(x => x.PackagesBoxProviders).ThenInclude(x => x.Provider)
            .Include(x => x.PackagesBoxWarehouses).ThenInclude(x => x.Branch)
            .FirstOrDefaultAsync(x => x.Id == id);

            if (packageBox == null) { return NotFound(); }

            var dto = mapper.Map<PackagesBoxDTO>(packageBox);
            dto.Providers = dto.Providers.OrderBy(x => x.Order).ToList();

            return dto;
        }

        [HttpGet("filter")]
        public async Task<ActionResult<List<PackagesBoxDTO>>> Filter([FromQuery] PackageFilterDTO toyFilterDTO)
        {
            var toysQueryable = context.PackagesBoxsBoxBox.AsQueryable();

            if (!string.IsNullOrEmpty(toyFilterDTO.Name))
            {
                toysQueryable = toysQueryable.Where(x => x.Name.Contains(toyFilterDTO.Name));
            }

            if (toyFilterDTO.InWarehouse)
            {
                toysQueryable = toysQueryable.Where(x => x.InWarehouse);
            }

            if (toyFilterDTO.NewPackagesBox)
            {
                var now = DateTime.Today;
                toysQueryable = toysQueryable.Where(x => x.ComingSoonDate > now);
            }

            if (toyFilterDTO.CategoryID != 0)
            {
                toysQueryable = toysQueryable
                    .Where(x => x.NewPackagesBox.Select(y => y.CategoryId)
                    .Contains(toyFilterDTO.CategoryID));
            }

            await HttpContext.InsertParameterPaginationInHeader(toysQueryable);

            var packageBox = await toysQueryable.Paginate(toyFilterDTO.PaginationDTO).ToListAsync();

            return mapper.Map<List<PackagesBoxDTO>>(packageBox);
        }

        [HttpGet("PostGet")]
        public async Task<ActionResult<PackagesBoxPostGetDTO>> PostGet()
        {
            var branches = await context.Warehouses.ToListAsync();
            var categories = await context.Categories.ToListAsync();

            var branchDTO = mapper.Map<List<WarehouseDTO>>(branches);
            var categoryDTO = mapper.Map<List<CategoryDTO>>(categories);

            return new PackagesBoxPostGetDTO() { Warehouses = branchDTO, Categories = categoryDTO };
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post([FromForm] PackagesBoxCreationDTO toyCreationDTO)
        {
            var packageBox = mapper.Map<PackagesBox>(toyCreationDTO);

            if (toyCreationDTO.Image != null)
            {
                packageBox.Image = await storageFiles.SaveFile(container, toyCreationDTO.Image);
            }

            OrderProviders(packageBox);

            context.Add(packageBox);
            try
            {
                await context.SaveChangesAsync();
            }
            catch(Exception ex)
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

            var branchesSelectedIds = packageBox.Warehouses.Select(x => x.Id).ToList();
            var branchesNotSelected = await context.Warehouses
                .Where(x => !branchesSelectedIds.Contains(x.Id))
                .ToListAsync();

            var categoriesNotSelectedDTO = mapper.Map<List<CategoryDTO>>(categoriesNotSelected);
            var branchesNotSelectedDTO = mapper.Map<List<WarehouseDTO>>(branchesNotSelected);

            var answer = new PackagesBoxPutGetDTO
            {
                PackagesBox = packageBox,
                CategoriesSelected = packageBox.Categories,
                CategoriesNotSelected = categoriesNotSelectedDTO,
                BranchesSelected = packageBox.Warehouses,
                WarehousesNotSelected = branchesNotSelectedDTO,
                Providers = packageBox.Providers
            };
            return answer;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] PackagesBoxCreationDTO toyCreationDTO)
        {
            var packageBox = await context.PackagesBoxsBoxBox
                .Include(x => x.PackagesBoxProviders)
                .Include(x => x.NewPackagesBox)
                .Include(x => x.PackagesBoxWarehouses)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (packageBox == null)
            {
                return NotFound();
            }

            packageBox = mapper.Map(toyCreationDTO, packageBox);

            if (toyCreationDTO.Image != null)
            {
                packageBox.Image = await storageFiles.EditFile(container, toyCreationDTO.Image, packageBox.Image);
            }

            OrderProviders(packageBox);

            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var packageBox = await context.PackagesBoxsBoxBox.FirstOrDefaultAsync(x => x.Id == id);

            if (packageBox == null)
            {
                return NotFound();
            }

            context.Remove(packageBox);
            await context.SaveChangesAsync();
            await storageFiles.DeleteFile(packageBox.Image, container);

            return NoContent();
        }

        private static void OrderProviders(PackagesBox packageBox)
        {
            if (packageBox.PackagesBoxProviders != null)
            {
                int order = 0;
                packageBox.PackagesBoxProviders.ToList().ForEach(tb => tb.Order = (order++));
            }
        }
    }
}