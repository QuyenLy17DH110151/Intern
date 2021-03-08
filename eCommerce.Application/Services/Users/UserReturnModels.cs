using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.Users
{
    public static class UserReturnModels
    {
        public class User
        {
            public Guid Id { get; set; }

            public string Username { get; set; }
        }
    }
}
