using BuildingBlocks.Application.Messaging.Interfaces;

namespace Products.Application.Features.Products.DeleteProduct;
public sealed record DeleteProductCommand(Guid Id) : ICommand;
