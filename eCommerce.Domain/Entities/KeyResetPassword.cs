using System;
using System.Collections.Generic;
using System.Text;

namespace eCommerce.Domain.Entities
{
    public class KeyResetPassword
    {
        public string KeyParam { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
    }
}
