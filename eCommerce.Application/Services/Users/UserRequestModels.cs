using eCommerce.Domain.Shared.Models;
using FluentValidation;
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

        public class Create
        {
            public string Username { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
        }

        public class CreateValidator: AbstractValidator<Create>
        {
            public CreateValidator()
            {
                RuleFor(c => c.Username).EmailAddress();
                RuleFor(c => c.FirstName).NotEmpty();
                RuleFor(c => c.LastName).NotEmpty();
            }
        }
    }
}
