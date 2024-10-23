using MediatR;
using Products.Application.Features.ProductImports.Interfaces;
using Products.Domain.AggregatesModel.ProductImportAggregate;
using Products.Domain.Events;

namespace Products.Application.DomainEventHandlers;
public sealed class ImportCreatedDomainEventHandler : INotificationHandler<ImportCreatedDomainEvent>
{
    private readonly IProductImportService _productImportService;
    private readonly IProductImportRepository _productImportRepository;

    public ImportCreatedDomainEventHandler(IProductImportService productImportService, IProductImportRepository productImportRepository)
    {
        _productImportService = productImportService;
        _productImportRepository = productImportRepository;
    }

    public async Task Handle(ImportCreatedDomainEvent notification, CancellationToken cancellationToken)
    {
        var import = await _productImportRepository.GetAsync(notification.ProductImport.Id);
        
        if (import is null)
        {
            throw new InvalidOperationException("Import not found");
        }

        await _productImportService.ProcessImport(import.Id, cancellationToken);
    }
}
