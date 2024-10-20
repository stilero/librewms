namespace BuildingBlocks.Application.Models.Results;
public class Result
{
    private readonly ErrorResult? _error;

    public bool IsSuccess => _error == null;

    public bool IsFailure => !IsSuccess;

    public ErrorResult Error => _error ?? throw new InvalidOperationException();

    protected Result(ErrorResult? error = null)
    {
        _error = error;
    }

    public static Result Success() => new();

    public static Result<T> Success<T>(T value) => new(value);

    public static Result Failure(ErrorResult error) => new(error);

    public static Result<T> Failure<T>(ErrorResult error) => new(error);

    public static implicit operator Result(ErrorResult error) => new(error);
}
