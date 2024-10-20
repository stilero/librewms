using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Products.API.Interfaces;

public interface IProductImportApi
{
    Task<IActionResult> ImportProductsAsync(HttpRequest request, CancellationToken cancellationToken);
}
