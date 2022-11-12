const buyBtns = document.querySelectorAll(".buy-btn")
buyBtns.forEach((button) => {
    button.addEventListener('click', async (event) => {
        event.stopPropagation()
        const id = event.target.getAttribute('data-product-id')
        console.log(id)
        const response = await fetch(`/api/products/purchase/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            await Swal.fire(
                'Successfully Purchase!',
                'Thanks for the patronage!',
                'success'
            )
            document.location.reload()
        }
    })
})