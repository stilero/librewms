using MediatR;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Newtonsoft.Json;

using Products.API.Interfaces;
using Products.Application.Features.ProductImports;
using Products.Application.Features.ProductImports.Contracts;

namespace Products.API;
public sealed class ProductImportApi : IProductImportApi
{
    public const string ImportProductsRoute = "products/import";

    private readonly IMediator _mediator;

    public ProductImportApi(IMediator mediator)
    {
        _mediator = mediator;
    }

    public async Task<IActionResult> ImportProductsAsync(HttpRequest request, CancellationToken cancellationToken)
    {
        if (request is null)
        {
            return new BadRequestObjectResult("Invalid request");
        }

        using var reader = new StreamReader(request.Body);
        var requestBody = await reader.ReadToEndAsync(cancellationToken);
        var importProductsRequest = JsonConvert.DeserializeObject<ProductImportRequest>(requestBody);
        if (importProductsRequest is null)
        {
            return new BadRequestObjectResult("Invalid request");
        }

        var command = new ImportProductsCommand(importProductsRequest);

        var result = await _mediator.Send(command, cancellationToken);
        return result.IsFailure
            ? new BadRequestObjectResult(result.Error)
            : new OkObjectResult(result.Value);
    }
}
