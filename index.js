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


setBudgetButton.addEventListener("click", () => {
    console.log(totalAmount.value)
})
 submitAmountButton.addEventListener("click", (e) => {
    console.log(productTitle.value)
    console.log(userAmount.value)
 })
