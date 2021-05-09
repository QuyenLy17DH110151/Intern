using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace eCommerce.Application.Services.DashBoard
{
    public interface IDashBoardService
    {
        Task<decimal> GetSumEarnings();
        Task<int> GetCountUserAsync();
        Task<int> GetCountComment();
        Task<int> GetCountProduct();
    }
}
