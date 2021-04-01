using AutoMapper;
using eCommerce.Domain.Shared;
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
<<<<<<< HEAD

            public UserRoles Role { get; set; }

=======
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public DateTime? LockoutEnd { get; set; }
            public DateTime CreatedDate { get; set; }
            public string CreatedBy { get; set; }
            public DateTime? LastUpdated { get; set; }
            public string LastUpdatedBy { get; set; }
            public UserRoles Role { get; set; }
>>>>>>> 56e86231d1205416ef82132fc24e5647ae04e41d
        }
        public class MappingProfile : Profile
        {
            public MappingProfile()
            {
                CreateMap<Domain.Entities.User, User>();
            }
        }
    }
}
