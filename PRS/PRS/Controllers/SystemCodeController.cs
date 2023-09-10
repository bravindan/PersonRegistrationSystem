using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PRS.DBConnection;
using PRS.Models;

namespace PRS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SystemCodeController : ControllerBase
    {
        private readonly DbConnector connector;

        public SystemCodeController(DbConnector connector)
        {
            this.connector = connector;
        }

        [HttpPost("systemcode")]
        
        public async Task<SystemCodeModel> SystemCode (SystemCodeModel model)
        {
            connector.SystemCode.Add(model);
            await connector.SaveChangesAsync();
            return model;
        }
        
    }

}
