using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using DovaPackAPI.Controllers.Entities;
using DovaPackAPI.DTOs;
using DovaPackAPI.Utils;

namespace DovaPackAPI.Controllers
{
    [Route("api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ILogger<CategoryController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public CategoryController(ILogger<CategoryController> logger,
            ApplicationDbContext context,
            IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<CategoryDTO>>> Get([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = context.Categories.AsQueryable();
            await HttpContext.InsertParameterPaginationInHeader(queryable);
            var categories = await queryable.OrderBy(x => x.Name).Paginate(paginationDTO).ToListAsync();
            var rt = mapper.Map<List<CategoryDTO>>(categories);
            return rt;
        }

        [HttpGet("all")]
        [AllowAnonymous]
        public async Task<ActionResult<List<CategoryDTO>>> All()
        {
            var categories = await context.Categories.OrderBy(x => x.Name).ToListAsync();
            return mapper.Map<List<CategoryDTO>>(categories);
        }


        [HttpGet("{Id:int}")]
        public async Task<ActionResult<CategoryDTO>> Get(int Id)
        {
            var category = await context.Categories.FirstOrDefaultAsync(x => x.Id == Id);

            if (category == null)
            {
                return NotFound();
            }

            return mapper.Map<CategoryDTO>(category);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CategoryCreationDTO categoryCreationDTO)
        {
            var category = mapper.Map<Category>(categoryCreationDTO);
            context.Add(category);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] CategoryCreationDTO categoryCreationDTO)
        {
            var category = await context.Categories.FirstOrDefaultAsync(x => x.Id == id);

            if (category == null)
            {
                return NotFound();
            }

            category = mapper.Map(categoryCreationDTO, category);

            await context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var exist = await context.Categories.AnyAsync(x => x.Id == id);

            if (!exist)
            {
                return NotFound();
            }

            context.Remove(new Category() { Id = id });

            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}