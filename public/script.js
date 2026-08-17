async function loadTable() {
    const res = await fetch("/products");
    const products = await res.json();
    const tbody = document.getElementById("table-body");
    tbody.innerHTML = "";

    let id = 1;
    for (const p of products) {
        tbody.innerHTML += `
            <tr>
                <td>${id++}</td>
                <td>${p.name}</td>
                <td>${p.category}</td>
                <td>${p.quantity}</td>
                <td>$${p.price}</td>
                <td id="actions">
                    <button class="btn-edit" onclick="editItem('${p._id}', '${p.name}', '${p.category}', '${p.quantity}', '${p.price}')">Edit</button>
                    <button class="btn-delete" onclick="deleteItem('${p._id}')">Delete</button>
                </td>
            </tr>
        `;
    }
}

async function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        await fetch("/products/"+id, { method: 'DELETE' });
        loadTable();
    }
}

async function addItem(event) {
    event.preventDefault();
    const item = {
        name: document.getElementById('name').value,
        category: document.getElementById('category').value,
        quantity: document.getElementById('quantity').value,
        price: document.getElementById('price').value
    };
    const id = document.getElementById('itemID').value;

    if (id) {
        await fetch("/products/"+id, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        });
    } else {
        await fetch("/products", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        });
    }

    loadTable();
    document.getElementById('itemID').value = '';
    document.getElementById('itemForm').reset();
    document.getElementById('add').innerText = '+ Add Item';
}

loadTable();

function editItem(id, name, category, quantity, price) {
    document.getElementById('itemID').value = id;
    document.getElementById('name').value = name;
    document.getElementById('category').value = category;
    document.getElementById('quantity').value = quantity;
    document.getElementById('price').value = price;
    document.getElementById('add').innerText = "Update Item";
}
