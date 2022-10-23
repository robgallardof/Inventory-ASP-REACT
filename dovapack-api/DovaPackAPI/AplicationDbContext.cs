using DovaPackAPI.Controllers.Entities;
using DovaPackAPI.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DovaPackAPI
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PackagesBoxProviders>()
                .HasKey(x => new { x.ProviderId, x.PackagesBoxId });

            modelBuilder.Entity<PackagesBoxCategories>()
             .HasKey(x => new {  x.PackageBoxId, x.CategoryId, });

            modelBuilder.Entity<PackagesBoxWarehouses>()
            .HasKey(x => new {  x.PackagesBoxId, x.WarehouseId, });

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Provider> Providers { get; set; }

        public DbSet<Warehouse> Warehouses { get; set; }

        public DbSet<PackageBox> PackageBox { get; set; }

        public DbSet<PackagesBoxProviders> PackagesBoxProviders { get; set; }

        public DbSet<PackagesBoxCategories> PackagesBoxCategories { get; set; }

        public DbSet<PackagesBoxWarehouses> PackagesBoxWarehouses { get; set; }

        public DbSet<Rating> Ratings { get; set; }
    }
}