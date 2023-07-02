using System;
using System.Collections.Generic;

namespace dotnetapp.Models;

public partial class LoginModel
{
    public int LoginId { get; set; }

    public string? Email { get; set; }

    public string? Password { get; set; }
}
