using eCommerce.Domain.Email;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.Email
{
    public class EmailService : IEmailService
    {
        private readonly IEmailConfigurationService _emailConfigurationService;

        public EmailService(IEmailConfigurationService emailConfigurationService)
        {
            _emailConfigurationService = emailConfigurationService;
        }

        public bool SendEmail(string from, string to, string subject, string content)
        {
            return _emailConfigurationService.SendEmail(from, to, subject, content);
        }
    }
}
