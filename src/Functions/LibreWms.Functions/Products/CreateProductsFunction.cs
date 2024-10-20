using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

using Products.API;
using Products.API.Interfaces;

namespace LibreWms.Functions.Products;

public class CreateProductsFunction
{
    private readonly ILogger<CreateProductsFunction> _logger;
    private readonly IProductsApi _api;

    public CreateProductsFunction(ILogger<CreateProductsFunction> logger, IProductsApi api)
    {
        _logger = logger;
        _api = api;
    }

    [Function(nameof(CreateProductsFunction))]
    public async Task<IActionResult> RunAsync(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = ProductsApi.CreateProductsRoute)] HttpRequest req, CancellationToken cancellationToken) => await _api.CreateProductsAsync(req, cancellationToken);
}
