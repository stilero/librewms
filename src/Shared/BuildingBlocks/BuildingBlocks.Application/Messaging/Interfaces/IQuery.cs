using BuildingBlocks.Application.Models.Results;

using MediatR;

namespace BuildingBlocks.Application.Messaging.Interfaces;
public interface IQuery<TResponse> : IRequest<Result<TResponse>>;
