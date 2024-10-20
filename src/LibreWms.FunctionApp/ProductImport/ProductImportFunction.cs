using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

using Products.API;
using Products.API.Interfaces;

namespace LibreWms.Functions.ProductImport;

public class ProductImportFunction
{
    private readonly ILogger<ProductImportFunction> _logger;
    private readonly IProductImportApi _api;

    public ProductImportFunction(ILogger<ProductImportFunction> logger, IProductImportApi api)
    {
        _logger = logger;
        _api = api;
    }

    [Function(nameof(ProductImportFunction))]
    public async Task<IActionResult> RunAsync([HttpTrigger(AuthorizationLevel.Function, "post", Route = ProductImportApi.ImportProductsRoute)] HttpRequest req, CancellationToken cancellationToken) => await _api.ImportProductsAsync(req, cancellationToken);
}
