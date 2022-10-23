using AutoMapper;
using DovaPackAPI.DTOs;
using DovaPackAPI.Entities;
using DovaPackAPI.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
            var warehouses = await queryable.OrderBy(x => x.Name).Paginate(paginationDTO).ToListAsync();
            return mapper.Map<List<WarehouseDTO>>(warehouses);
        }

        [HttpGet("{Id:int}")]
        public async Task<ActionResult<WarehouseDTO>> Get(int Id)
        {
            var warehouses = await context.Warehouses.FirstOrDefaultAsync(x => x.Id == Id);

            if (warehouses == null)
            {
                return NotFound();
            }

            return mapper.Map<WarehouseDTO>(warehouses);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] WarehouseCreationDTO warehouseCreationDTO)
        {
            var warehouse = mapper.Map<Warehouse>(warehouseCreationDTO);
            context.Add(warehouse);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int Id, [FromBody] WarehouseCreationDTO warehouseCreationDTO)
        {
            var warehouse = await context.Warehouses.FirstOrDefaultAsync(x => x.Id == Id);

            if (warehouse == null)
            {
                return NotFound();
            }

            warehouse = mapper.Map(warehouseCreationDTO, warehouse);

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