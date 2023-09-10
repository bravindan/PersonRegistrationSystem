using Microsoft.EntityFrameworkCore;
using PRS.Models;

namespace PRS.DBConnection
{
    public class DbConnector:DbContext
    {
        public DbConnector(DbContextOptions options) : base(options) { }
        public DbSet<UserModel> Users { get; set; }
        public DbSet<SystemCodeModel> SystemCode { get; set; }
        public DbSet<SystemCodeDetailModel> SystemCodeDetail { get; set; }
        public DbSet<PersonManagerModel> PersonManager { get; set; }
        public DbSet<PersonModel> Person { get; set; }
        public DbSet<PersonDocumentModel> PersonDocument { get; set; }
        public DbSet<PersonDocumentManagerModel> PersonDocumentManager { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserModel>().Property(c => c.UserType)
               .HasConversion<string>(); // Store enum as string in the database
           
            base.OnModelCreating(modelBuilder);
        }


    }
}
