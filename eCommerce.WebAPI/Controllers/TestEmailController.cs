using eCommerce.Application.Services.Email;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eCommerce.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestEmailController : ControllerBase
    {
        private readonly IEmailService _emailService;
        
        public TestEmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpGet]
        public bool testEmail()
        {
            return _emailService.SendEmail("edommerce.intern2021@gmail.com", "nam03031999@gmail.com", "test", "hello");
        }

        [HttpGet("admin")]
        [Authorize(Policy = "PermissionAdmin")]
        public string testAdmin()
        {
            return "admin";
        }

        [HttpGet("seller")]
        [Authorize(Policy = "PermissionSeller")]
        public string testSeller()
        {
            return "seller";
        }

        [HttpGet("no")]
        public string testNo()
        {
            return "no";
        }
    }
}
