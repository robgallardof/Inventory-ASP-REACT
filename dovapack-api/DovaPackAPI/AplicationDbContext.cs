using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using DovaPackAPI.Controllers.Entities;
using DovaPackAPI.Entities;

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

            modelBuilder.Entity<NewPackagesBox>()
             .HasKey(x => new { x.PackagesBoxId, x.CategoryId });

            modelBuilder.Entity<PackagesBoxWarehouses>()
             .HasKey(x => new { x.PackagesBoxId, x.BranchId });

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Provider> Providers { get; set; }

        public DbSet<Warehouse> Warehouses { get; set; }

        public DbSet<PackagesBox> PackagesBoxsBoxBox { get; set; }

        public DbSet<PackagesBoxProviders> PackagesBoxProviders { get; set; }

        public DbSet<NewPackagesBox> NewPackagesBox { get; set; }

        public DbSet<PackagesBoxWarehouses> PackagesBoxWarehouses { get; set; }

        public DbSet<Rating> Ratings { get; set; }
    }
}