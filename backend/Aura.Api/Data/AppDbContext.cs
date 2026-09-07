using Microsoft.EntityFrameworkCore;
using Aura.Api.Models;

namespace Aura.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<Material> Materials => Set<Material>();
    public DbSet<Inquiry> Inquiries => Set<Inquiry>();
    public DbSet<CmsSetting> CmsSettings => Set<CmsSetting>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<Inquiry>()
            .HasIndex(i => i.SubmittedAt);

        modelBuilder.Entity<AuditLog>()
            .HasIndex(a => a.Timestamp);
    }
}
