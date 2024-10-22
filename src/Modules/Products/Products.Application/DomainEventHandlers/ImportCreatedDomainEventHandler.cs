using MediatR;

using Products.Domain.AggregatesModel.ProductImportAggregate;
using Products.Domain.Events;

namespace Products.Application.DomainEventHandlers;
public sealed class ImportCreatedDomainEventHandler : INotificationHandler<ImportCreatedDomainEvent>
{
    private readonly IProductImportRepository _productImportRepository;

    public async Task Handle(ImportCreatedDomainEvent notification, CancellationToken cancellationToken)
    {
        _productImportRepository.Add(notification.ProductImport );
    }
}
