using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Email
{
    public interface IEmailConfigurationService
    {
        bool SendEmail(string from, string to, string subject, string content);
    }
}
