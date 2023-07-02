using System;
using System.Collections.Generic;

namespace dotnetapp.Models;

public partial class UserModel
{
    public int UserId { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public string? Username { get; set; }

    public string? Mobilenumber { get; set; }

    public string? UserRole { get; set; }

    public virtual ICollection<AdmissionModel> AdmissionModels { get; } = new List<AdmissionModel>();

    public virtual ICollection<ProgressModel> ProgressModels { get; } = new List<ProgressModel>();

    public virtual ICollection<RatingModel> RatingModels { get; } = new List<RatingModel>();
}
