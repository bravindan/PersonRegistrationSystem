namespace PRS.Models

{
    public class PersonDocumentModel
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public int DocumentTypeId { get; set; }
        public string DocumentNumber { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public int SupervisedById { get; set; }
        public DateTime SupervisedOn { get; set ; }
        //public PersonManagerModel PersonManagerModel { get; set; }
    }
}
