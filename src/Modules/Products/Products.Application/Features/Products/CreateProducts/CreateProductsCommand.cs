using BuildingBlocks.Application.Messaging.Interfaces;

using Products.Application.Features.Products.CreateProducts.Contracts;

namespace Products.Application.Features.Products.CreateProducts;
public sealed record CreateProductsCommand(IReadOnlyCollection<CreateProductRequest> Products) : ICommand<CreateProductsResponse>;
