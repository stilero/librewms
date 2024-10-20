using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Products.API.Interfaces;

public interface IProductsApi
{
    Task<IActionResult> CreateProductsAsync(HttpRequest request, CancellationToken cancellationToken);
    Task<IActionResult> DeleteProductAsync(Guid id, CancellationToken cancellationToken);
}
