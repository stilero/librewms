using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

using Products.API;
using Products.API.Interfaces;

namespace LibreWms.Functions.Products;

public class DeleteProductFunction
{
    private readonly ILogger<DeleteProductFunction> _logger;
    private readonly IProductsApi _api;

    public DeleteProductFunction(ILogger<DeleteProductFunction> logger, IProductsApi api)
    {
        _logger = logger;
        _api = api;
    }

    [Function(nameof(DeleteProductFunction))]
    public async Task<IActionResult> RunAsync([HttpTrigger(AuthorizationLevel.Function, "delete", Route = ProductsApi.DeleteProductRoute)] Guid id, CancellationToken cancellationToken) => await _api.DeleteProductAsync(id, cancellationToken);
}
