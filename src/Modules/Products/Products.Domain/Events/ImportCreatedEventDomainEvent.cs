using MediatR;

using Products.Domain.AggregatesModel.ProductImportAggregate;

namespace Products.Domain.Events;
public sealed record ImportCreatedEventDomainEvent(ProductImport ProductImport) : INotification;
