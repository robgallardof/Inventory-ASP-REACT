using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DovaPackAPI.DTOs;
using DovaPackAPI.Entities;
using DovaPackAPI.Utils;

namespace DovaPackAPI.Controllers
{
    [Route("api/provider")]
    [ApiController]
    public class ProviderController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IStorageFiles storageFiles;
        private readonly string container = "providers";

        public ProviderController(ApplicationDbContext context
            , IMapper mapper, IStorageFiles storageFiles)
        {
            this.context = context;
            this.mapper = mapper;
            this.storageFiles = storageFiles;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProviderDTO>>> Get([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = context.Providers.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var providers = await queryable.OrderBy(x => x.Name).Paginate(paginationDTO).ToListAsync();
            return mapper.Map<List<ProviderDTO>>(providers);
        }

        [HttpGet("findByName/{name}")]
        public async Task<List<PackagesBoxProviderDTO>> FindByName(string name = "")
        {
            if (string.IsNullOrWhiteSpace(name)) { return new List<PackagesBoxProviderDTO>(); }

            return await context.Providers
                .Where(x => x.Name.Contains(name))
                .OrderBy(x => x.Name)
                .Select(x => new PackagesBoxProviderDTO { Id = x.Id, Name = x.Name, Image = x.Image })
                .Take(5)
                .ToListAsync();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProviderDTO>> Get(int id)
        {
            var provider = await context.Providers.FirstOrDefaultAsync(x => x.Id == id);

            if (provider == null)
            {
                return NotFound();
            }

            return mapper.Map<ProviderDTO>(provider);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromForm] ProviderCreationDTO providerCreationDTO)
        {
            var provider = mapper.Map<Provider>(providerCreationDTO);

            if (providerCreationDTO.Image != null)
            {
                provider.Image = await storageFiles.SaveFile(container, providerCreationDTO.Image);
            }

            context.Add(provider);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] ProviderCreationDTO providerCreationDTO)
        {
            var provider = await context.Providers.FirstOrDefaultAsync(x => x.Id == id);

            if (provider == null)
            {
                return NotFound();
            }

            provider = mapper.Map(providerCreationDTO, provider);

            if (providerCreationDTO.Image != null)
            {
                provider.Image = await storageFiles.EditFile(container, providerCreationDTO.Image, provider.Image);
            }

            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var provider = await context.Providers.FirstOrDefaultAsync(x => x.Id == id);

            if (provider == null)
            {
                return NotFound();
            }

            context.Remove(provider);
            await context.SaveChangesAsync();
            await storageFiles.DeleteFile(provider.Image, container);
            return NoContent();
        }
    }
}