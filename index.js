const form = document.querySelector("form");
const expenseName = document.querySelector("#expense-name");
const expenseAmount = document.querySelector("#expense-amount");
const expenseList = document.getElementById("expense-list");
const totalAmountElement = document.getElementById("total-amount");

let totalAmount = 0;

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/expenses", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        expense: expenseName.value,
        cost: parseFloat(expenseAmount.value),
      }),
    })
    .then((response) => response.json())
    .then((expenses) => renderExpenseList(expenses));
    form.reset();
  });

  // Event delegation to handle delete button clicks
  expenseList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const expenseId = e.target.id;
      console.log(expenseId)
      fetch(`http://localhost:3000/expenses/${expenseId}`, {
        method: "DELETE",
      })
        .then(response => response.json())
        .then(() => {
          // Remove the row from the DOM
          e.target.parentElement.remove();

          // Update the totalAmount
          const deletedExpenseCost = parseFloat(
            e.target.previousElementSibling.textContent
          );
          totalAmount -= deletedExpenseCost;
          totalAmountElement.textContent = totalAmount.toFixed(2);
        })
        .catch((error) => console.error("Error deleting expense:", error));
    }
  });
});



function renderExpenseList(expenses) {
  const expenseRow = document.createElement("tr");
  expenseRow.innerHTML = `
    <td>${expenses.expense}</td>
    <td>${expenses.cost}</td>
    <td class="delete-btn" id="${expenses.id}">Delete</td>
  `;

  totalAmount += expenses.cost;
  expenseList.appendChild(expenseRow);
  totalAmountElement.textContent = totalAmount.toFixed(2);
}
