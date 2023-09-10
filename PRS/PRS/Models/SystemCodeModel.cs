using System.ComponentModel.DataAnnotations;

namespace PRS.Models
{
    
    public class SystemCodeModel
    {
        [Key]
        public int SystemCodeId { get; set; }
        public string CodeName { get; set; }
    }
  
}
