using eCommerce.Application.Services.Users;
using eCommerce.Domain.Entities;
using eCommerce.Domain.Shared.Models;
using Microsoft.AspNetCore.Authorization;
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
        [HttpPost]
        [Authorize(Policy = "PermissionAdmin")]
        public async Task<ActionResult<string>> CreateUser([FromBody] UserRequestModels.Create rq)
        {
            var id = await _userService.CreateUser(rq);
            return "Id User: " +id;
        }

        [HttpPut]
        public async Task<bool> UpdatePassword([FromBody] UserRequestModels.UpdatePassword rq)
        {
            var rp = await _userService.UpdatePassword(rq);

            return rp;
        }

    }
}
