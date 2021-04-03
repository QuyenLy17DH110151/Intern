using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Shared
{
    public class ApplicationContext
    {
        public UserPrincipal Principal { get; set; }
    }

    public class UserPrincipal
    {
        public string UserId { get; }

        public string Username { get; }

        public string Role { get; set; }

        public UserPrincipal(string userId, string userName, string role)
        {
            UserId = userId;
            Username = userName;
            Role = role;
        }
    }
}
