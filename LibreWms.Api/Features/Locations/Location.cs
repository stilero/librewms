namespace LibreWms.Api.Features.Locations;

public class Location
{
    public string LocationId { get; set; } = string.Empty; // e.g. A-01-01
    public string Zone { get; set; } = string.Empty;
    public string Aisle { get; set; } = string.Empty;
    public string Rack { get; set; } = string.Empty;
    public decimal Capacity { get; set; } // in kg
    public decimal Occupied { get; set; } // percent (0-100)
    public int Items { get; set; }
    public string Status { get; set; } = "Active"; // e.g. Active, NearCapacity
}