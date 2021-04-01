﻿using eCommerce.Application.Services.Users;
using eCommerce.Domain.Entities;
using eCommerce.Domain.Shared.Models;
using eCommerce.WebAPI.Infrastructure.Config;
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
        private readonly ClientUrl _clienUrl;

        public UsersController(IUserService userService, ClientUrl clienUrl)
        {
            _userService = userService;
            _clienUrl = clienUrl;
        }

        [HttpGet]
        public async Task<ActionResult<PaginatedResult<UserReturnModels.User>>> Search([FromQuery] UserRequestModels.Search rq)
        {
            var users = await _userService.SearchUsersAsync(rq);
            return users;
        }
        [HttpPost]
        [Authorize(Policy = "PermissionAdmin")]
        public async Task<ActionResult<Guid>> CreateUser([FromBody] UserRequestModels.Create rq)
        {
            var id = await _userService.CreateUserAsync(rq, _clienUrl.URL);
            return id;
        }

        [HttpPut]
        public async Task<bool> UpdatePassword([FromBody] UserRequestModels.UpdatePassword rq)
        {
            var rp = await _userService.UpdatePassword(rq);

            return rp;
        }


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
    }
}
