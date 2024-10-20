using BuildingBlocks.Application.Models.Results;

using MediatR;

namespace BuildingBlocks.Application.Messaging.Interfaces;
public interface ICommand<T> : IRequest<Result<T>>;
