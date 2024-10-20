using BuildingBlocks.Application.Interfaces;
using BuildingBlocks.Application.Messaging.Interfaces;
using BuildingBlocks.Application.Models.Results;

using Products.Application.Features.ProductImports.Errors;
using Products.Application.Features.ProductImports.Interfaces;

namespace Products.Application.Features.ProductImports;
public sealed class ImportProductsCommandHandler : ICommandHandler<ImportProductsCommand, Guid>
{
    private readonly IProductImportService _productImportService;
    private readonly IUnitOfWork _unitOfWork;

    public ImportProductsCommandHandler(IProductImportService productImportService, IUnitOfWork unitOfWork)
    {
        _productImportService = productImportService;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<Guid>> Handle(ImportProductsCommand request, CancellationToken cancellationToken)
    {
        if (request is null)
        {
            return ImportProductsError.InvalidRequest;
        }

        var result = await _productImportService.CreateNew(request.Request, cancellationToken);
        await _unitOfWork.SaveChangesAsync();
        return result;
    }
}
