using eCommerce.Domain.Email;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Persistence.Email
{
    public class GmailConfigurationService : IEmailConfigurationService
    {


        public bool SendEmail(string from, string to, string subject, string content)
        {
            try
            {
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse(from));
                email.To.Add(MailboxAddress.Parse(to));
                email.Subject = subject;
                email.Body = new TextPart(TextFormat.Html) { Text = content };

                // send email
                using var smtp = new SmtpClient();
                smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                smtp.Authenticate("edommerce.intern2021@gmail.com", "intern2021");
                smtp.Send(email);
                smtp.Disconnect(true);
                return true;
            }
            catch (Exception exp)
            {
                System.Console.WriteLine(exp.ToString());
                return false;
            }
           
        }
    }
}
