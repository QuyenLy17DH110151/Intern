using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.Users
{
    public static class UserRequestModels
    {
        public class RegisterUser
        {
            public string Username { get; set; }

            public string Password { get; set; }
        }
    }
}
