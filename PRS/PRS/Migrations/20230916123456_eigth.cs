using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PRS.Migrations
{
    /// <inheritdoc />
    public partial class eigth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CrudTypeID",
                table: "PersonDocumentManager",
                newName: "CrudTypeId");

            migrationBuilder.AddColumn<string>(
                name: "DocumentNumber",
                table: "PersonManager",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DocumentNumber",
                table: "PersonManager");

            migrationBuilder.RenameColumn(
                name: "CrudTypeId",
                table: "PersonDocumentManager",
                newName: "CrudTypeID");
        }
    }
}
