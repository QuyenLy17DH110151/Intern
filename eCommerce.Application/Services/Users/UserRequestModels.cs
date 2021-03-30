using eCommerce.Domain.Shared;
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
        public class ListUser : Search
        {
            public bool IsLockout { get; set; }
        }
        public class LockoutEnd
        {
            public Guid Id { get; set; }
            public bool IsLockout { get; set; }
        }
    }
}
