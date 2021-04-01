using eCommerce.Domain.Entities;
using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.Users
{
    public interface IUserService
    {
        /// <summary>
        /// Checks and returns user if the username and password are valid
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        Task<UserReturnModels.User> GetValidUserAsync(string username, string password);

        /// <summary>
        /// Registers user
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        Task<Guid> RegisterUserAsync(UserRequestModels.Register rq);

        /// <summary>
        /// Searchs users by keyword and lockoutUser
        /// </summary>
        /// <param name="rq"></param>
        /// <returns></returns>
        Task<PaginatedResult<UserReturnModels.User>> SearchUsersAsync(UserRequestModels.Search rq);
        Task<string> CreateUser(UserRequestModels.Create rq);
        Task<bool> UpdatePassword(UserRequestModels.UpdatePassword rq);


        /// <summary>
        /// Lockout User
        /// </summary>
        /// <param name="Id User"></param>
        /// <returns></returns>
        Task<bool> LockoutUserAsync(Guid Id);

        /// <summary>
        /// Unlockout User
        /// </summary>
        /// <param name="Id User"></param>
        /// <returns></returns>
        Task<bool> UnlockUserAsync(Guid Id);
    }
}
