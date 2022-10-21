using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DovaPackAPI.DTOs;
using DovaPackAPI.Entities;
using DovaPackAPI.Utils;

namespace DovaPackAPI.Controllers
{
    [ApiController]
    [Route("api/warehouse")]
    public class WarehouseController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public WarehouseController(ApplicationDbContext context,
            IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<WarehouseDTO>>> Get([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = context.Warehouses.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var branches = await queryable.OrderBy(x => x.Name).Paginate(paginationDTO).ToListAsync();
            return mapper.Map<List<WarehouseDTO>>(branches);
        }

        [HttpGet("{Id:int}")]
        public async Task<ActionResult<WarehouseDTO>> Get(int Id)
        {
            var branches = await context.Warehouses.FirstOrDefaultAsync(x => x.Id == Id);

            if (branches == null)
            {
                return NotFound();
            }

            return mapper.Map<WarehouseDTO>(branches);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] WarehouseCreationDTO branchCreationDTO)
        {
            var branch = mapper.Map<Warehouse>(branchCreationDTO);
            context.Add(branch);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int Id, [FromBody] WarehouseCreationDTO branchCreationDTO)
        {
            var branch = await context.Warehouses.FirstOrDefaultAsync(x => x.Id == Id);

            if (branch == null)
            {
                return NotFound();
            }

            branch = mapper.Map(branchCreationDTO, branch);

            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var exist = await context.Warehouses.AnyAsync(x => x.Id == id);

            if (!exist)
            {
                return NotFound();
            }

            context.Remove(new Warehouse() { Id = id });
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}