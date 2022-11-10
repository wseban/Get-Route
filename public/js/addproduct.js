const createFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#product-name").value.trim();
  const description = document.querySelector("#description").value.trim();
  const price = document.querySelector("#price").value.trim();
  const stock = document.querySelector("#stock").value.trim();


  if (isNaN(price)) {
    alert("Price must be a number");
  }

  if (name && description && price && stock) {
    const response = await fetch("/api/products/", {
      method: "POST",
      body: JSON.stringify({ name, description, price, stock }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to log in");
    }
  }
};

document
  .querySelector("#add-product")
  .addEventListener("click", createFormHandler);
