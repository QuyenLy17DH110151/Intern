using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.Users
{
    public interface IUserService
    {
        Task<bool> CheckValidUserAsync(string username, string password);
    }
}
