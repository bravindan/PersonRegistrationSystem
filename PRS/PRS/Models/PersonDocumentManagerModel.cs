using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata;

namespace PRS.Models
{
    public class PersonDocumentManagerModel
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public int DocumentTypeId { get; set; }
        [StringLength(10)]
        public string DocumentNumber { get; set; }
        public int CrudTypeID { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedOn { get; set;}
    }
}
