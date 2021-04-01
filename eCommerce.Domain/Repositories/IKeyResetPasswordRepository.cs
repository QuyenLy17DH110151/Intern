using eCommerce.Domain.Entities;
using eCommerce.Domain.Seedwork;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Domain.Repositories
{
    public interface IKeyResetPasswordRepository : IRepository<KeyResetPassword>
    {
        KeyResetPassword Add(KeyResetPassword keyResetPassword);
        Task<KeyResetPassword> findByUsername(string username);
        void Remove(KeyResetPassword keyResetPassword);
    }
}
