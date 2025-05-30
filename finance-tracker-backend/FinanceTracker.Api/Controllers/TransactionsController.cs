using Microsoft.AspNetCore.Mvc;
using FinanceTracker.Api.Models;

namespace FinanceTracker.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private static readonly List<Transaction> Transactions = new()
        {
            new Transaction { Id = 1, Type = "I", Category = "Salary", Amount = 5000, CreatedAt = DateTime.Now.AddDays(-62), Note = "Monthly payment" },
            new Transaction { Id = 2, Type = "E", Category = "Food", Amount = 30.5m, CreatedAt = DateTime.Now.AddDays(-31), Note = "Lunch with friends"},
            new Transaction { Id = 3, Type = "E", Category = "Transport", Amount = 15.75m, CreatedAt = DateTime.Now.AddDays(-3), Note = "Opal top-up" },
        };

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(Transactions);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Transaction transaction)
        {
            transaction.Id = Transactions.Count + 1;
            Transactions.Add(transaction);
            return CreatedAtAction(nameof(GetAll), new { id = transaction.Id }, transaction);
        }
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Transaction updated)
        {
            var tx = Transactions.FirstOrDefault(t => t.Id == id);
            if (tx == null) return NotFound();

            tx.Type = updated.Type;
            tx.Category = updated.Category;
            tx.Amount = updated.Amount;
            tx.CreatedAt = updated.CreatedAt;
            tx.Note = updated.Note;

            return Ok(tx);
        } 
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var transaction = Transactions.FirstOrDefault(t => t.Id == id);
            if (transaction == null)
                return NotFound();

            Transactions.Remove(transaction);
            return NoContent();
        }
    }
}
