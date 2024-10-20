using MediatR;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Newtonsoft.Json;

using Products.API.Interfaces;
using Products.Application.Features.Products.CreateProducts;
using Products.Application.Features.Products.CreateProducts.Contracts;
using Products.Application.Features.Products.DeleteProduct;

namespace Products.API;

public class ProductsApi : IProductsApi
{
    public const string CreateProductsRoute = "products";

    public const string DeleteProductRoute = "products/{id:guid}";

    private readonly IMediator _mediator;

    public ProductsApi(IMediator mediator)
    {
        _mediator = mediator;
    }

    public async Task<IActionResult> CreateProductsAsync(HttpRequest request, CancellationToken cancellationToken)
    {
        if (request is null)
        {
            return new BadRequestObjectResult("Invalid request");
        }

        using var reader = new StreamReader(request.Body);
        var requestBody = await reader.ReadToEndAsync(cancellationToken);
        var createProductsRequest = JsonConvert.DeserializeObject<CreateProductsRequest>(requestBody);
        if (createProductsRequest is null)
        {
            return new BadRequestObjectResult("Invalid request");
        }

        var command = new CreateProductsCommand(createProductsRequest.Products);

        var result = await _mediator.Send(command, cancellationToken);
        return result.IsFailure
            ? new BadRequestObjectResult(result.Error)
            : new OkObjectResult(result.Value);
    }
    public async Task<IActionResult> DeleteProductAsync(Guid id, CancellationToken cancellationToken)
    {
        var command = new DeleteProductCommand(id);
        var result = await _mediator.Send(command, cancellationToken);
        return result.IsFailure
            ? new BadRequestObjectResult(result.Error)
            : new OkResult();
    }
}
