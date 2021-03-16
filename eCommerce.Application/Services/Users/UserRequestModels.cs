using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Application.Services.Users
{
    public static class UserRequestModels
    {
        public class Register
        {
            public string Username { get; set; }

            public string Password { get; set; }
        }

        public class Search
        {
            public string SearchTerm { get; set; }

            public int PageIndex { get; set; }

            public int PageSize { get; set; }

            public string Sort { get; set; }
        }
    }
}
