using MediatR;

using Products.Domain.AggregatesModel.ProductAggregate;

namespace Products.Domain.Events;
public sealed record ProductCreatedEventDomainEvent(Product Product) : INotification;
