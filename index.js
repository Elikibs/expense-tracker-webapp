const form = document.querySelector("form");
const expenseName = document.querySelector("#expense-name");
const expenseAmount = document.querySelector("#expense-amount");
const expenseList = document.getElementById("expense-list");
const totalAmountElement = document.getElementById("total-amount");
const budgetInput = document.getElementById("budget-input");
const budgetButton = document.getElementById("budget-btn");
const budgetAmountElement = document.getElementById("budget-amount");
const balanceAmountElement = document.getElementById("balance-amount");


let totalAmount = 0;
let budgetAmount = 0;
let balanceAmount = 0;


document.addEventListener("DOMContentLoaded", () => {
    budgetButton.addEventListener("click", () => {
        budgetAmount += parseFloat(budgetInput.value)
        budgetAmountElement.textContent = budgetAmount;
        
    })
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

  // Event delegation to handle delete button click
  expenseList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const expenseId = e.target.id;
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
          balanceAmount += deletedExpenseCost;
          totalAmountElement.textContent = totalAmount.toFixed(2);
          balanceAmountElement.textContent = balanceAmount.toFixed(2);
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
  balanceAmount = budgetAmount - totalAmount;
  expenseList.appendChild(expenseRow);
  if (balanceAmount <= 0){
    alert("Hey Champ! Your balance is 0")
  }
  totalAmountElement.textContent = totalAmount.toFixed(2);
  balanceAmountElement.textContent = balanceAmount.toFixed(2);
}
