using System;
using System.Collections.Generic;

namespace dotnetapp.Models;

public partial class RatingModel
{
    public int RatingId { get; set; }

    public int? Rating { get; set; }

    public string? Comments { get; set; }

    public int? InstituteId { get; set; }

    public int? UserId { get; set; }

    public virtual InstituteModel? Institute { get; set; }

    public virtual UserModel? User { get; set; }
}
