using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PRS.DBConnection;
using PRS.Models;

namespace PRS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonDocumentController : ControllerBase
    {
        private readonly DbConnector connector;
        public PersonDocumentController(DbConnector connector)
        {
            this.connector = connector;
        }
        [HttpPost("persondocument")]

        public async Task <PersonDocumentModel> PersonDocument (PersonDocumentModel model)
        {
            connector.PersonDocument.Add(model);
            await connector.SaveChangesAsync();
            return model;
        }
    }
}
