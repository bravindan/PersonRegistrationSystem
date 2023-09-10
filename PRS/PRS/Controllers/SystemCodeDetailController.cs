using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PRS.DBConnection;
using PRS.Models;

namespace PRS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SystemCodeDetailController : ControllerBase
    {
        private readonly DbConnector connector;
        public SystemCodeDetailController(DbConnector connector)
        {
            this.connector = connector;
        }
        [HttpPost("systemcodedetail")]

        public async Task<SystemCodeModel> SystemCodeDetail(SystemCodeModel model)
        {
            connector.SystemCode.Add(model);
            await connector.SaveChangesAsync();
            return model;
        }
    }
}
