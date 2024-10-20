using Products.Domain.ProductImport.ValueObjects;

namespace Products.Application.Features.ProductImports.Contracts;
public sealed record ProductImportRequest(ImportType ImportType, IReadOnlyCollection<ProductData> Data);
