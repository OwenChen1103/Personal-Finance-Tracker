namespace FinanceTracker.Api.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public string Type { get; set; } // "income" or "expense"
        public string Category { get; set; }
        public decimal Amount { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? Note { get; set; } 
    }
}
