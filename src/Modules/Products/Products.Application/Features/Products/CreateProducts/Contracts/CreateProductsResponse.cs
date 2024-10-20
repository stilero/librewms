namespace Products.Application.Features.Products.CreateProducts.Contracts;
public sealed record CreateProductsResponse(IReadOnlyCollection<Guid> ProductIds);
