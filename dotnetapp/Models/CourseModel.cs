using System;
using System.Collections.Generic;

namespace dotnetapp.Models;

public partial class CourseModel
{
    public int CourseId { get; set; }

    public string? CourseName { get; set; }

    public string? CourseDescription { get; set; }

    public int CourseDuration { get; set; }

    public string? CourseTiming { get; set; }

    public int? InstituteId { get; set; }

    public virtual ICollection<AdmissionModel> AdmissionModels { get; } = new List<AdmissionModel>();

    public virtual InstituteModel? Institute { get; set; }

    public virtual ICollection<ProgressModel> ProgressModels { get; } = new List<ProgressModel>();

    public virtual ICollection<StudentModel> StudentModels { get; } = new List<StudentModel>();
}
