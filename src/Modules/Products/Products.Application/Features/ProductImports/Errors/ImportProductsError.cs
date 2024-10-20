using BuildingBlocks.Application.Models.Results;

namespace Products.Application.Features.ProductImports.Errors;
public static class ImportProductsError
{
    public static ErrorResult InvalidRequest => ErrorResult.Validation("ImportProductsErrors.InvalidRequest", "Request cannot be null");
}
