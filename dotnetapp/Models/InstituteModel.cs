using System;
using System.Collections.Generic;

namespace dotnetapp.Models;

public partial class InstituteModel
{
    public int InstituteId { get; set; }

    public string? InstituteName { get; set; }

    public string? InstituteDescription { get; set; }

    public string? InstituteAddress { get; set; }

    public string? Mobile { get; set; }

    public string? Email { get; set; }

    public string? ImageUrl { get; set; }

    public virtual ICollection<AdmissionModel> AdmissionModels { get; } = new List<AdmissionModel>();

    public virtual ICollection<CourseModel> CourseModels { get; } = new List<CourseModel>();

    public virtual ICollection<RatingModel> RatingModels { get; } = new List<RatingModel>();
}
