const shoppingForm = document.getElementById("shoppingForm");
const itemNameInput = document.getElementById("itemName");
const quantityInput = document.getElementById("quantity");
const shoppingContainer = document.getElementById("shoppingContainer");
const totalItemsSpan = document.getElementById("totalItems");

// Load saved items (if any) from localStorage
let items = JSON.parse(localStorage.getItem("shoppingItems")) || [];

function saveItems() {
    localStorage.setItem("shoppingItems", JSON.stringify(items));
}

function renderItems() {
    shoppingContainer.innerHTML = "";

    items.forEach(function (item) {
        const card = document.createElement("div");
        card.classList.add("card");

        const info = document.createElement("span");
        info.textContent = item.name + " (Qty: " + item.quantity + ")";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.addEventListener("click", function () {
            deleteItem(item.id);
        });

        card.appendChild(info);
        card.appendChild(deleteBtn);
        shoppingContainer.appendChild(card);
    });

    updateTotal();
}

function updateTotal() {
    // Total = sum of all quantities
    const total = items.reduce(function (sum, item) {
        return sum + item.quantity;
    }, 0);
    totalItemsSpan.textContent = total;
}

function addItem(name, quantity) {
    items.push({
        id: Date.now(),
        name: name,
        quantity: quantity
    });
    saveItems();
    renderItems();
}

function deleteItem(id) {
    items = items.filter(function (item) {
        return item.id !== id;
    });
    saveItems();
    renderItems();
}

shoppingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = itemNameInput.value.trim();
    const quantity = parseInt(quantityInput.value, 10);

    if (name === "" || isNaN(quantity) || quantity < 1) {
        return;
    }

    addItem(name, quantity);
    shoppingForm.reset();
    itemNameInput.focus();
});

// Initial render
renderItems();