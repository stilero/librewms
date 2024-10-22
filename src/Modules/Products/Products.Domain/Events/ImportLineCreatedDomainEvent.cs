using MediatR;

using Products.Domain.AggregatesModel.ProductImportAggregate;

namespace Products.Domain.Events;

public record ImportLineCreatedDomainEvent(ProductImportLine ImportLine) : INotification;
