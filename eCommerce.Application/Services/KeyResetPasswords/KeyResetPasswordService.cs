using AutoMapper;
using EasyEncryption;
using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Shared.Exceptions;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.KeyResetPasswords
{
    public class KeyResetPasswordService : IKeyResetPasswordService
    {
        private const string SECRET = "ecommerce2021";
        private readonly IKeyResetPasswordRepository _repo;


        public KeyResetPasswordService(IKeyResetPasswordRepository keyResetPasswordRepository, IMapper mapper)
        {
            _repo = keyResetPasswordRepository;

        }

        private string generateKeyParama(string email)
        {

            DateTime now = DateTime.UtcNow;
            string key = email + now.ToShortDateString() + SECRET;
            return SHA.ComputeSHA256Hash(key);
        }
       
        public async Task<string> AddAsync(User u)
        {
            //check user reseted pass, if yes will remove token exsist
            var keyResetPasswordRemove = await _repo.FindByUsername(u.Username);
            if (keyResetPasswordRemove != null)
            {
                _repo.Remove(keyResetPasswordRemove);
            }
            //create key and add into DB
            KeyResetPassword keyResetPassword = new KeyResetPassword();
            keyResetPassword.Id = Guid.NewGuid();
            keyResetPassword.User = u;
            keyResetPassword.KeyParam = generateKeyParama(u.Username);
            _repo.Add(keyResetPassword);
            return keyResetPassword.KeyParam;
        }

        public async Task VerifyKeyAsync(string username, string keyParam)
        {
            var keyResetPassword = await _repo.FindByUsername(username);
            if (keyResetPassword == null)
            {
                throw new BusinessException("token or username invalid");
            }
            string keyParamHash = generateKeyParama(username);
            if (keyResetPassword.KeyParam != keyParamHash)
            {
                throw new BusinessException("token or username invalid");
            }
            _repo.Remove(keyResetPassword);
            
        }
    }
}
