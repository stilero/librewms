using BuildingBlocks.Application.Messaging.Interfaces;
using BuildingBlocks.Application.Models.Results;

using Products.Application.Features.Products.Common.Repositories;
using Products.Application.Features.Products.CreateProducts.Contracts;
using Products.Domain;

namespace Products.Application.Features.Products.CreateProducts;
public sealed class CreateProductsCommandHandler(IProductRepository productRepository) : ICommandHandler<CreateProductsCommand, CreateProductsResponse>
{
    public async Task<Result<CreateProductsResponse>> Handle(CreateProductsCommand request, CancellationToken cancellationToken)
    {
        if (request is null || request.Products.Count == 0)
        {
            //TODO: Add Error Class
            return ErrorResult.Validation("error", "Products cannot be null or empty");
        }

        var productEntities = new List<Product>();

        foreach (var product in request.Products)
        {
            productEntities.Add(Product.CreateNew(product.Name, product.Sku, product.Description, product.Manufacturer, product.Category));
        }

        await productRepository.AddRangeAsync(productEntities, cancellationToken);
        return new CreateProductsResponse(productEntities.Select(p => p.Id).ToList());
    }
}
