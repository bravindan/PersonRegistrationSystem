using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PRS.DBConnection;
using PRS.Models;

namespace PRS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly DbConnector connector;
        public PersonController(DbConnector connector)
        {
            this.connector = connector;
        }
        [HttpPost("person")]
        
        public async Task <PersonModel> Person (PersonModel model)
        {
            connector.Person.Add(model);
            await connector.SaveChangesAsync();
            return model;
        }
        [HttpGet("people")]
        public ActionResult<IEnumerable<PersonModel>> GetPersons()
        {
            //var persons = new List<PersonModel>();
            IQueryable<PersonModel> query = connector.Person;
            var persons = query.ToList();
            return Ok(persons);
        }

        [HttpPatch("updateperson")]
        public async Task<PersonModel> UpdatePerson (PersonModel model)
        {
            connector.Person.Update(model);
            await connector.SaveChangesAsync();
            return model;
        }

        [HttpPost("approve")]
        [AllowAnonymous]
        public async Task<IActionResult> ApprovePersonManager(PersonCreatonDTO creatonDTO) 
        {
            try
            {
                if (creatonDTO.PersonId == 0)
                {
                    return BadRequest();
                }
                var User = connector.PersonManager.Find(creatonDTO.PersonId);
                if (User == null)
                {
                    return NotFound();
                }
                var Person = new PersonModel();
                Person.PersonId = User.Id;
                Person.FirstName = User.FirstName;
                Person.MiddleName = User.MiddleName;
                Person.SurName = User.SurName;
                Person.GenderId = User.GenderId;
                Person.MaritalStatusId = User.MaritalStatusId;
                Person.PhoneNumber = User.PhoneNumber;
                Person.EmailAddress = User.EmailAddress;
                Person.Image = User.Image;
                Person.Signature = User.Signature;
                Person.CrudTypeId = User.CrudTypeId;
                Person.CreatedById = User.CreatedById;
                Person.CreatedOn = DateTime.Now;
                Person.SupervisedOn = DateTime.Now;
                Person.SupervisedById = creatonDTO.SupervisedById;
               

                connector.Person.Add(Person);

                User.Approved = true;
                User.ApprovalStatus = ApprovalStatus.Approved;
                connector.PersonManager.Update(User);

                await connector.SaveChangesAsync();

                return Ok(Person);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
