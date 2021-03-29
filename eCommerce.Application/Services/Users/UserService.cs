using AutoMapper;
using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Shared.Models;
using System;
using System.Threading.Tasks;
using EasyEncryption;
using eCommerce.Domain.Shared;

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
            
            if (user.PasswordHash == SHA.ComputeSHA256Hash(password))
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

        public async Task<string> CreateUser(UserRequestModels.Create rq)
        {
            var user = await _userRepo.GetUserByUsernameAsync(rq.Username);
            if (user != null)
            {
                return null;
            }
            User u = new User();
            u.Role = UserRoles.Seller;
            u.FirstName = rq.FirstName;
            u.LastName = rq.LastName;
            u.Username = rq.Username;
            
            _userRepo.Add(u);

            await _userRepo.UnitOfWork.SaveChangesAsync();
            return u.Id + "";
        }
    }
}
