using System;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/")]
    public class AuthController : Controller
    {
         private readonly MyProjectDbContext dbContext;

        public AuthController(MyProjectDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("user/login")]
        public async Task<bool> IsUserPresent([FromBody] LoginModel data)
        {
            string email = data.Email;
            string password = data.Password;

            UserModel? user = await dbContext.UserModels.SingleOrDefaultAsync(u => u.Email == email);

            if (user != null && user.Password == password)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        [HttpPost("admin/login")]
        public async Task<bool> IsAdminPresent([FromBody] LoginModel data)
        {
            string email = data.Email;
            string password = data.Password;

            AdminModel? admin = await dbContext.AdminModels.SingleOrDefaultAsync(u => u.Email == email);

            if (admin != null && admin.Password == password)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        [HttpPost("user/signup")]
        public async Task<IActionResult> SaveUser([FromBody] UserModel user)
        {
            try
            {
                dbContext.UserModels.Add(user);
                await dbContext.SaveChangesAsync();
                return Ok("User record created successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating user record");
            }
        }

        [HttpPost("admin/signup")]
        public async Task<IActionResult> SaveAdmin([FromBody] AdminModel admin)
        {
            try
            {
                dbContext.AdminModels.Add(admin);
                await dbContext.SaveChangesAsync();
                return Ok("Admin record created successfully");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating admin record");
            }
        }

        [HttpGet("{email}/username")]
        public async Task<IActionResult> GetUsernameByEmail(string email)
        {
            var user = await dbContext.UserModels.FirstOrDefaultAsync(u => u.Email == email);
            var admin = await dbContext.AdminModels.FirstOrDefaultAsync(a => a.Email == email);

            if (user != null)
            {
                return Ok(user.Username);
            }
            else if (admin != null)
            {
                return Ok(admin.Username);
            }
            else
            {
                return NotFound();
            }
        }


        [HttpGet("user/{email}")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var user = await dbContext.UserModels.FirstOrDefaultAsync(u => u.Email == email);

            if (user != null)
            {
                var userInfo = new
                {
                    UserId = user.UserId,
                    Username = user.Username,
                    Email = user.Email,
                    // Add any other properties you want to include
                };

                return Ok(userInfo);
            }
            else
            {
                return NotFound();
            }
        }
        
    }


}
