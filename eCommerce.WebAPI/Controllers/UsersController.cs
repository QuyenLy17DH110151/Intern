﻿using eCommerce.Application.Services.Users;
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
        public async Task<ActionResult<PaginatedResult<UserReturnModels.User>>> Search([FromQuery] UserRequestModels.Search rq)
        {
            var users = await _userService.SearchUsersAsync(rq);
            return users;
        }
<<<<<<< HEAD
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

=======

        [HttpPut("{Id}/Lockout")]
        public async Task<ActionResult> LockoutUser(Guid Id)
        {
            bool result = await _userService.LockoutUserAsync(Id);
            if (result == false)
            {
                return BadRequest();
            }
            return Ok();
        }

        [HttpPut("{Id}/Unlockout")]
        public async Task<ActionResult> UnLockoutUser(Guid Id)
        {
            bool result = await _userService.UnlockUserAsync(Id);
            if (result == false)
            {
                return BadRequest();
            }
            return Ok();
        }
>>>>>>> 56e86231d1205416ef82132fc24e5647ae04e41d
    }
}
