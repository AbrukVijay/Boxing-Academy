using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Models;

public partial class MyProjectDbContext : DbContext
{
    public MyProjectDbContext()
    {
    }

    public MyProjectDbContext(DbContextOptions<MyProjectDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AdminModel> AdminModels { get; set; }

    public virtual DbSet<AdmissionModel> AdmissionModels { get; set; }

    public virtual DbSet<CourseModel> CourseModels { get; set; }

    public virtual DbSet<InstituteModel> InstituteModels { get; set; }

    public virtual DbSet<LoginModel> LoginModels { get; set; }

    public virtual DbSet<ProgressModel> ProgressModels { get; set; }

    public virtual DbSet<RatingModel> RatingModels { get; set; }

    public virtual DbSet<StudentModel> StudentModels { get; set; }

    public virtual DbSet<UserModel> UserModels { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        
    }
// #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//         => optionsBuilder.UseSqlServer("Server=DESKTOP-9537ONK\\SQLEXPRESS;database=MyProjectDB;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AdminModel>(entity =>
        {
            entity.HasKey(e => e.AdminId).HasName("PK__AdminMod__AD0500A6369B6B12");

            entity.ToTable("AdminModel");

            entity.Property(e => e.AdminId).HasColumnName("adminId");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Mobilenumber)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("mobilenumber");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.UserRole)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("userRole");
            entity.Property(e => e.Username)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("username");
        });

        modelBuilder.Entity<AdmissionModel>(entity =>
        {
            entity.HasKey(e => e.AdmissionId).HasName("PK__Admissio__705A82597997CD82");

            entity.ToTable("AdmissionModel");

            entity.Property(e => e.AdmissionId).HasColumnName("admissionId");
            entity.Property(e => e.CourseId).HasColumnName("courseId");
            entity.Property(e => e.DateOfJoining)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("date");
            entity.Property(e => e.EndDate).HasColumnType("date");
            entity.Property(e => e.InstituteId).HasColumnName("instituteId");
            entity.Property(e => e.StudentId).HasColumnName("studentId");
            entity.Property(e => e.UserId).HasColumnName("userId");

            entity.HasOne(d => d.Course).WithMany(p => p.AdmissionModels)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK__Admission__cours__46E78A0C");

            entity.HasOne(d => d.Institute).WithMany(p => p.AdmissionModels)
                .HasForeignKey(d => d.InstituteId)
                .HasConstraintName("FK__Admission__insti__47DBAE45");

            entity.HasOne(d => d.Student).WithMany(p => p.AdmissionModels)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("FK__Admission__stude__45F365D3");

            entity.HasOne(d => d.User).WithMany(p => p.AdmissionModels)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__Admission__userI__48CFD27E");
        });

        modelBuilder.Entity<CourseModel>(entity =>
        {
            entity.HasKey(e => e.CourseId).HasName("PK__CourseMo__2AA84FD1D486C4A8");

            entity.ToTable("CourseModel");

            entity.Property(e => e.CourseId).HasColumnName("courseId");
            entity.Property(e => e.CourseDescription)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("courseDescription");
            entity.Property(e => e.CourseDuration).HasColumnName("courseDuration");
            entity.Property(e => e.CourseName)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("courseName");
            entity.Property(e => e.CourseTiming)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("courseTiming");
            entity.Property(e => e.InstituteId).HasColumnName("instituteId");

            entity.HasOne(d => d.Institute).WithMany(p => p.CourseModels)
                .HasForeignKey(d => d.InstituteId)
                .HasConstraintName("FK__CourseMod__insti__300424B4");
        });

        modelBuilder.Entity<InstituteModel>(entity =>
        {
            entity.HasKey(e => e.InstituteId).HasName("PK__Institut__AF018B2C22D06BEA");

            entity.ToTable("InstituteModel");

            entity.Property(e => e.InstituteId).HasColumnName("instituteId");
            entity.Property(e => e.Email)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.InstituteAddress)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("instituteAddress");
            entity.Property(e => e.InstituteDescription)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("instituteDescription");
            entity.Property(e => e.InstituteName)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("instituteName");
            entity.Property(e => e.Mobile)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("mobile");
        });

        modelBuilder.Entity<LoginModel>(entity =>
        {
            entity.HasKey(e => e.LoginId).HasName("PK__LoginMod__1F5EF4CFC1E14979");

            entity.ToTable("LoginModel");

            entity.Property(e => e.LoginId).HasColumnName("loginId");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("password");
        });

        modelBuilder.Entity<ProgressModel>(entity =>
        {
            entity.HasKey(e => e.ProgressId).HasName("PK__Progress__0F2BDC7DD440057D");

            entity.ToTable("ProgressModel");

            entity.Property(e => e.ProgressId).HasColumnName("progressId");
            entity.Property(e => e.CourseId).HasColumnName("courseId");
            entity.Property(e => e.Progresspercentage)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("progresspercentage");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Timetamp).HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("userId");

            entity.HasOne(d => d.Course).WithMany(p => p.ProgressModels)
                .HasForeignKey(d => d.CourseId)
                .HasConstraintName("FK__ProgressM__cours__4222D4EF");

            entity.HasOne(d => d.User).WithMany(p => p.ProgressModels)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__ProgressM__userI__412EB0B6");
        });

        modelBuilder.Entity<RatingModel>(entity =>
        {
            entity.HasKey(e => e.RatingId).HasName("PK__RatingMo__2D290CA9E885F9D3");

            entity.ToTable("RatingModel");

            entity.Property(e => e.RatingId).HasColumnName("ratingId");
            entity.Property(e => e.Comments)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.InstituteId).HasColumnName("instituteId");
            entity.Property(e => e.UserId).HasColumnName("userId");

            entity.HasOne(d => d.Institute).WithMany(p => p.RatingModels)
                .HasForeignKey(d => d.InstituteId)
                .HasConstraintName("FK__RatingMod__insti__36B12243");

            entity.HasOne(d => d.User).WithMany(p => p.RatingModels)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__RatingMod__userI__37A5467C");
        });

        modelBuilder.Entity<StudentModel>(entity =>
        {
            entity.HasKey(e => e.StudentId).HasName("PK__StudentM__4D11D63C02C9D51F");

            entity.ToTable("StudentModel");

            entity.Property(e => e.StudentId).HasColumnName("studentId");
            entity.Property(e => e.AlternateMobile)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("alternateMobile");
            entity.Property(e => e.AreaName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("areaName");
            entity.Property(e => e.CourseId).HasColumnName("courseId");
            entity.Property(e => e.Email)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.FatherName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("fatherName");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("firstName");
            entity.Property(e => e.Gender)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.HouseNo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("lastName");
            entity.Property(e => e.Mobile)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.MotherName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("motherName");
            entity.Property(e => e.Nationality)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.State)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.StreetName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("streetName");

            entity.HasOne(d => d.Course).WithMany(p => p.StudentModels)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__StudentMo__cours__33D4B598");
        });

        modelBuilder.Entity<UserModel>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__UserMode__CB9A1CFF8642E627");

            entity.ToTable("UserModel");

            entity.Property(e => e.UserId).HasColumnName("userId");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Mobilenumber)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("mobilenumber");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.UserRole)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("userRole");
            entity.Property(e => e.Username)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("username");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
