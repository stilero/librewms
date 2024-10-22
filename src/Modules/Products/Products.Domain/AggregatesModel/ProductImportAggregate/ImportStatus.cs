namespace Products.Domain.AggregatesModel.ProductImportAggregate;
public enum ImportStatus
{
    Draft,
    Staged,
    Processing,
    Validated,
    Completed,
    Failed,
}
