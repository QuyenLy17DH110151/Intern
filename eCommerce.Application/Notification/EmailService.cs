using eCommerce.Application.Notification;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.Email
{
    public class EmailService : IEmailService
    {
        private readonly IEmailSender _IEmailSender;

        public EmailService(IEmailSender IEmailSender)
        {
            _IEmailSender = IEmailSender;
        }

        public bool SendEmail(string from, string to, string subject, string content)
        {
            return _IEmailSender.SendEmail(from, to, subject, content);
        }
    }
}
