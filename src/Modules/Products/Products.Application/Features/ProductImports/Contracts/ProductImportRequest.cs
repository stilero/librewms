using Products.Domain.AggregatesModel.ProductImportAggregate;

namespace Products.Application.Features.ProductImports.Contracts;
public sealed record ProductImportRequest(ImportType ImportType, IReadOnlyCollection<ProductData> Data);
