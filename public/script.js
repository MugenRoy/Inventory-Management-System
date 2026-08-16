async function loadTable() {
    const res = await fetch("/products");
    if (!res.ok) throw new Error("Failed to fetch products");
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
                <td></td>
            </tr>
        `;
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
  await fetch("/products", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    });

   loadTable();

}
