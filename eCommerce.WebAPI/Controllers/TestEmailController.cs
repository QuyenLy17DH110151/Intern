using eCommerce.Application.Notification;
using eCommerce.WebAPI.Infrastructure.Config;
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
        private readonly ClientUrl _clienUrl;
        public TestEmailController(ClientUrl clienUrl)
        {
            _clienUrl = clienUrl;
        }

        /*private readonly IPattenSendEmail _pattenSendEmail;

        public TestEmailController(EmailResetPassword emailResetPassword)
        {
            _pattenSendEmail = emailResetPassword;
        }

        [HttpGet]
        public bool testEmail()
        {
            return _pattenSendEmail.SendEmail("eCommerce", "nam03031999@gmail.com", "test", "http://localhost:4200/");
        }
*/
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
            return _clienUrl.URL;
        }
    }
}
