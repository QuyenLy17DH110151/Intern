﻿using eCommerce.Application.Services.Users;
using eCommerce.Domain.Entities;
using eCommerce.Domain.Shared.Models;
using eCommerce.WebAPI.Infrastructure.Config;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace eCommerce.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly AppConfig _clienUrl;

        public UsersController(IUserService userService, AppConfig clienUrl)
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
            var id = await _userService.CreateUserAsync(rq, _clienUrl.FrontEndUrl);
            return id;
        }


        [HttpPost("reset-password")]
        [Authorize(Policy = "PermissionSeller")]
        public async Task<ActionResult> ResetPassword()
        {
            var username = User.Identity.Name;
            await _userService.ResetPasswordAsync(username, _clienUrl.FrontEndUrl);
            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> UpdatePassword([FromBody] UserRequestModels.UpdatePassword rq)
        {
             await _userService.UpdatePasswordAsync(rq);
            return Ok();
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
