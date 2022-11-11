const addReviewBtn = document.getElementById('add-review')
const id = addReviewBtn.getAttribute('data-product-id')

document.querySelector("#add-review").addEventListener('click', async () => {
    console.log("entered event listener")
    const { value: content } = await Swal.fire({
        input: 'textarea',
        inputLabel: 'Add Review',
        inputPlaceholder: 'Type your review here...',
        inputAttributes: {
          'aria-label': 'Type your review here'
        },
        showCancelButton: true
      })
      
      if (content) {
        const response = await fetch("/api/reviews/", {
            method: "POST",
            body: JSON.stringify({ content, product_id: id  }),
            headers: { "Content-Type": "application/json" },
          });
        if (response.ok){
             await Swal.fire(
                'Review Added!',
                'Thanks for the feedback!',
                'success'
              )
              document.location.reload()
            }
        }
      }
)