using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Seedwork;
using eCommerce.Domain.Shared.Models;
using eCommerce.Persistence.QueryObjects;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Persistence.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly GenericRepository<User> _genericRepo;

        public IUnitOfWork UnitOfWork => _dbContext;

        public UserRepository(ApplicationDbContext context)
        {
            _dbContext = context;
            _genericRepo = new GenericRepository<User>(_dbContext.Set<User>());
        }

        public User Add(User user)
        {
            return _genericRepo.Add(user);
        }

        public Task<User> GetByIdAsync(Guid id)
        {
            return _genericRepo.GetByIdAsync(id);
        }

        public void Update(User user)
        {
            _genericRepo.Update(user);
            _dbContext.SaveChanges();
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            var user = await _dbContext.Set<User>().SingleOrDefaultAsync(x => x.Username == username);
            return user;
        }

        public async Task<PaginatedResult<User>> SearchAsync(SearchUserModel rq)
        {
            // filter
            var queryObject = QueryObject<User>.Empty;

            if (!string.IsNullOrWhiteSpace(rq.Keyword))
            {
                var keyword = rq.Keyword;
                queryObject.And(new UserQueryObjects.ContainsKeyword(keyword));
            }
            // orderby
            if (!rq.Sort.Any())
            {
                rq.Sort.Add(new SortItem { FieldName = nameof(User.IdentityKey) });
            }

            rq.Sort.ForEach(x => queryObject.AddOrderBy(x.FieldName, x.IsDescending));


            // execute
            var result = await _genericRepo.SearchAsync(queryObject, rq.Pagination);
            return result;
        }

        public async Task<PaginatedResult<User>> ListUserAsync(ListUser rq)
        {
            // filter
            var queryObject = QueryObject<User>.Empty;

            if (!string.IsNullOrWhiteSpace(rq.Keyword))
            {
                var keyword = rq.Keyword;
                queryObject.And(new UserQueryObjects.ContainsKeyword(keyword));
            }

            // filter lockout status
            if (rq.IsLockout)
            {
                queryObject.And(new UserQueryObjects.LockoutEndDate(rq.IsLockout));
            }

            // orderby
            if (!rq.Sort.Any())
            {
                rq.Sort.Add(new SortItem { FieldName = nameof(User.IdentityKey) });
            }

            rq.Sort.ForEach(x => queryObject.AddOrderBy(x.FieldName, x.IsDescending));


            // execute
            var result = await _genericRepo.SearchAsync(queryObject, rq.Pagination);
            return result;
        }
    }
}
