const addProductbtn = document.getElementById('add-product')
// const existingPostBtns = document.querySelectorAll('.post-button')
const deleteBtns = document.querySelectorAll('.delete-btn')

// existingPostBtns.forEach(button => {
//     button.addEventListener('click', (event) => {
//         const id = event.target.closest('.post-button').getAttribute('data-post-id')
//         document.location = `/dashboard/posts/${id}`}
//         )
// })

deleteBtns.forEach(button => {
    button.addEventListener('click', async (event) => {
        const id = event.target.closest('.card').getAttribute('data-products-id')
        const response = await fetch(`/api/products/${id}`, {
            method: 'DELETE'
          })
        document.location = `/profile`}
        )
})

addProductBtn.addEventListener('click', (event) => {
 
    document.location = '/dashboard/new-post'
})
