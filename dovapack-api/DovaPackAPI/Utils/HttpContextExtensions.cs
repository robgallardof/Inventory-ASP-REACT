using Microsoft.EntityFrameworkCore;

namespace DovaPackAPI.Utils
{
    public static class HttpContextExtensions
    {
        public static async Task InsertParameterPaginationInHeader<T>(this HttpContext httpContext,
         IQueryable<T> queryable)
        {
            if (httpContext == null) { throw new ArgumentNullException(nameof(httpContext)); }

            double quantity = await queryable.CountAsync();
            httpContext.Response.Headers.Add("quantityTotalRegisters", quantity.ToString());
        }
    }
}