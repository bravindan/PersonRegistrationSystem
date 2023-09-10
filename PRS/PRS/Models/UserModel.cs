using System.ComponentModel.DataAnnotations;

namespace PRS.Models
{
    public enum Role
    {
        Maker,
        Checker
    }
    public class UserModel
    {
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public Role UserType { get; set; }
    }
}
