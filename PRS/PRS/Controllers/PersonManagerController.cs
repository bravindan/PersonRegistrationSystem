﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PRS.DBConnection;
using PRS.Models;
using Swashbuckle.AspNetCore.SwaggerUI;

namespace PRS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonManagerController : ControllerBase
    {
        private readonly DbConnector connector;
      
        public PersonManagerController(DbConnector connector)
        {
            this.connector = connector;
              
        }
        //modified
        //public PersonDocumentManagerModel GetPersonDocumentManagerModel(PersonDocumentManagerModel doc)
        //{
        //    return doc;
        //}

        [HttpPost("create")]
        [AllowAnonymous]
        public async Task<PersonManagerModel> PersonManager(PersonManagerModel model /*, PersonDocumentManagerModel doc*/)
        {
            model.CreatedOn = DateTime.Now;
            model.GenderId = Convert.ToInt32(model.GenderId);
            model.CrudTypeId = Convert.ToInt32(model.CrudTypeId);
            model.MaritalStatusId = Convert.ToInt32(model.MaritalStatusId);
            model.CrudTypeId = 53;
            
            connector.PersonManager.Add(model);
            await connector.SaveChangesAsync();
           
            //post to docuement manager table
            //var DocData = new PersonDocumentManagerModel();
            //DocData.CreatedOn = DateTime.Now;
            //DocData.CrudTypeId = Convert.ToInt32(model.CrudTypeId);
            //DocData.CrudTypeId = 53;
            //DocData.DocumentNumber = doc.DocumentNumber;
            //connector.PersonDocumentManager.Add(doc);
            //await connector.SaveChangesAsync();

            return model;
        }

        [HttpGet("people")]
        [AllowAnonymous]
        public ActionResult<IEnumerable<PersonManagerModel>> GetPersonsManager()
        {
            //var persons = new List<PersonModel>();
            IQueryable<PersonManagerModel> query = connector.PersonManager;
            var persons = query.ToList();
            return Ok(persons);
        }
        [HttpPatch("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> UpdatePersonManager(int id, [FromBody] PersonManagerModel model)
        {
            model.CrudTypeId = 63;
            try
            {
                if (id == 0)
                {
                    return BadRequest();
                }
                var CheckUserExist = await connector.PersonManager.FindAsync(id);
                if (CheckUserExist == null)
                {
                    return NotFound();
                }
                CheckUserExist.FirstName = model.FirstName;
                CheckUserExist.MiddleName = model.MiddleName;
                CheckUserExist.SurName = model.SurName;
                CheckUserExist.GenderId = model.GenderId;
                CheckUserExist.MaritalStatusId = model.MaritalStatusId;
                CheckUserExist.PhoneNumber = model.PhoneNumber;
                CheckUserExist.EmailAddress = model.EmailAddress;
                CheckUserExist.Image =  model.Image;
                CheckUserExist.DocumentNumber = model.DocumentNumber;
                CheckUserExist.Signature = model.Signature;
                CheckUserExist.CrudTypeId = model.CrudTypeId;
                //CheckUserExist.CreatedOn = model.CreatedOn;

                await connector.SaveChangesAsync();

                return Ok(model);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
        [HttpDelete("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> DeletePersonManager(int id)
        {
            try
            {
                if (id == 0)
                {
                    return BadRequest();
                }
                var CheckUserExist =  connector.PersonManager.Find(id);
                if (CheckUserExist == null)
                {
                    return NotFound();
                }
                
                 connector.Remove(CheckUserExist);

               await connector.SaveChangesAsync();

                return Ok("User deleted successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
        [HttpGet("people/{id}")]
        [AllowAnonymous]
        public IActionResult People(int id)
        {
            try
            {
                if (id == 0)
                {
                    return BadRequest();
                }
                var CheckUserExist = connector.PersonManager.Find(id);
                if (CheckUserExist == null)
                {
                    return NotFound();
                }

                return Ok(CheckUserExist);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
