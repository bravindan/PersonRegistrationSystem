using System.ComponentModel.DataAnnotations;

namespace PRS.Models
{
    public class SystemCodeDetailModel
    {
        public int Id { get; set; }
        public int SystemCodeId {  get; set; }
        [StringLength(20)]
        public string CodeName { get; set; }
    }
}
