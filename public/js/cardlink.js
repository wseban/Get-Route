const cards = document.querySelectorAll('.product-card').forEach((card) => card.addEventListener('click', redirectToProduct))

async function redirectToProduct(event) {
    const id = event.target.closest(".product-card").getAttribute('data-product-id')
    document.location = `/products/${id}`
}