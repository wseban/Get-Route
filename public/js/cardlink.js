const cards = document.querySelectorAll('.product-card').forEach((card) => card.addEventListener('click', redirectToProduct))
const dropDown = document.getElementById('my-dropdown')
dropDown.addEventListener('hidden.bs.dropdown', checkCheckBoxBox)

function checkCheckBoxBox() {
    var array = []
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

    for (var i = 0; i < checkboxes.length; i++) {
      array.push(checkboxes[i].getAttribute('data-tag-id'))
    }
    document.location = `/?tag_id=${array.join(',')}`
}


async function redirectToProduct(event) {
    const id = event.target.closest(".product-card").getAttribute('data-product-id')
    document.location = `/products/${id}`
}