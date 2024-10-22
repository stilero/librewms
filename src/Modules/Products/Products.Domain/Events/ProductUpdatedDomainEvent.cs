using MediatR;

using Products.Domain.AggregatesModel.ProductAggregate;

namespace Products.Domain.Events;
public sealed record ProductUpdatedDomainEvent(Product Product): INotification;
