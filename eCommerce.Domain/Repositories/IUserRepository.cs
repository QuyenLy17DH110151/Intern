using eCommerce.Domain.Entities;
using eCommerce.Domain.Seedwork;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Domain.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        User Add(User company);

        void Update(User company);

        Task<User> GetByIdAsync(Guid id);
    }
}
