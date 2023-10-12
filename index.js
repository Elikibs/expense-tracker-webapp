// Get reference to budget input
const totalAmount = document.getElementById("total-amount");
// Get reference to type of expense input
const productTitle = document.getElementById("product-title");
// Get reference to expense cost input
const userAmount = document.getElementById("user-amount");
// Get reference to set budget button
const setBudgetButton = document.getElementById("total-amount-button");
// Get reference to the Submit Amount button
const submitAmountButton = document.getElementById("check-amount");

let currentId = 1;


setBudgetButton.addEventListener("click", () => {
    console.log(totalAmount.value)
    fetch("http://localhost:3000/records", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            Budget: parseFloat(totalAmount.value)
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))

})
 submitAmountButton.addEventListener("click", () => {
    console.log(productTitle.value)
    console.log(userAmount.value)
 })
