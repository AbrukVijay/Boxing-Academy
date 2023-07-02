using System;
using System.Collections.Generic;

namespace dotnetapp.Models;

public partial class AdmissionModel
{
    public int AdmissionId { get; set; }

    public int? StudentId { get; set; }

    public int? CourseId { get; set; }

    public int? InstituteId { get; set; }

    public int? UserId { get; set; }

    public DateTime? DateOfJoining { get; set; }

    public DateTime? EndDate { get; set; }

    public virtual CourseModel? Course { get; set; }

    public virtual InstituteModel? Institute { get; set; }

    public virtual StudentModel? Student { get; set; }

    public virtual UserModel? User { get; set; }
}
