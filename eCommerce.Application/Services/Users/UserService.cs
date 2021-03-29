using AutoMapper;
using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Shared.Models;
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

        public async Task<PaginatedResult<UserReturnModels.User>> SearchUsersAsync(UserRequestModels.Search rq)
        {
            var users = await _userRepo.SearchAsync(new SearchUserModel
            {
                Keyword = rq.SearchTerm,
                Pagination = new Pagination { PageIndex = rq.PageIndex, ItemsPerPage = rq.PageSize },
            });

            return _mapper.Map<PaginatedResult<UserReturnModels.User>>(users);
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

        public async Task<Guid> RegisterUserAsync(UserRequestModels.Register rq)
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

        public async Task<PaginatedResult<UserReturnModels.ListUser>> ListUser(UserRequestModels.ListUser rq)
        {
            var users = await _userRepo.ListUserAsync(new ListUser
            {
                Keyword = rq.SearchTerm,
                Pagination = new Pagination { PageIndex = rq.PageIndex, ItemsPerPage = rq.PageSize },
                LockoutEnd = rq.LockoutEnd,
            });

            return _mapper.Map<PaginatedResult<UserReturnModels.ListUser>>(users);
        }

        public async Task<bool> UpdateLockoutUser(UserRequestModels.LockoutEnd rq)
        {
            var user = await _userRepo.GetByIdAsync(rq.Id);
            if (user != null)
            {
                user.LockoutEnd = rq.SetLockoutEnd;
                _userRepo.Update(user);
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
