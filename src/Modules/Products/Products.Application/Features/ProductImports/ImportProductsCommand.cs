using BuildingBlocks.Application.Messaging.Interfaces;

using Products.Application.Features.ProductImports.Contracts;

namespace Products.Application.Features.ProductImports;
public sealed record ImportProductsCommand(ProductImportRequest Request) : ICommand<Guid>;
