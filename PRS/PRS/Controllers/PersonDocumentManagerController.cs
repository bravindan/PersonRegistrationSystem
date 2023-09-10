using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PRS.DBConnection;
using PRS.Models;

namespace PRS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonDocumentManagerController : ControllerBase
    {
        private readonly DbConnector connector;
        public PersonDocumentManagerController(DbConnector connector)
        {
            this.connector = connector;
        }
        [HttpPost]

        public async Task <PersonDocumentManagerModel> PersonDocumentManager(PersonDocumentManagerModel model)
        {
            connector.PersonDocumentManager.Add(model);
            await connector.SaveChangesAsync();
            return model;
        }
    }
}
