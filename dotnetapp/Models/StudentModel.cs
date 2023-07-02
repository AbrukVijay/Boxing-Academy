using System;
using System.Collections.Generic;

namespace dotnetapp.Models;

public partial class StudentModel
{
    public int StudentId { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Mobile { get; set; }

    public int? Age { get; set; }

    public string? Gender { get; set; }

    public string? HouseNo { get; set; }

    public string? StreetName { get; set; }

    public string? AreaName { get; set; }

    public string? State { get; set; }

    public int? Pincode { get; set; }

    public string? Nationality { get; set; }

    public int? CourseId { get; set; }

    public string? FatherName { get; set; }

    public string? MotherName { get; set; }

    public string? Email { get; set; }

    public string? AlternateMobile { get; set; }

    public virtual ICollection<AdmissionModel> AdmissionModels { get; } = new List<AdmissionModel>();

    public virtual CourseModel? Course { get; set; }
}
