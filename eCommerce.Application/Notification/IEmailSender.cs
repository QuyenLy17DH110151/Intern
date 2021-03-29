using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Notification
{
    public interface IEmailSender
    {
        bool SendEmail(string from, string to, string subject, string content);
    }
}
