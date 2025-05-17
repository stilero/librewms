using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibreWms.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddLocations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    LocationId = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Zone = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    Aisle = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    Rack = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    Capacity = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Occupied = table.Column<decimal>(type: "numeric(5,2)", nullable: false),
                    Items = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.LocationId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Locations");
        }
    }
}
