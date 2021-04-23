using AutoMapper;
using eCommerce.Application.Shared;
using eCommerce.Domain.Entities;
using eCommerce.Domain.Repositories;
using eCommerce.Domain.Repositories.Models;
using eCommerce.Domain.Shared;
using eCommerce.Domain.Shared.Exceptions;
using eCommerce.Domain.Shared.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.Inventories
{
    public class InventoryService : IInventoryService
    {
        private readonly IInventoryRepository _inventoryRepo;
        private readonly IMapper _mapper;
        private readonly ApplicationContext _applicationContext;
        private readonly IProductRepository _productRepository;
        private readonly IUserRepository _userRepository;
        public InventoryService(IInventoryRepository inventoryRepo, IMapper mapper, ApplicationContext applicationContext, IProductRepository productRepository, IUserRepository userRepository)
        {
            _inventoryRepo = inventoryRepo;
            _mapper = mapper;
            _applicationContext = applicationContext;
            _productRepository = productRepository;
            _userRepository = userRepository;
        }

       public async Task<PaginatedResult<InventoryReturnModels.Inventory>> SearchInventoriesAsync(InventoryRequestModels.Search rq)
        {
            
            var inventories = await _inventoryRepo.SearchAsync(new SearchInventoryModel
            {
                ProductName = rq.ProductName,
                OwnerUserame = rq.OwnerUsername,
                Pagination = new Pagination { PageIndex = rq.PageIndex, ItemsPerPage = rq.PageSize },
                Username = _applicationContext.Principal.Username,
                Role = _applicationContext.Principal.Role
            }); 


            return _mapper.Map<PaginatedResult<InventoryReturnModels.Inventory>>(inventories);
        }


        public async Task UpdateAsync(InventoryRequestModels.Update rq)
        {
            var inventory = await _inventoryRepo.FindByIdAsync(rq.Id);
            if (inventory == null)
            {
                throw new EntityNotFound("inventory");
            }

            //check permission of user with inventory 
            string username = _applicationContext.Principal.Username;
            var product = await _productRepository.GetProductByIdAsync(inventory.ProductId);
            var owner = await _userRepository.GetByIdAsync(product.OwnerId);
            if (owner.Username != username)
            {
                throw new BusinessException("User not permission");
            }
            //set rowVersion and quantity to request
            byte[] rowVersion = new byte[rq.RowVersion.Length];
            int i = 0;
            foreach(string s in rq.RowVersion)
            {
                rowVersion[i] = byte.Parse(s);
                i++;
            }
            inventory.Quantity = rq.Quantity;
            inventory.RowVersion = rowVersion;
            _inventoryRepo.Update(inventory);
            await _inventoryRepo.UnitOfWork.SaveChangesAsync();
        }
    }
}
