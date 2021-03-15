using eCommerce.Application.Services.Users;
using eCommerce.Domain.Shared.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eCommerce.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<PaginatedResult<UserReturnModels.User>>> Search([FromQuery]UserRequestModels.Search rq)
        {
            var users = await _userService.SearchUsersAsync(rq);
            return users;
        }
    }
}
