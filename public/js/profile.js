const addProductBtn = document.getElementById("add-product");
const existingPostBtns = document.querySelectorAll('.edit-btn')
const deleteBtns = document.querySelectorAll(".delete-btn");

existingPostBtns.forEach(button => {
    button.addEventListener('click', (event) => {
      const id = event.target.closest(".card").getAttribute("data-product-id");
        document.location = `/profile/products/${id}`}
        )
})

deleteBtns.forEach((button) => {
  button.addEventListener("click", async (event) => {
    const id = event.target.closest(".card").getAttribute("data-product-id");
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    document.location = `/profile`;
  });
});

addProductBtn.addEventListener("click", (event) => {
  document.location = "/profile/products";
});
