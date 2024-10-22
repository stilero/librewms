using MediatR;

using Products.Domain.AggregatesModel.ProductImportAggregate;

namespace Products.Domain.Events;
public sealed record ImportCreatedDomainEvent(ProductImport ProductImport) : INotification;
