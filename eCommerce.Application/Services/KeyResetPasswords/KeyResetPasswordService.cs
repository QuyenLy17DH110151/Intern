using AutoMapper;
using EasyEncryption;
using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.KeyResetPasswords
{
    public class KeyResetPasswordService: IKeyResetPasswordService
    {
        private const string SECRET = "ecommerce2021";
        private readonly IKeyResetPasswordRepository _repo;

        public KeyResetPasswordService(IKeyResetPasswordRepository keyResetPasswordRepository, IMapper mapper)
        {
            _repo = keyResetPasswordRepository;
           
        }

        public async Task<string> Add(User u)
        {
            KeyResetPassword keyResetPassword = new KeyResetPassword();
            keyResetPassword.User = u;
            DateTime now = DateTime.UtcNow;
            string key = u.Username + now.ToShortDateString() + SECRET;
            keyResetPassword.KeyParam = SHA.ComputeSHA256Hash(key);
            _repo.Add(keyResetPassword);
            if (keyResetPassword.Id == null)
            {
                return null;
            }
            
            return keyResetPassword.KeyParam;
        }

        public async Task<bool> CheckKeyParam(string username, string keyParam)
        {
            KeyResetPassword keyResetPassword = await _repo.findByUsername(username);
            if (keyResetPassword == null)
            {
                return false;
            }
            DateTime now = DateTime.UtcNow;
            string key = username + now.ToShortDateString() + SECRET;
            string keyParamHash = SHA.ComputeSHA256Hash(key);
            if (keyResetPassword.KeyParam == keyParamHash)
            {
                _repo.Remove(keyResetPassword);
                return true;
            }
            return false;
        }
    }
}
