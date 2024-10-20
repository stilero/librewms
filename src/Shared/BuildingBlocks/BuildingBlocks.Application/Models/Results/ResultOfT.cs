namespace BuildingBlocks.Application.Models.Results;
public class Result<T> : Result
{
    private readonly T? _value;

    protected internal Result(T value)
        : base()
    {
        _value = value;
    }

    protected internal Result(ErrorResult error)
        : base(error)
    {
        ArgumentNullException.ThrowIfNull(error);

        _value = default;
    }

    public T Value => IsSuccess ? _value! : throw new InvalidOperationException();

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Usage", "CA2225:Operator overloads have named alternates", Justification = "<Pending>")]
    public static implicit operator Result<T>(ErrorResult error) => new(error);

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Usage", "CA2225:Operator overloads have named alternates", Justification = "<Pending>")]
    public static implicit operator Result<T>(T value) => new(value);
}
