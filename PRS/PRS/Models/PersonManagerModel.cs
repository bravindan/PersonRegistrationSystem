namespace PRS.Models
{
    public enum ApprovalStatus
    {
        Pending,
        Approved,
        Rejected
    }
    public class PersonManagerModel
    {
        public int Id { get; set; } 
        public string FirstName { get; set; } 
        public string MiddleName { get; set; } 
        public string SurName { get; set; } 
        public int GenderId { get; set; }
        public int MaritalStatusId { get; set; }
        public string PhoneNumber { get; set; } 
        public string EmailAddress { get; set; } 
        public string Image { get; set; } 
        public string Signature { get; set; } 
        public int CrudTypeId { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedOn { get; set; }
        public Boolean Approved { get; set; }
        public ApprovalStatus ApprovalStatus { get; set; }
    }
}
