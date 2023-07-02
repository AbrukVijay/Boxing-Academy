using System;
using System.Collections.Generic;

namespace dotnetapp.Models;

public partial class AdminModel
{
    public int AdminId { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }

    public string? Username { get; set; }

    public string? Mobilenumber { get; set; }

    public string? UserRole { get; set; }
}
