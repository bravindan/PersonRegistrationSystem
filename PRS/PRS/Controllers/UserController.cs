using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PRS.DBConnection;
using PRS.Models;

namespace PRS.Controllers
{
    [Route("api/[controller]")] //define the base route for all the action methods in the controller
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DbConnector connector;

        public UserController(DbConnector connector) //class is injected into the controller's constructor, allowing you to access your database.
        {
            this.connector = connector;
        }

        // Register a new user (currently storing passwords in plain text, not secure)
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<UserModel> Register(UserModel model)
        {
            // password is not encrypted
            connector.Users.Add(model);
            await connector.SaveChangesAsync();
            return model;
        }

        // User login
        [HttpPost("login")]
        public async Task<ActionResult> Login(UserModel model)
        {
            var user = await CheckUserExists(model.UserName, model.Password);
            if (user != null)
            {
                // Return user information (excluding sensitive data) upon successful login
                var userResponse = new
                {
                    user.Id,
                    user.UserName,
                    user.UserType
                };
                return Ok(userResponse);
            }

            // Unauthorized if login fails
            return Unauthorized();
        }

        // Get a list of all users
        [HttpGet("users")]
        public ActionResult<IEnumerable<UserModel>> GetUser()
        {
            IQueryable<UserModel> query = connector.Users;
            var users = query.ToList();
            return Ok(users);
        }

        // Helper method to check if a user with the provided username and password exists
        [ApiExplorerSettings(IgnoreApi = true)]
        private async Task<UserModel> CheckUserExists(string username, string password)
        {
            var user = await connector.Users.SingleOrDefaultAsync(u => u.UserName == username && u.Password == password);
            if (user != null)
            {
                return user;
            }
            return null;
        }
    }
}
