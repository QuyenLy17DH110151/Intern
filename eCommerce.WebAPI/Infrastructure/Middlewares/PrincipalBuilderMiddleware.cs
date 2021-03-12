using eCommerce.Application.Shared;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace eCommerce.WebAPI.Infrastructure.Middlewares
{
    public class PrincipalBuilderMiddleware
    {
        private readonly RequestDelegate _next;

        public PrincipalBuilderMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var ctx = (ApplicationContext)context.RequestServices.GetService(typeof(ApplicationContext));

            var username = "anonymous";
            string userId = null;

            if (context.User.Identity.IsAuthenticated)
            {
                foreach (var claim in context.User.Claims)
                {
                    switch (claim.Type)
                    {
                        case ClaimTypes.Name:
                            username = claim.Value;
                            break;
                        case ClaimTypes.NameIdentifier:
                            userId = claim.Value;
                            break;
                    }
                }
            }

            ctx.Principal = new UserPrincipal(userId, username);

            await _next.Invoke(context);
        }
    }
}
