using eCommerce.Domain.Email;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.Email
{
    public interface IEmailService
    {
        bool SendEmail(string from, string to, string subject, string content);
    }
}
