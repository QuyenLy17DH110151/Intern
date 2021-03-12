using AutoMapper;
using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.Users
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepo, IMapper mapper)
        {
            _userRepo = userRepo;
            _mapper = mapper;
        }

        public async Task<UserReturnModels.User> GetValidUserAsync(string username, string password)
        {
            var user = await _userRepo.GetUserByUsernameAsync(username);
            if (user == null)
            {
                return null;
            }

            // TODO: need to encrypt password and compare with PasswordHash
            if (user.PasswordHash == password)
            {
                return _mapper.Map<UserReturnModels.User>(user);
            }

            return null;
        }

        public async Task<Guid> RegisterUserAsync(UserRequestModels.RegisterUser rq)
        {
            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = rq.Username,
                PasswordHash = rq.Password // TODO: need to encrypt password here
            };

            _userRepo.Add(user);
            await _userRepo.UnitOfWork.SaveChangesAsync();

            return user.Id;
        }
    }
}
