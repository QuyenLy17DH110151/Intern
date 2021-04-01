<<<<<<< HEAD
﻿using eCommerce.Domain.Shared.Models;
using FluentValidation;
=======
﻿using eCommerce.Domain.Shared;
using eCommerce.Domain.Shared.Models;
>>>>>>> 56e86231d1205416ef82132fc24e5647ae04e41d
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
            public bool IsLockout { get; set; }
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
        
        public class UpdatePassword
        {
            public string Username { get; set; }
            public string KeyParam { get; set; }
            public string Password { get; set; }
        }

        public class UpdatePasswordValidator : AbstractValidator<UpdatePassword>
        {
            public UpdatePasswordValidator()
            {
                RuleFor(c => c.Username).EmailAddress();
                RuleFor(c => c.KeyParam).NotEmpty();
                RuleFor(c => c.Password).MinimumLength(6);
            }
        }
    }
}
